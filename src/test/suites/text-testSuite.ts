/* eslint-disable @typescript-eslint/naming-convention */
import TestSuite from "../testSuite";

export const suite: TestSuite = {
    name: "Text",
    tests: {
        "text = concat(\"hello\", \" world\")": "\"hello world\"",
        "size(text)": "[11]",
        "text[4:9]": "\"lo wor\"",
        "text[1] = \"H\"": "\"H\"",
        "text[7:12] = \"There!\"": "\"There!\"",
        "text": "\"Hello There!\"",
    }
};
