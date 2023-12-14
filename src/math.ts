import * as mathjs from 'mathjs';
import { getExchangeRates } from './currency';
import { ExtensionContext } from 'vscode';
import { format } from './formatter';

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

    return math;
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

function parseDate(input: string | number): Date {

    let inputAsString = input.toString();

    if (isNumber(inputAsString)) {
        if (inputAsString.length < 12) {
            inputAsString += "000";
        }
        return new Date(Number(inputAsString));
    }

    return new Date(inputAsString);
}

function isNumber(value: string | number): boolean {
    return ((value !== undefined) && (value !== null) && (value !== '') && !isNaN(Number(value.toString())));
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