import TestSuite from "../testSuite";

export const suite: TestSuite = {
    name: "Percent Off",
    tests: {
        "50% off of 100": "50",
        "50% off of 10.0": "5",
        "50% off of $100": "$50",
        "50% off of 100 EUR": "50 EUR",
        "50% off of $10.0": "$5",
        "50% off of 10.0 EUR": "5 EUR",
        "50% off of $1,000": "$500",
        "50% off of 1,000 EUR": "500 EUR",
        "50% off of $100USD": "$50",
        "50% off of $100EUR": "50 EUR",
        "50% off of $100 USD": "$50",
        "50% off of $100 EUR": "50 EUR",
        "50% off of 100 USD": "$50",
        "50% off 100": "50",
        "50% off 10.0": "5",
        "50% off $100": "$50",
        "50% off $10.0": "$5",
        "50% off $1,000": "$500",
        "50% off $100USD": "$50",
        "50% off $100 USD": "$50",
        "50% off 100 USD": "$50",
        "50% off $100EUR": "50 EUR",
        "50% off $100 EUR": "50 EUR",
        "50% off 100 EUR": "50 EUR"
    }
};