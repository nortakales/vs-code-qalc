interface FormatterSettings {
    lowerExponentBound: number,
    upperExponentBound: number,
    precision: number,
    notation: "fixed" | "exponential" | "engineering" | "auto" | undefined,
    digitGroupingSymbol: string,
    decimalSeparator: string,
    trimTrailingZeros: boolean,
    convertLocalCurrency: boolean,
    localCurrencySymbol: string,
    localCurrencyCode: string
}