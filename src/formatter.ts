import { displayCommas, lowerExponentBound, precision, upperExponentBound } from "./settings";

/**
 * Format a numeric result as a string for display.
 *
 * @param value Number to format
 */
export function format(math: math.MathJsStatic, value: any, formatterSettings: FormatterSettings): string {

    if (value instanceof Date) {
        if (value.getHours() || value.getMinutes() || value.getSeconds() || value.getMilliseconds()) {
            return value.toLocaleString();
        }
        return value.toLocaleDateString();
    }

    let stringOutput = math.format(value, number => {
        let output = math.format(number, {
            lowerExp: formatterSettings.lowerExponentBound,
            upperExp: formatterSettings.upperExponentBound,
            precision: formatterSettings.precision,
            notation: formatterSettings.notation
        });

        if (formatterSettings.trimTrailingZeros) {
            // Make sure there is a decimal value
            if (/^\-?\d+\.\d+$/.test(output)) {
                output = output.replace(/0+$/, '');
            }

            // If we stripped all of the decimal, remove the .
            if (/\.$/.test(output)) {
                output = output.replace(/\.$/, '');
            }
        }

        if (formatterSettings.displayCommas) {
            // Add thousands separators if number is formatted as fixed.
            if (/^\-?\d+(\.\d+)?$/.test(output)) {
                output = output.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
        }

        return output;
    });

    if (formatterSettings.convertLocalCurrency) {

        const code = formatterSettings.localCurrencyCode;
        let symbol = formatterSettings.localCurrencySymbol;
        // To prevent escaping of the $1 replacement
        symbol += symbol === "$" ? "$" : "";

        const replacingRegex = new RegExp(`\\b([\\d\\.\\,]+) ${code}`, "g");

        if (replacingRegex.test(stringOutput)) {
            stringOutput = stringOutput.replace(replacingRegex, `${symbol}$1`);
        }
    }

    return stringOutput;
}