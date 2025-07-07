/* eslint-disable @typescript-eslint/naming-convention */
import TestSuite from "../testSuite";

export const suite: TestSuite = {
    name: "Constants",
    tests: {
        "pi": "3.1416",
        "e": "2.7183",
        "phi": "1.618",
        "tau": "6.2832",
        "speedOfLight": "299,790,000 m / s",
        //"gravitationConstant": "6.6743e-11 m^3 / (kg s^2)",
        "1e309": "Infinity",
        "-1e309": "-Infinity",
        "Infinity": "Infinity",
        "-Infinity": "-Infinity",
        "3 == e": "false",
        "e == 3": "false",
    }
};
