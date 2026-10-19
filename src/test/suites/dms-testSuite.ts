/* eslint-disable @typescript-eslint/naming-convention */
import TestSuite from "../testSuite";

export const suite: TestSuite = {
    name: "Degrees Minutes Seconds",
    tests: {
        "dms(40, 11, 15)": "40.188 deg",
        "dms(40, 30)": "40.5 deg",
        "dms(40)": "40 deg",
        "dms(-40, 30)": "-40.5 deg",
        "dms(0, -30)": "-0.5 deg",
        "dms(0, 1, 30) in arcsec": "90 arcsec",
        "sin(dms(40, 11, 15))": "0.64529",
        "toDms(dms(40, 11, 15))": "40° 11' 15\"",
        "toDms(asin(sin(dms(40, 11, 15))))": "40° 11' 15\"",
        "toDms(40.1875 deg)": "40° 11' 15\"",
        "toDms(-12.5 deg)": "-12° 30' 0\"",
        "toDms(1.5 arcsec)": "0° 0' 1.5\"",
        "toDms(pi)": "180° 0' 0\"",
        "toDms(pi rad / 4)": "45° 0' 0\""
    }
};
