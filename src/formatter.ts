const PLACEHOLDER = 'PH';

/**
 * Format a date in the "qalc.dateFormat" order, including the time only if it isn't midnight.
 * Done by hand rather than with toLocaleString so the output matches how dates are read.
 */
function formatDate(value: Date, dateFormat?: DateFormat): string {
    if (isNaN(value.getTime())) {
        return "Invalid Date";
    }

    const pad = (n: number) => String(n).padStart(2, "0");
    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const day = value.getDate();
    const hours = value.getHours();
    const minutesAndSeconds = `${pad(value.getMinutes())}:${pad(value.getSeconds())}`;
    const hasTime = hours || value.getMinutes() || value.getSeconds() || value.getMilliseconds();

    switch (dateFormat) {
        case "day/month/year":
            return `${pad(day)}/${pad(month)}/${year}` + (hasTime ? `, ${pad(hours)}:${minutesAndSeconds}` : "");
        case "year-month-day":
            return `${year}-${pad(month)}-${pad(day)}` + (hasTime ? ` ${pad(hours)}:${minutesAndSeconds}` : "");
        default:
            return `${month}/${day}/${year}` + (hasTime ? `, ${hours % 12 || 12}:${minutesAndSeconds} ${hours < 12 ? "AM" : "PM"}` : "");
    }
}

/**
 * Format a numeric result as a string for display.
 *
 * @param value Number to format
 */
export function format(math: math.MathJsStatic, value: any, formatterSettings: FormatterSettings): string {

    if (value instanceof Date) {
        return formatDate(value, formatterSettings.dateFormat);
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

        output = output.replace(/(?<=\d+)\.(?=\d+)/g, PLACEHOLDER);

        if (formatterSettings.digitGroupingSymbol !== '') {
            // Add thousands separators if number is formatted as fixed.
            if (/^\-?\d+(PH\d+)?$/.test(output)) {
                output = output.replace(/\B(?<!PH\d*)(?=(\d{3})+(?!\d))/g, formatterSettings.digitGroupingSymbol);
            }
        }

        output = output.replace(/(?<=\d+)PH(?=\d+)/g, formatterSettings.decimalSeparator);

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