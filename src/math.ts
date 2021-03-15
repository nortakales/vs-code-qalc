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
            'Date, Unit': function (a: Date, b: mathjs.Unit) {
                return new Date(a.getTime() + b.toNumber("ms"));
            },

            'Unit, Date': function (a: mathjs.Unit, b: Date) {
                return new Date(a.toNumber("ms") + b.getTime());
            },
        });
    });

    // Subtraction for dates.
    const subtractDate = math.factory('subtract', ['typed'], ({ typed }) => {
        // @ts-ignore
        return typed('subtract', {
            'Date, Unit': function (a: Date, b: mathjs.Unit) {
                return new Date(a.getTime() - b.toNumber("ms"));
            },

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
        date: function(input: string) {
            return new Date(input)
        }
    }, {});

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

    return math;
}

export function defaultScope(): any {
    let yesterday = today();
    yesterday.setDate(yesterday.getDate() - 1);

    let tomorrow = today();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return {
        today: today(),
        now: new Date(),
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
