
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
            // TODO settings for this stuff
            lowerExp: -9,
            upperExp: 15,
            precision: 5,
        });

        // Add thousands separators if number is formatted as fixed.
        if (/^\d+(\.\d+)?$/.test(s)) {
            s = s.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        return s;
    });
}