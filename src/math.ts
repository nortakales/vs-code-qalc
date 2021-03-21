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
        date: parseDate,
        epoch: parseDate
    }, {});

    math.createUnit("tps");

    // Can't get pixels to work, might need newer API version
    //math.createUnit("pixels";

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

    function sumLatest(latestArray: any[]) {

        let sum = "";
        latestArray.forEach((result) => {
            sum += result + " + ";
        });
        sum = sum.substring(0, sum.length-3);
        
        return sum;
    }

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

    if(isNumber(inputAsString)) {
        if(inputAsString.length < 12) {
            inputAsString += "000";
        }
        return new Date(Number(inputAsString));
    }
    
    return new Date(inputAsString);
}

function isNumber(value: string | number): boolean {
   return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
}