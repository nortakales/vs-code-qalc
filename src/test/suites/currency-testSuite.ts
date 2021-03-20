import TestSuite from "../testSuite";

const eurRegex = "\\d+\\.\\d* EUR"

export const suite: TestSuite = {
    name: "Currency",
    tests: {
        "$1": "1 USD",
        "1 USD": "1 USD",
        "1USD": "1 USD",
        "$1 + $5": "6 USD",
        "$1+$5": "6 USD",
        "$1 EUR": "1 EUR",
        "$10.0": "10 USD",
        "$1000000": "1,000,000 USD",
        "$1,000,000": "1,000,000 USD",
        "100 USD / 1 hour in USD / minute": "1.6667 USD / minute",
        "1 USD in EUR": {
            "match": eurRegex
        }
    }
}
