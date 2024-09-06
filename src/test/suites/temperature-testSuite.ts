/* eslint-disable @typescript-eslint/naming-convention */
import TestSuite from "../testSuite";

export const suite: TestSuite = {
    name: "Units",
    tests: {
        "1 f": "1 degF",
        "12 f": "12 degF",
        "1f": "1 degF",
        "12f": "12 degF",
        "1 oF": "1 degF",
        "12 oF": "12 degF",
        "1oF": "1 degF",
        "12oF": "12 degF",
        "1 degF": "1 degF",
        "12 degF": "12 degF",
        "1degF": "1 degF",
        "12degF": "12 degF",
        "1 fahrenheit": "1 fahrenheit",
        "12 fahrenheit": "12 fahrenheit",
        "1fahrenheit": "1 fahrenheit",
        "12fahrenheit": "12 fahrenheit",

        "1 c": "1 degC",
        "12 c": "12 degC",
        "1c": "1 degC",
        "12c": "12 degC",
        "1 oC": "1 degC",
        "12 oC": "12 degC",
        "1oC": "1 degC",
        "12oC": "12 degC",
        "1 degC": "1 degC",
        "12 degC": "12 degC",
        "1degC": "1 degC",
        "12degC": "12 degC",
        "1 celsius": "1 celsius",
        "12 celsius": "12 celsius",
        "1celsius": "1 celsius",
        "12celsius": "12 celsius",

        // Make sure not to break hex
        "0x1c": "28",
        "0x1c5": "453"
    }
};
