import { MathJsStatic } from 'mathjs';
import { TextDocument } from 'vscode';
import { allKeywords } from './constants';
import { format } from './formatter';
import { defaultScope } from './math';
import { convertLocalCurrency, displayCommas, globalDeclarations, localCurrencyCode, localCurrencySymbol, lowerExponentBound, notation, precision, temperatureShortcut, trimTrailingZeros, upperExponentBound } from './settings';
import { transform } from './transformer';
import math = require('mathjs');

/**
 * A math-enabled text document.
 */
export default class MathDocument {
    document: TextDocument;
    results = new Map<number, any>();
    widestLine: number = 0;
    transformerSettings!: TransformerSettings;
    formatterSettings!: FormatterSettings;

    // Expression compiler cache.
    private compileCache = new Map<string, math.EvalFunction>();

    private reassignErrorRegex = new RegExp("^\\s*((" + allKeywords + ")s?)\\s*=");

    constructor(document: TextDocument, private math: MathJsStatic) {
        this.document = document;
        this.updateTransformerSettings();
        this.updateFormatterSettings();
    }

    updateTransformerSettings() {
        this.transformerSettings = {
            convertLocalCurrency: convertLocalCurrency(),
            localCurrencySymbol: localCurrencySymbol(),
            localCurrencyCode: localCurrencyCode(),
            temperatureShortcut: temperatureShortcut()
        };
    }

    updateFormatterSettings() {
        this.formatterSettings = {
            lowerExponentBound: lowerExponentBound(),
            upperExponentBound: upperExponentBound(),
            precision: precision(),
            notation: notation(),
            displayCommas: displayCommas(),
            trimTrailingZeros: trimTrailingZeros(),
            convertLocalCurrency: convertLocalCurrency(),
            localCurrencyCode: localCurrencyCode(),
            localCurrencySymbol: localCurrencySymbol()
        };
    }

    /**
     * Re-evaluate any math expressions in the document.
     */
    evaluate() {
        this.results.clear();
        let scope = defaultScope();
        this.updateTransformerSettings();
        this.updateFormatterSettings();
        this.widestLine = 0;
        let qalcEnabled = true;

        // TODO: These global declarations are evaluated every time the document is evaluated.
        //      This is not ideal because of performance
        //      Would make more sense to only evaluate these every time the settings are changed and when the vscode extension first loads
        this.addGlobalDeclarations(scope);

        for (let lineNumber = 0; lineNumber < this.document.lineCount; lineNumber++) {
            const line = this.document.lineAt(lineNumber);

            if (!line.isEmptyOrWhitespace) {
                const trimmed = line.text.trim();

                if (trimmed.replace(/ /g, '') === '//qalc:off') {
                    qalcEnabled = false;
                    continue;
                } else if (trimmed.replace(/ /g, '') === '//qalc:on') {
                    qalcEnabled = true;
                    continue;
                }
                if (!qalcEnabled) {
                    continue;
                }

                if (line.text.length > this.widestLine && this.isNotCommentOrHeaderOnly(line.text)) {
                    this.widestLine = line.text.length;
                }
                const errorMessage = this.checkForError(trimmed);
                if (errorMessage) {
                    this.results.set(lineNumber, errorMessage);
                    continue;
                }
                const aggregated = this.aggregate(trimmed, lineNumber);

                const transformed = transform(aggregated, this.transformerSettings);

                const compiled = this.compile(transformed);

                if (compiled) {
                    try {
                        const result = compiled.evaluate(scope);
                        scope["last"] = result;

                        // Only display value results.
                        if (typeof result !== "function" && typeof result !== "undefined") {
                            this.results.set(lineNumber, result);
                        }
                    } catch (error) {
                        // console.log(error);
                    }
                }
            }
        }
    }

    /**
     * Add global declarations to the scope from the settings into the document
     *
     * If the declaration is invalid it wont be added NOR will it throw an error or a warning
     */
    private addGlobalDeclarations(scope: any) {
        const declarations = globalDeclarations();

        for (let declaration of declarations) {
            const trimmed = declaration.trim();

            if (!this.isNotCommentOrHeaderOnly(trimmed) || this.checkForError(trimmed)) {
                return;
            }

            const transformed = transform(trimmed, this.transformerSettings);
            const compiled = this.compile(transformed);

            if (compiled) {
                try {
                    const result = compiled.evaluate(scope);
                } catch (error) {
                    // TODO: Add a try catch here to catch invalid declarations
                }
            }
        }
    }

    private isNotCommentOrHeaderOnly(line: string) {
        return ! /^\s*(#|\/\/)/.test(line);
    }

    private checkForError(line: string): string | null {

        // Check for assignment before running more expensive regex
        if (/^\s*\w+\s*=/.test(line)) {
            if (this.reassignErrorRegex.test(line)) {
                return "Cannot reassign unit or keyword: " + line.match(this.reassignErrorRegex)![1];
            }
        }

        return null;
    }

    clearCache() {
        this.compileCache.clear();
    }

    private aggregationFunctionRegex = new RegExp("\\b(sum|total|avg|average)(?!\\()");
    private averageFunctionRegex = new RegExp("\\b(avg|average)(?!\\()");

    private aggregate(line: string, lineNumber: number): string {
        line = line.trim();

        if (this.aggregationFunctionRegex.test(line)) {

            const settingsClone = Object.assign({}, this.formatterSettings);
            settingsClone.displayCommas = false;

            let aggregate = "";
            let datapoints = 0;
            for (let currentLine = lineNumber - 1; currentLine >= 0; currentLine--) {
                let result = this.results.get(currentLine);
                if ((result === undefined || result === null || this.aggregationFunctionRegex.test(this.document.lineAt(currentLine).text.trim()))) {
                    if (datapoints > 0) {
                        break;
                    } else {
                        continue;
                    }
                }
                datapoints++;
                aggregate += " + " + format(this.math, result, settingsClone);
            }

            if (this.averageFunctionRegex.test(line)) {
                aggregate = "(" + aggregate + ") / " + datapoints;
            }

            return line.replace(this.aggregationFunctionRegex, "(" + aggregate + ")");
        }
        return line;
    }


    /**
     * Attempt to compile the given string as a math expression.
     *
     * @param text The math expression to compile.
     */
    private compile(text: string): math.EvalFunction | null {
        let compiled = this.compileCache.get(text);

        if (!compiled) {
            try {
                compiled = this.math.compile(text);
                this.compileCache.set(text, compiled);
            } catch (error) {
                // console.log(error);
                return null;
            }
        }

        return compiled;
    }
}
