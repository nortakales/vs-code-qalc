import { MathJsStatic } from 'mathjs';
import { TextDocument } from 'vscode';
import { defaultScope } from './math';
import { transform } from './transformer';

/**
 * A math-enabled text document.
 */
export default class MathDocument {
    document: TextDocument;
    results = new Map<number, any>();
    widestLine: number = 0;

    // Expression compiler cache.
    private compileCache = new Map<string, math.EvalFunction>();

    constructor(document: TextDocument, private math: MathJsStatic) {
        this.document = document;
    }

    /**
     * Re-evaluate any math expressions in the document.
     */
    evaluate() {
        this.results.clear();
        let scope = defaultScope();
        this.widestLine = 0;

        for (let lineNumber = 0; lineNumber < this.document.lineCount; lineNumber++) {
            const line = this.document.lineAt(lineNumber);

            if (!line.isEmptyOrWhitespace) {
                const trimmed = line.text.trim();

                if(line.text.length > this.widestLine) {
                    this.widestLine = line.text.length;
                }

                const transformed = transform(trimmed);
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

    clearCache() {
        this.compileCache.clear();
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
