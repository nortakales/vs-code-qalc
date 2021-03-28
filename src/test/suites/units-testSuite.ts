import TestSuite from "../testSuite";

export const suite: TestSuite = {
    name: "Units",
    tests: {
        "1 mph": "1 mph",
        "1 mile/hour in mph": "1 mph",
        "1 mph in kph": "1.6093 kph",
        "1 mph in kilometers/hour": "1.6093 kilometers / hour",

        "16px in pt": "12 pt",
        "1 em in px": "16 px",
        "1 inch in px": "96 px"
    }
};
