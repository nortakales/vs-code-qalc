import { MathJsStatic } from 'mathjs';
import math = require('mathjs');
import { TextDocument } from 'vscode';
import { format } from './formatter';
import { defaultScope } from './math';
import { convertLocalCurrency, displayCommas, localCurrencyCode, localCurrencySymbol, lowerExponentBound, precision, temperatureShortcut, upperExponentBound } from './settings';
import { transform } from './transformer';

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
            displayCommas: displayCommas(),
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

        for (let lineNumber = 0; lineNumber < this.document.lineCount; lineNumber++) {
            const line = this.document.lineAt(lineNumber);

            if (!line.isEmptyOrWhitespace) {
                const trimmed = line.text.trim();

                if(line.text.length > this.widestLine && this.isNotCommentOrHeaderOnly(line.text)) {
                    this.widestLine = line.text.length;
                }
                const aggregated = this.aggregate(trimmed, lineNumber);
                
                const transformed = transform(aggregated, this.transformerSettings);
                const errorMessage = this.checkForError(transformed);
                if(errorMessage) {
                    this.results.set(lineNumber, errorMessage);
                    continue;
                }

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

    private isNotCommentOrHeaderOnly(line: string) {
        return ! /^\s*(#|\/\/)/.test(line);
    }

    private checkForError(line: string): string|null {

        // Check for assignment before running more expensive regex
        if(/^\s*\w+\s*=/.test(line)) {
            if(this.reassignErrorRegex.test(line)) {
                return "Cannot reassign unit or keyword: " + line.replace(this.reassignErrorRegex, "$1");
            }
        }

        return null;
    }

    clearCache() {
        this.compileCache.clear();
    }

    private aggregate(line: string, lineNumber: number): string {
        line = line.trim();

        if(/^sum|total|avg|average$/.test(line)) {
            let aggregate = "";
            let datapoints = 0;
            for(let currentLine = lineNumber - 1; currentLine >= 0; currentLine--) {
                let result = this.results.get(currentLine);
                if((result == undefined || result == null || /^sum|total|avg|average$/.test(this.document.lineAt(currentLine).text.trim()))) {
                    if(datapoints > 0) {
                        break;
                    } else {
                        continue;
                    }
                }
                datapoints++;
                aggregate += " + " + format(this.math, result, this.formatterSettings);
            }

            if(/^(avg|average)$/.test(line)) {
                aggregate = "(" + aggregate + ") / " + datapoints;
            }
            
            return aggregate;
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
