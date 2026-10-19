/* eslint-disable @typescript-eslint/naming-convention */
import TestSuite from "../testSuite";

const formatterSettings: FormatterSettings = {
    lowerExponentBound: -9,
    upperExponentBound: 16,
    precision: 5,
    notation: 'auto',
    digitGroupingSymbol: ',',
    decimalSeparator: '.',
    trimTrailingZeros: true,
    convertLocalCurrency: true,
    localCurrencyCode: "USD",
    localCurrencySymbol: "$"
};

export const suite_en_GB: TestSuite = {
    name: "Date Locale: en-GB",
    tests: {
        "1/30/2021": "30/01/2021",
        "2021-1-30": "30/01/2021",
        "1/30/2021 19:10": "30/01/2021, 19:10:00",
        "date(\"12000/60/5\")": "Invalid Date"
    },
    formatterSettings: { ...formatterSettings, dateLocale: "en-GB" }
};

export const suite_sv_SE: TestSuite = {
    name: "Date Locale: sv-SE",
    tests: {
        "1/30/2021": "2021-01-30",
        "1/30/2021 19:10": "2021-01-30 19:10:00"
    },
    formatterSettings: { ...formatterSettings, dateLocale: "sv-SE" }
};

export const suite_invalid: TestSuite = {
    name: "Date Locale: invalid falls back to default",
    tests: {
        "1/30/2021": "1/30/2021",
        "1/30/2021 19:10": "1/30/2021, 7:10:00 PM"
    },
    formatterSettings: { ...formatterSettings, dateLocale: "not a locale!" }
};
