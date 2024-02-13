import * as vscode from "vscode";

const SHOW_RESULTS_DELIMITER = "qalc.output.showDelimiter";

const RESULTS_DELIMITER = "qalc.output.delimiter";

const RESULTS_COLOR = "qalc.output.color";
const DEFAULT_RESULTS_COLOR = "terminal.ansiGreen";

const ALIGN_RESULTS = "qalc.output.align";
const MAX_ALIGNMENT_COLUMN = "qalc.output.maxAlignmentColumn";

const ENABLED_LANGUAGES = "qalc.enabledLanguages";
const DISABLED_PATTERNS = "qalc.disabledPatterns";

const DIGIT_GROUPING_SYMBOL = "qalc.output.digitGroupingSymbol";
const DECIMAL_SEPARATOR = "qalc.output.decimalSeparator";
const TRIM_TRAILING_ZEROS = "qalc.output.trimTrailingZeros";

const LOWER_EXPONENT_BOUND = "qalc.output.lowerExponentBound";
const UPPER_EXPONENT_BOUND = "qalc.output.upperExponentBound";
const PRECISION = "qalc.output.precision";
const NOTATION = "qalc.output.notation";

const CONVERT_LOCAL_CURRENCY = "qalc.currency.convertLocal";
const LOCAL_CURRENCY_SYMBOL = "qalc.currency.localSymbol";
const LOCAL_CURRENCY_CODE = "qalc.currency.localCode";
const CURRENCY_API_KEY = "qalc.currency.apiKey";

const TEMPERATURE_SHORTCUT = "qalc.shortcuts.temperature";

const GLOBAL_DECLARATIONS = "qalc.globalDeclarations";

function getConfiguration(key: string) {
    return vscode.workspace.getConfiguration().get(key);
}

export function showResultsDelimiter(): boolean {
    return getConfiguration(SHOW_RESULTS_DELIMITER) as boolean;
}
export function resultsDelimiter(): string {
    return getConfiguration(RESULTS_DELIMITER) as string;
}

export function getComputedResultsDelimiter(): string {
    if (showResultsDelimiter()) {
        return resultsDelimiter();
    } else {
        return "";
    }
}

export function resultsColor(): string {
    let color = getConfiguration(RESULTS_COLOR) as string;
    if (!color) {
        color = DEFAULT_RESULTS_COLOR;
    }
    return color;
}

export function alignResults(): boolean {
    return getConfiguration(ALIGN_RESULTS) as boolean;
}

export function maxAlignmentColumn(): number {
    return getConfiguration(MAX_ALIGNMENT_COLUMN) as number;
}

export function enabledLanguages(): [] {
    return getConfiguration(ENABLED_LANGUAGES) as [];
}
export function disabledPatterns(): [] {
    return getConfiguration(DISABLED_PATTERNS) as [];
}

export function digitGroupingSymbol(): string {
    return getConfiguration(DIGIT_GROUPING_SYMBOL) as string;
}

export function decimalSeparator(): string {
    return getConfiguration(DECIMAL_SEPARATOR) as string;
}

export function trimTrailingZeros(): boolean {
    return getConfiguration(TRIM_TRAILING_ZEROS) as boolean;
}

export function precision(): number {
    return getConfiguration(PRECISION) as number;
}

export function notation(): "fixed" | "exponential" | "engineering" | "auto" {
    return (getConfiguration(NOTATION) as "fixed" | "exponential" | "engineering" | "auto") || 'auto';
}

export function lowerExponentBound(): number {
    return getConfiguration(LOWER_EXPONENT_BOUND) as number;
}

export function upperExponentBound(): number {
    return getConfiguration(UPPER_EXPONENT_BOUND) as number;
}

export function convertLocalCurrency(): boolean {
    return getConfiguration(CONVERT_LOCAL_CURRENCY) as boolean;
}
export function localCurrencySymbol(): string {
    return getConfiguration(LOCAL_CURRENCY_SYMBOL) as string;
}
export function localCurrencyCode(): string {
    return getConfiguration(LOCAL_CURRENCY_CODE) as string;
}
export function currencyApiKey(): string {
    return getConfiguration(CURRENCY_API_KEY) as string;
}

export function temperatureShortcut(): boolean {
    return getConfiguration(TEMPERATURE_SHORTCUT) as boolean;
}

export function globalDeclarations(): string[] {
    return getConfiguration(GLOBAL_DECLARATIONS) as string[];
}
