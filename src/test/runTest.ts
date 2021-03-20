import math = require("mathjs");
import colors = require('colors');
import { create, defaultScope } from "../math";
import { format } from "../formatter";
import { transform } from "../transformer";
import TestSuite from "./testSuite";
import { suite as percentOff }  from "./suites/percentOff-testSuite";
import { suite as builtins }  from "./suites/builtins-testSuite";
import { suite as date }  from "./suites/date-testSuite";
import { suite as currency }  from "./suites/currency-testSuite";
import { suite as constants }  from "./suites/constants-testSuite";
import { suite as text }  from "./suites/text-testSuite";

function main() {
	try {

		console.log("Starting test runner...");

		// Register test suites
		let suites: TestSuite[] = [];
		suites.push(percentOff);
		suites.push(builtins);
		suites.push(date);
		suites.push(currency);
		suites.push(constants);
		suites.push(text);


		// Mock the context since currencies use globalState
		const context = {
			globalState: {
				get: function() {
					return null;
				},
				update: function() { }
			}
		};

		// @ts-ignore
		const math = create(context, () => runTests(math, suites));

	} catch (err) {
		console.error('FAILED to run tests!', err);
		process.exit(1);
	}
}

function runTests(math: math.MathJsStatic, suites: TestSuite[]) {

	let success = true;

	console.log();
	console.log("Running tests...");
	console.log();

	suites.forEach(suite => {
		console.log("--------------------------------------------------");
		console.log("Running suite: " + suite.name);
		console.log();

		let scope = defaultScope();

		Object.entries(suite.tests).forEach(([key, value]) =>{
			
			const result = format(math, math.compile(transform(key)).evaluate(scope));

			if(typeof value == "string" && (value as string).match(result)) {
				console.log("[SUCCESS] " + key + " = " + result);
			} else if(typeof value == "object" && (value as any).match && result.match(new RegExp((value as any).match))) {
				console.log("[SUCCESS] " + key + " = " + result);
			} else if(typeof value == "object" && (value as any).match){

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

main();
