import * as vscode from "vscode";


const SHOW_RESULTS_DELIMITER = "qalc.output.showDelimiter";

const RESULTS_DELIMITER = "qalc.output.delimiter";

const RESULTS_COLOR = "qalc.output.color";
const DEFAULT_RESULTS_COLOR = "terminal.ansiGreen";

const ALIGN_RESULTS = "qalc.output.align";
const MAX_ALIGNMENT_COLUMN = "qalc.output.maxAlignmentColumn";

const ENABLED_LANGUAGES = "qalc.enabledLanguages";

const DISPLAY_COMMAS = "qalc.output.displayCommas";

const PRECISION = "qalc.output.precision";
const LOWER_EXPONENT_BOUND = "qalc.output.lowerExponentBound";
const UPPER_EXPONENT_BOUND = "qalc.output.upperExponentBound";

const CONVERT_LOCAL_CURRENCY = "qalc.currency.convertLocal";
const LOCAL_CURRENCY_SYMBOL = "qalc.currency.localSymbol";
const LOCAL_CURRENCY_CODE = "qalc.currency.localCode";

const TEMPERATURE_SHORTCUT = "qalc.shortcuts.temperature";

function getConfiguration(key: string) {
    return vscode.workspace.getConfiguration().get(key);
}

export function showResultsDelimiter():boolean {
    return getConfiguration(SHOW_RESULTS_DELIMITER) as boolean;
}
export function resultsDelimiter():string {
    return getConfiguration(RESULTS_DELIMITER) as string;
}

export function getComputedResultsDelimiter(): string {
    if(showResultsDelimiter()) {
        return resultsDelimiter();
    } else {
        return "";
    }
}

export function resultsColor(): string {
    let color = getConfiguration(RESULTS_COLOR) as string;
    if(!color) {
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

export function displayCommas(): boolean {
    return getConfiguration(DISPLAY_COMMAS) as boolean;
}

export function precision(): number {
    // MathJS uses 1 as no digits after the decimal, so offset by 1
    return getConfiguration(PRECISION) as number + 1;
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

export function temperatureShortcut(): boolean {
    return getConfiguration(TEMPERATURE_SHORTCUT) as boolean;
}