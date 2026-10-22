import * as mathjs from 'mathjs';
import { getExchangeRates } from './currency';
import { ExtensionContext } from 'vscode';

/**
 * Create a customized math.js instance.
 */
export function create(ctx: ExtensionContext, callback: Function): mathjs.MathJsStatic {
    const math = mathjs.create(mathjs.all, {}) as mathjs.MathJsStatic;

    // Addition for dates.
    const addDate = math.factory('add', ['typed'], ({ typed }) => {
        // @ts-ignore
        return typed('add', {

            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Date, Unit': function (a: Date, b: mathjs.Unit) {
                return new Date(a.getTime() + b.toNumber("ms"));
            },

            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Unit, Date': function (a: mathjs.Unit, b: Date) {
                return new Date(a.toNumber("ms") + b.getTime());
            },
        });
    });

    // Subtraction for dates.
    const subtractDate = math.factory('subtract', ['typed'], ({ typed }) => {
        // @ts-ignore
        return typed('subtract', {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Date, Unit': function (a: Date, b: mathjs.Unit) {
                return new Date(a.getTime() - b.toNumber("ms"));
            },

            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Date, Date': function (a: Date, b: Date) {
                return math.unit(a.getTime() - b.getTime(), "ms").to("s");
            },
        });
    });

    math.import([
        addDate,
        subtractDate,
    ], {});

    math.import({
        date: parseDate,
        epoch: parseDate
    }, {});

    math.createUnit("tps");

    // TODO need a way to adjust the ratios either in the editor or through config
    math.createUnit("pixel", {
        aliases: ["pixels", "px"],
        definition: "0.01041666666 inch", // 96 pixels per inch
    });

    math.createUnit("point", {
        aliases: ["points", "pt"], // Overrides pint
        definition: "1.3333333333333 px", // 1px is .75 pt
    }, { override: true });

    math.createUnit("em", {
        definition: "16 px",
    });

    math.createUnit("mph", {
        definition: "1 miles/hour",
    });
    math.createUnit("kph", {
        definition: "1 kilometers/hour",
    });

    getExchangeRates(ctx).then(data => {
        math.createUnit(data.base);
        let loaded = 1;

        Object.keys(data.rates)
            .filter(currency => currency !== data.base)
            .forEach(currency => {
                math.createUnit(currency, `${1 / data.rates[currency]} ${data.base}`);
                loaded += 1;
            });

        console.log("Loaded definitions for %d currencies.", loaded);
        callback();
    });

    math.import({
        hexToChar: hexToChar,
        charToHex: charToHex
    }, {});

    // Degrees, minutes, seconds. Plain numbers given to toDms are radians, like the trig functions.
    math.import({
        dms: (degrees: number, minutes?: number, seconds?: number) => math.unit(dmsToDegrees(degrees, minutes, seconds), "deg"),
        toDms: (angle: mathjs.Unit | number) => new DegreesMinutesSeconds(typeof angle === "number" ? angle * 180 / Math.PI : angle.toNumber("deg"))
    }, {});

    return math;
}

/**
 * Create (or redefine) user-configured units. Each unit is created separately so one bad
 * definition doesn't prevent the rest from loading.
 *
 * @returns An error message for each unit that could not be created
 */
export function applyCustomUnits(math: mathjs.MathJsStatic, units: CustomUnits): string[] {
    const errors: string[] = [];

    Object.entries(units ?? {}).forEach(([name, definition]) => {
        try {
            math.createUnit({ [name]: definition } as any, { override: true });
        } catch (error) {
            errors.push(error instanceof Error ? error.message : `Could not create unit "${name}"`);
        }
    });

    return errors;
}

export function defaultScope(): any {
    let yesterday = today();
    yesterday.setDate(yesterday.getDate() - 1);

    let tomorrow = today();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const currentTime = new Date();

    return {
        today: today(),
        now: currentTime,
        time: currentTime,
        yesterday: yesterday,
        tomorrow: tomorrow
    };
}

function today(): Date {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    return today;
}

// Order used to read dates like 1/2/2021, from the "qalc.dateFormat" setting
let dateFormat: DateFormat = "month/day/year";

export function setDateFormat(format: DateFormat) {
    dateFormat = format;
}

// Numeric dates like 30/1/2021 or 2021-01-30, optionally followed by a time
const numericDateRegex = /^\s*(\d{1,4})[-/](\d{1,2})[-/](\d{1,4})(,?\s.*)?$/;

function parseDate(input: string | number): Date {

    let inputAsString = input.toString();

    if (isNumber(inputAsString)) {
        if (inputAsString.length < 12) {
            inputAsString += "000";
        }
        return new Date(Number(inputAsString));
    }

    // Rearrange numeric dates into month/day/year, which JavaScript reads as local time.
    // It doesn't read day/month/year at all, and reads 2021-01-30 as midnight UTC.
    const match = numericDateRegex.exec(inputAsString);
    if (match) {
        const [, first, second, third, time = ""] = match;
        let month, day, year;
        if (first.length > 2) {
            // Can only be a year
            [year, month, day] = [first, second, third];
        } else if (dateFormat === "day/month/year") {
            [day, month, year] = [first, second, third];
        } else {
            [month, day, year] = [first, second, third];
        }
        inputAsString = `${month}/${day}/${year}${time}`;
    }

    return new Date(inputAsString);
}

function isNumber(value: string | number): boolean {
    return ((value !== undefined) && (value !== null) && (value !== '') && !isNaN(Number(value.toString())));
}

function dmsToDegrees(degrees: number, minutes: number = 0, seconds: number = 0): number {
    if (typeof degrees !== "number" || typeof minutes !== "number" || typeof seconds !== "number") {
        throw new TypeError("dms(degrees, minutes, seconds) expects numbers");
    }
    // The sign comes from the first non-zero part, so dms(0, -30) is -0.5 degrees
    const negative = degrees < 0 || (degrees === 0 && (minutes < 0 || (minutes === 0 && seconds < 0)));
    const total = Math.abs(degrees) + Math.abs(minutes) / 60 + Math.abs(seconds) / 3600;
    return negative ? -total : total;
}

/**
 * An angle displayed as degrees, minutes and seconds, e.g. 40° 11' 15"
 */
class DegreesMinutesSeconds {
    constructor(private readonly degrees: number) { }

    /**
     * Called by math.format, which passes along the function used to format numbers so the
     * seconds respect the precision and separator settings.
     */
    format(options?: any): string {
        // Round off floating point noise so 15" doesn't come out as 14.99999..."
        const totalSeconds = Math.round(Math.abs(this.degrees) * 3600 * 1e6) / 1e6;
        const degrees = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds - degrees * 3600) / 60);
        const seconds = totalSeconds - degrees * 3600 - minutes * 60;

        const sign = this.degrees < 0 && totalSeconds > 0 ? "-" : "";
        const formattedSeconds = typeof options === "function" ? options(seconds) : String(seconds);
        return `${sign}${degrees}° ${minutes}' ${formattedSeconds}"`;
    }

    toString(): string {
        return this.format();
    }
}

function hexToChar(input: string) {
    const hexes = input.match(/.{1,4}/g) || [];
    var string = "";
    for (var hex of hexes) {
        string += String.fromCharCode(parseInt(hex, 16));
    }
    return string;
}

function charToHex(input: string) {
    var result = "";
    for (var index = 0; index < input.length; index++) {
        var hex = input.charCodeAt(index).toString(16);
        result += ("000" + hex).slice(-4);
    }
    return result.toUpperCase();
}