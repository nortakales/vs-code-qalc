/* eslint-disable @typescript-eslint/naming-convention */
import TestSuite from "../testSuite";

export const suite: TestSuite = {
    name: "Custom Units",
    customUnits: {
        smoot: "67 inch",
        ounceforce: {
            definition: "0.0625 poundforce",
            aliases: ["ozf"]
        },
        // Overrides a built-in Qalc unit
        em: "10 px"
    },
    tests: {
        "1 smoot in cm": "170.18 cm",
        "2 smoot": "2 smoot",
        "16 ozf to lbf": "1 lbf",
        "1 ounceforce in ozf": "1 ozf",
        "1 em in px": "10 px"
    }
};
