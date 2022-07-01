import TestSuite from "../testSuite";

export const suite: TestSuite = {
    name: "Bases",
    tests: {
        "0b11": "3",
        "0o77": "63",
        "0xff": "255",

        "bin(0b11)": "\"0b11\"",
        "bin(0o77)": "\"0b111111\"",
        "bin(0xff)": "\"0b11111111\"",

        "hex(0b11)": "\"0x3\"",
        "hex(0o77)": "\"0x3f\"",
        "hex(0xff)": "\"0xff\"",

        "oct(0b11)": "\"0o3\"",
        "oct(0o77)": "\"0o77\"",
        "oct(0xff)": "\"0o377\"",

        "bin(hex(oct(0b11)))": "\"0b11\"",

        "hexToChar(\"33\")": "\"3\"",
        "hexToChar(\"0033\")": "\"3\"",
        "hexToChar(\"2705\")": "\"✅\"",
        "hexToChar(\"D83DDE0E\")": "\"😎\"",

        "charToHex(\"3\")": "\"0033\"",
        "charToHex(\"✅\")": "\"2705\"",
        "charToHex(\"😎\")": "\"D83DDE0E\"",
    }
};
