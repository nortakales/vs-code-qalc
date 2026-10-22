import {
    DecorationOptions,
    DecorationRangeBehavior,
    Disposable,
    DocumentSelector,
    languages,
    TextDocument,
    TextEditor,
    ThemeColor,
    Uri,
    window,
    workspace,
    ExtensionContext,
    TextEditorDecorationType,
    env,
    DocumentFilter,
    Range,
    commands,
} from "vscode";
import MathDocument from "./document";
import { MathJsStatic } from 'mathjs';
import { applyCustomUnits, create, setDateFormat } from "./math";
import { format } from "./formatter";
import { alignResults, convertLocalCurrency, CUSTOM_UNITS, customUnits, dateFormat, decimalSeparator, digitGroupingSymbol, disabledPatterns, enabledLanguages, explicitActivationLanguages, getComputedResultsDelimiter, localCurrencyCode, localCurrencySymbol, lowerExponentBound, maxAlignmentColumn, notation, precision, resultsColor, resultsDelimiter, trimTrailingZeros, upperExponentBound } from "./settings";
import { createFullDocumentRange } from "./utils";

export default class EditorDecorator implements Disposable {

    private documents = new Map<Uri, MathDocument>();
    private debounceTimers = new Map<Uri, ReturnType<typeof setTimeout>>();
    private disposables: Disposable[] = [];
    private math: MathJsStatic;
    private gap: number = 2;
    private enabledContext: boolean | undefined;

    // Settings
    private decorationType!: TextEditorDecorationType;
    private resultsDelimiter!: string;
    private alignResults!: boolean;
    private maxAlignmentColumn!: number;
    private enabledLanguages!: DocumentSelector;
    private explicitActivationLanguages!: DocumentSelector;
    private disabledPatterns!: string[];
    private formatterSettings!: FormatterSettings;

    constructor(private ctx: ExtensionContext) {
        this.computeSettings();

        this.math = create(ctx, () => {
            // Retry custom units now that currencies exist, in case any are defined in terms of them
            this.loadCustomUnits(true);
            this.renderAll(true);
        });
        this.loadCustomUnits(false);

        // Handle editors being created and disposed, which we might be
        // interested in.
        this.disposables.push(window.onDidChangeVisibleTextEditors(() => {
            this.renderAll();
        }));

        // Keep the context key used by the editor context menu in sync with the active editor
        this.disposables.push(window.onDidChangeActiveTextEditor(() => {
            this.updateEnabledContext();
        }));

        // An editor's language could change, so re-evaluate an editor when that
        // happens.
        this.disposables.push(window.onDidChangeTextEditorOptions(event => {
            this.renderEditor(event.textEditor);
        }));

        // Re-render when a math document is edited.
        this.disposables.push(workspace.onDidChangeTextDocument(event => {
            // If this document isn't math-enabled, then do nothing.
            if (!this.isMathEnabled(event.document)) {
                return;
            }

            const uri = event.document.uri;
            const existing = this.debounceTimers.get(uri);
            if (existing) {
                clearTimeout(existing);
            }
            this.debounceTimers.set(uri, setTimeout(() => {
                this.debounceTimers.delete(uri);
                // Find all editors for this document and re-render their math.
                window.visibleTextEditors.forEach(editor => {
                    if (editor.document.uri === uri) {
                        this.renderEditor(editor);
                    }
                });
            }, 500));
        }));

        // Cleanup our math document data when a text document is closed.
        this.disposables.push(workspace.onDidCloseTextDocument(document => {
            this.documents.delete(document.uri);
        }));

        // Listen for configuration changes and update visible editors if so
        this.disposables.push(workspace.onDidChangeConfiguration(event => {
            if (!event.affectsConfiguration('qalc')) {
                return;
            }
            this.computeSettings();

            // Previously compiled expressions may reference units that didn't exist yet
            const unitsChanged = event.affectsConfiguration(CUSTOM_UNITS);
            if (unitsChanged) {
                this.loadCustomUnits(true);
            }
            this.renderAll(unitsChanged);
        }));

        // Do a first-pass on initial load.
        this.renderAll();
    }

