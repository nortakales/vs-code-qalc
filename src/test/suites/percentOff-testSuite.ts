import TestSuite from "../testSuite";

export const suite: TestSuite = {
    name: "Percent Off",
    tests: {
        "50% off of 100": "50",
        "50% off of 10.0": "5",
        "50% off of $100": "50 USD",
        "50% off of $10.0": "5 USD",
        "50% off of $1,000": "500 USD",
        "50% off of $100USD": "50 USD",
        "50% off of $100 USD": "50 USD",
        "50% off of 100 USD": "50 USD",
        "50% off 100": "50",
        "50% off 10.0": "5",
        "50% off $100": "50 USD",
        "50% off $10.0": "5 USD",
        "50% off $1,000": "500 USD",
        "50% off $100USD": "50 USD",
        "50% off $100 USD": "50 USD",
        "50% off 100 USD": "50 USD"
    }
}