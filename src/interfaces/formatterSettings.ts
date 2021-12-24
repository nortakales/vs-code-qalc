interface FormatterSettings {
    lowerExponentBound: number,
    upperExponentBound: number,
    precision: number,
    notation: "fixed" | "exponential" | "engineering" | "auto" | undefined
    displayCommas: boolean,
    trimTrailingZeros: boolean
    convertLocalCurrency: boolean,
    localCurrencySymbol: string,
    localCurrencyCode: string
}