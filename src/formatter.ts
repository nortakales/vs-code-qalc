import { displayCommas, lowerExponentBound, precision, upperExponentBound } from "./settings";

/**
 * Format a numeric result as a string for display.
 *
 * @param value Number to format
 */
export function format(math: math.MathJsStatic, value: any): string {
    if (value instanceof Date) {
        if (value.getHours() || value.getMinutes() || value.getSeconds() || value.getMilliseconds()) {
            return value.toLocaleString();
        }
        return value.toLocaleDateString();
    }

    return math.format(value, number => {
        let s = math.format(number, {
            lowerExp: lowerExponentBound(),
            upperExp: upperExponentBound(),
            precision: precision(),
        });

        if (displayCommas()) {
            // Add thousands separators if number is formatted as fixed.
            if (/^\d+(\.\d+)?$/.test(s)) {
                s = s.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
        }

        return s;
    });
}