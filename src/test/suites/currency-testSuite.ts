import TestSuite from "../testSuite";

const eurRegex = "\\d+\\.\\d* EUR";

export const suite: TestSuite = {
    name: "Currency",
    tests: {
        "$1": "\$1",
        "1 USD": "\$1",
        //"1 EUR": "1 EUR",
        "1USD": "\$1",
        "$1 + $5": "\$6",
        "$1+$5": "\$6",
        //"$1 EUR": "1 EUR",
        "$10.0": "\$10",
        "$1000000": "\$1,000,000",
        "$1,000,000": "\$1,000,000",
        "100 USD / 1 hour in USD / minute": "\$1.6667 / minute",
        // "1 USD in EUR": {
        //     "match": eurRegex
        // },
        // "1 EUR in $": {
        //     "match": "\\$\\d+\\.\\d+"
        // }
    }
};