    computeSettings() {

        this.resultsDelimiter = getComputedResultsDelimiter();
        this.alignResults = alignResults();
        this.maxAlignmentColumn = maxAlignmentColumn();
        this.enabledLanguages = enabledLanguages();
        this.explicitActivationLanguages = explicitActivationLanguages();
        this.disabledPatterns = disabledPatterns();

        const color = resultsColor();
        let colorProperty: ThemeColor | string;
        if (/(#[A-Fa-f0-9]{6})|(rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\))/.test(color)) {
            colorProperty = color;
        } else {
            colorProperty = new ThemeColor(color);
        }

        if (this.decorationType) {
            this.decorationType.dispose();
        }
        this.decorationType = window.createTextEditorDecorationType({
            after: {
                color: colorProperty,
                fontStyle: "normal"
                //backgroundColor: new ThemeColor("editor.lineHighlightBackground"),
            },
            isWholeLine: true,
            rangeBehavior: DecorationRangeBehavior.ClosedClosed,
        });

        this.formatterSettings = {
            lowerExponentBound: lowerExponentBound(),
            upperExponentBound: upperExponentBound(),
            precision: precision(),
            notation: notation(),
            digitGroupingSymbol: digitGroupingSymbol(),
            decimalSeparator: decimalSeparator(),
            trimTrailingZeros: trimTrailingZeros(),
            convertLocalCurrency: convertLocalCurrency(),
            localCurrencyCode: localCurrencyCode(),
            localCurrencySymbol: localCurrencySymbol(),
            dateFormat: dateFormat()
        };

        // Dates are read by the math instance, so it needs to know the format too
        setDateFormat(dateFormat());
    }

    /**
     * Re-render all math decorations on all math-enabled editors.
     */
    renderAll(clearCache?: boolean) {
        window.visibleTextEditors.forEach(editor => this.renderEditor(editor, clearCache));
        this.updateEnabledContext();
    }

    /**
     * Create the units from the "qalc.customUnits" setting.
     *
     * Note: removing a unit from the setting only takes effect after a reload, since math.js
     * caches unit lookups and has no reliable way to delete a unit.
     */
    private loadCustomUnits(showErrors: boolean) {
        const errors = applyCustomUnits(this.math, customUnits());
        if (showErrors && errors.length > 0) {
            window.showWarningMessage(`Qalc: could not load custom units from "${CUSTOM_UNITS}". ${errors.join(" ")}`);
        }
    }

    /**
     * Set the "qalc.enabled" context key, which controls when Qalc entries show in the editor context menu.
     */
    private updateEnabledContext() {
        const editor = window.activeTextEditor;
        const enabled = editor !== undefined && this.isMathEnabled(editor.document);
        if (enabled !== this.enabledContext) {
            this.enabledContext = enabled;
            commands.executeCommand("setContext", "qalc.enabled", enabled);
        }
    }

    /**
     * Re-render all math decorations on the given editor.
     */
    renderEditor(editor: TextEditor, clearCache?: boolean) {

        let decorationsArray: DecorationOptions[] = [];

        if (this.isMathEnabled(editor.document)) {
            let mathDocument = this.getMathDocument(editor.document);

            if (clearCache) {
                mathDocument.clearCache();
            }

            const qalcEnabledAtStart = !this.isExplicitActivation(editor.document);

            mathDocument.evaluate(qalcEnabledAtStart);

            mathDocument.results.forEach((value, lineNumber) => {
                decorationsArray.push({
                    range: mathDocument.document.lineAt(lineNumber).range,
                    renderOptions: {
                        after: {
                            contentText: `${this.resultsDelimiter}${format(this.math, value, this.formatterSettings)}`,
                            margin: `0 0 0 ${this.calculateMargin(mathDocument, lineNumber)}ch`
                        }
                    }
                });
            });
        }

        editor.setDecorations(this.decorationType, decorationsArray);
    }

    calculateMargin(mathDocument: MathDocument, lineNumber: number) {

        if (!this.alignResults) {
            return this.gap;
        }

        const alignmentColumn = Math.min(mathDocument.widestLine, this.maxAlignmentColumn);

        const lineLength = mathDocument.document.lineAt(lineNumber).text.length;

        let margin = alignmentColumn - lineLength;
        if (lineLength > alignmentColumn) {
            margin = 0;
        }
        return margin += this.gap;
    }

    dispose() {
        this.debounceTimers.forEach(timer => clearTimeout(timer));
        this.debounceTimers.clear();
        this.disposables.forEach(d => d.dispose());
    }

    private getMathDocument(document: TextDocument): MathDocument {
        let mathDocument = this.documents.get(document.uri);

        if (!mathDocument) {
            mathDocument = new MathDocument(document, this.math);
            this.documents.set(document.uri, mathDocument);
        }

        return mathDocument;
    }

    private isMathEnabled(document: TextDocument): boolean {
        const disabledPatternsFilter: DocumentFilter[] = this.disabledPatterns.map(disabledPattern => { return { pattern: disabledPattern }; });
        // Must NOT match a disabled pattern, and must match an enabled language
        return languages.match(disabledPatternsFilter, document) <= 0 && languages.match(this.enabledLanguages, document) > 0;
    }

    private isExplicitActivation(document: TextDocument): boolean {
        return languages.match(this.explicitActivationLanguages, document) > 0;
    }

    copyToClipboard(resultOnly: boolean, includeDelimiter: boolean) {
        const editor = window.activeTextEditor;
        if (!editor) {
            return;
        }
        let range;
        if (editor.selection && !editor.selection.isEmpty) {
            // The exact selection
            range = editor.selection;
        } else if (resultOnly) {
            // Just the current cursor position
            range = new Range(editor.selection.active, editor.selection.active);
        } else {
            // The full document
            range = createFullDocumentRange(editor);
        }
        const mathDocument = this.getMathDocument(editor.document);
        const delimiter = includeDelimiter ? resultsDelimiter() : '';

        let clipboard = "";
        for (let line = range.start.line; line <= range.end.line; line++) {
            if (!resultOnly) {
                clipboard += editor.document.lineAt(line).text;
            }
            if (mathDocument.results.has(line)) {
                let output = format(this.math, mathDocument.results.get(line), this.formatterSettings);
                let margin = new Array(this.calculateMargin(mathDocument, line) + 1).join(' ');
                if (!resultOnly) {
                    clipboard += `${margin}${delimiter}`;
                }
                clipboard += output;
            }
            clipboard += '\n';
        }

        env.clipboard.writeText(clipboard.trimEnd());
    }
}
