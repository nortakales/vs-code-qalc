import math = require("mathjs");
import colors = require('colors');
import { create, defaultScope } from "../math";
import { format } from "../formatter";
import { transform } from "../transformer";
import TestSuite from "./testSuite";
import { suite as percentOff } from "./suites/percentOff-testSuite";
import { suite as builtins } from "./suites/builtins-testSuite";
import { suite as date } from "./suites/date-testSuite";
import { suite as currency } from "./suites/currency-testSuite";
import { suite as constants } from "./suites/constants-testSuite";
import { suite as text } from "./suites/text-testSuite";
import { suite as bases } from "./suites/bases-testSuite";
import { suite as units } from "./suites/units-testSuite";
import { suite_auto_0 as format_auto_0 } from "./suites/formatOptions-testSuite";
import { suite_auto_4 as format_auto_4 } from "./suites/formatOptions-testSuite";
import { suite_fixed_0 as format_fixed_0 } from "./suites/formatOptions-testSuite";
import { suite_fixed_4_zeros as format_fixed_4_zeros } from "./suites/formatOptions-testSuite";
import { suite_fixed_4_nozeros_nocommas as format_fixed_4_nozeros_nocommas } from "./suites/formatOptions-testSuite";
import { suite_space_and_comma as format_space_and_comma } from "./suites/formatOptions-testSuite";
import { suite_dot_and_comma as format_dot_and_comma } from "./suites/formatOptions-testSuite";
import { suite_dot_and_dot as format_dot_and_dot } from "./suites/formatOptions-testSuite";
import { suite as temperature } from "./suites/temperature-testSuite";
import { suite as specialComments } from "./suites/specialComments-testSuite";
import { setTestsRunning } from "../global";

const baseTransformerSettings: TransformerSettings = {
	convertLocalCurrency: true,
	localCurrencySymbol: "$",
	localCurrencyCode: "USD",
	temperatureShortcut: true
};

const baseFormatterSettings: FormatterSettings = {
	lowerExponentBound: -9,
	upperExponentBound: 16,
	precision: 5,
	notation: 'auto',
	digitGroupingSymbol: ',',
	decimalSeparator: '.',
	trimTrailingZeros: true,
	convertLocalCurrency: true,
	localCurrencyCode: "USD",
	localCurrencySymbol: "$"
};



export function runTests() {
	try {

		console.log("Starting test runner...");
		setTestsRunning();

		// Register test suites
		let suites: TestSuite[] = [];
		suites.push(percentOff);
		suites.push(builtins);
		suites.push(date);
		suites.push(currency);
		suites.push(constants);
		suites.push(text);
		suites.push(bases);
		suites.push(units);
		suites.push(format_auto_0);
		suites.push(format_auto_4);
		suites.push(format_fixed_0);
		suites.push(format_fixed_4_zeros);
		suites.push(format_fixed_4_nozeros_nocommas);
		suites.push(format_space_and_comma);
		suites.push(format_dot_and_comma);
		suites.push(format_dot_and_dot);
		suites.push(temperature);
		//suites.push(specialComments);


		// Mock the context since currencies use globalState
		const context = {
			globalState: {
				get: function () {
					return null;
				},
				update: function () { }
			}
		};

		// @ts-ignore
		const math = create(context, () => runTestSuites(math, suites));

	} catch (err) {
		console.error('FAILED to run tests!', err);
		process.exit(1);
	}
}

function runTestSuites(math: math.MathJsStatic, suites: TestSuite[]) {

	let success = true;

	console.log();
	console.log("Running tests...");
	console.log();

	suites.forEach(suite => {
		console.log("--------------------------------------------------");
		console.log("Running suite: " + suite.name);
		console.log();

		let scope = defaultScope();

		Object.entries(suite.tests).forEach(([key, value]) => {

			const formatterSettingsToUse = suite.formatterSettings ?? baseFormatterSettings;

			// TODO check for errors and add errors test suite
			// TODO same for special comments keywords
			// TODO need to break out logic from document.ts into common function to use here as well
			const result = format(math, math.compile(transform(key, baseTransformerSettings)).evaluate(scope), formatterSettingsToUse);

			if (typeof value === "string" && (value as string) === result) {
				console.log("[SUCCESS] " + key + " = " + result);
			} else if (typeof value === "object" && (value as any).match && result.match(new RegExp((value as any).match))) {
				console.log("[SUCCESS] " + key + " = " + result);
			} else if (typeof value === "object" && (value as any).match) {

				success = false;
				const msg = "[FAILED] " + key + " = " + result + " (expected = " + (value as any).match + ")";
				console.log(colors.red(msg));

			} else {
				success = false;
				const msg = "[FAILED] " + key + " = " + result + " (expected = " + value + ")";
				console.log(colors.red(msg));
			}
		});
	});

	console.log("--------------------------------------------------");
	console.log();
	console.log();
	console.log("Tests " + (success ? "succeeded!" : colors.red("FAILED!")));
	console.log();
	console.log();
}
