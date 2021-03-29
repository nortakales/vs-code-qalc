
# Qalc

![](/resources/icon-256.png)

Qalc is an interactive calculator that turns any text document into a math processor. Quickly and easily run simple or complex calculations naturally. Lightweight, powerful, simple.

![](/resources/qalc-example.gif)

# Features

* At its core, Qalc is powered by [Math.js](https://mathjs.org/), so you have access to hundreds of built in mathemtical functions, constants, units and conversions
   * But, we've also built on top of Math.js to power things like percentages, currencies, date calculations, natural language, and aggregations
* Qalc evaluates your text as you type it, displaying the result at the end of the line
* Works in Plain Text, Markdown and Qalc files by default, but you can enable it in any type of file
* Syntax highlighting when using the Qalc language mode
* Completely configurable and customizable: colors, alignment, precision, formatting, and more

# Change Log

See [change log](CHANGELOG.md).

# Syntax

## Basic Operators

![](/resources/examples/basic-operators.png)

See [Math.js operators](https://mathjs.org/docs/expressions/syntax.html#operators) for all available operators and [Math.js precedence](https://mathjs.org/docs/expressions/syntax.html#precedence) for order of operations.

## Basic Functions

![](/resources/examples/basic-functions.png)

This is just a subset of available functions, see [Math.js function documentation](https://mathjs.org/docs/reference/functions.html) for all available functions. Note: the output of `random()` will update every time the document changes or is reloaded by the UI.

## Aggregations

![](/resources/examples/aggregations.png)

These are built on top of Math.js and are specific to Qalc. Are you looking for more types of aggregations? Let us know. 

## Dates

![](/resources/examples/dates.png)

Support for dates is built on top of Math.js and is specific to Qalc. Note that any of the relative date keywords, most importantly `time` and `now`, will update every time the document is re-evaluated (any time it changes or the window loads it again). If today is 3/1/2021, `today` will return `3/1/2021` but tomorrow if you load the document again it will return `3/2/2021`.

## Variables and Objects

![](/resources/examples/variables-and-objects.png)

See [Math.js variables](https://mathjs.org/docs/expressions/syntax.html#constants-and-variables) for more about variables or [Math.js objects](https://mathjs.org/docs/expressions/syntax.html#objects) for more about objects.

## Text

![](/resources/examples/text.png)

See [Math.js strings](https://mathjs.org/docs/expressions/syntax.html#strings) for more about working with text.

## Constants

![](/resources/examples/constants.png)

This is just a subset. See [Math.js physical constants](https://mathjs.org/docs/datatypes/units.html#physical-constants) and [Math.js constants](https://mathjs.org/docs/reference/constants.html) for all available constants.

## Units and Conversions

![](/resources/examples/units-and-conversions.png)

See [Math.js units reference](https://mathjs.org/docs/datatypes/units.html#reference) for a list of all units available via Math.js. Qalc also adds a few of its own units:

| Name | Aliases | Definition | Note |
| --- | --- | --- | --- |
| Pixels | pixel, pixels, px | 1 inch = 96 px | Eventually this will be configurable
| Points | point, points, pt | 1 px = 0.75 pt
| Emphemeral Unit | em | 1 em = 16px | Eventually this will be configurable
| Currency | | | See [currency](#currency) section
| Miles per hour | mph | 1 miles/hour = 1 mph | 
| Kilometers per hour | kph | 1 kilometers/hour = 1 kph |

## Currency

![](/resources/examples/currency.png)

Currency data is retrieved from https://exchangeratesapi.io/ and cached for 7 days (eventually this will be configurable). Supported currencies are: `AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HRK, HUF, IDR, ILS, INR, ISK, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PLN, RON, RUB, SEK, SGD, THB, TRY, USD, ZAR`

## Percents

![](/resources/examples/percents.png)

Percents like this are not built into Math.js. We translate `%`, `of`, and `off of` appropriately before passing evaluation to Math.js.

## Functions

![](/resources/examples/functions.png)

You can define your own functions. See [Math.js functions](https://mathjs.org/docs/expressions/syntax.html#functions) for more information.

## Matrices and Ranges

![](/resources/examples/matrices-and-ranges.png)

Matrix indexes are one-based, similar to most math applications (differing from most programming languages). For more about matrices, see [Math.js matrices](https://mathjs.org/docs/expressions/syntax.html#matrices).

## Conditionals

![](/resources/examples/conditionals.png)

All conditional operators are listed in the [Math.js operators](https://mathjs.org/docs/expressions/syntax.html#operators) documentation.

## Other Keywords

![](/resources/examples/other-keywords.png)

The `last` keyword brings up the result of the previous line.

## Pixels/Points/em

![](/resources/examples/pixels-points-em.png)

These units are not native to Math.js, and for good reason: they are not well defined. Depending on the context, pixels to inches can vary drastically, most commonly in the 72-300 pixels per inch range. Emphemeral units (em) by definition are relative to their parent html element. We've chosen default ratios for converting these units currently, and soon we'll offer the ability to customize them.

## Binary, Hex and Octal

![](/resources/examples/binary-hex-octal.png)

The [Math.js numbers](https://mathjs.org/docs/expressions/syntax.html#numbers) documentation has a little documentation on binary, hex and octal. 

# Settings

Qalc offers a variety of settings that allow you to customize its behavior. These settings are explained below.

![](/resources/examples/settings-examples.png)

| Setting | Key | Default | Description |
| ----------------- | --- | --- | --- |
| Output Color | `qalc.output.color` | | Set a custom color for output to display in. This can be either a hex value (e.g. \"#FFFFFF\"), rgb value (e.g. \"rgb(255,255,255)\"), or a VSCode ThemeColor id (e.g. \"editor.foreground\", see https://code.visualstudio.com/docs/getstarted/theme-color-reference for available ids). If no color is specified, this falls back to \"terminal.ansiGreen\" to get the green  matching your current UI theme. |
| Show Output Delimiter | `qalc.output.showDelimiter` | `true` | Controls whether or not to display the delimiter to separate input from output. Default delimiter is \"=\" and can be overriden with the \"qalc.output.delimiter\" setting. |
| Output Delimiter | `qalc.output.delimiter` | `=` | Delimiter to display between input and output. Can be turned on/off with the \"qalc.output.showDelimiter\" setting. |
| Align Output | `qalc.output.align` | `true` | Aligns the left edge of output (on) or displays output immediately at the end of an input line (off) |
| Max Alignment Column | `qalc.output.maxAlignmentColumn` | `40` | When \"qalc.output.align\" is on, this controls the maximum column that results will align on. This is useful if you have, for example, a Markdown document with a few long lines, but don't want your Qalc results displayed too far out for the majority of your shorter lines. |
| Display Commas | `qalc.output.displayCommas` | `true` | Turn this on to display commas in results ($1,000,000), or off to hide commas ($1000000) |
| Precision | `qalc.output.precision` | `5` | Set the precision after the decimal of the output. No precision is lost in calculations, only the final display. |
| Lower Exponent Bound | `qalc.output.lowerExponentBound` | `-9` | Exponent determining the lower boundary for formatting output with an exponent (e.g. setting this to -2 will format 0.01 as 1e-2. |
| Upper Exponent Bound | `qalc.output.upperExponentBound` | `16` | Exponent determining the upper boundary for formatting output with an exponent (e.g. setting this to 2 will format 100 as 1e+2). |
| Convert Local Currency | `qalc.currency.convertLocal` | `true` | Turn this on to use your local currency symbol in both your input and output. Works with \"qalc.currency.localSymbol\" and \"qalc.currency.localCode\". For example, setting \"$\" and \"USD\" allows your input to contain \"$100\" which will be evaluated as the equivalent of \"100 USD\", and similarly will display in the output as \"$100\" instead of \"100 USD\". |
| Local Currency Symbol | `qalc.currency.localSymbol` | `$` | Set your local currency symbol. See \"qalc.currency.convertLocal\" for how this is used\" |
| Local Currency Code | `qalc.currency.localCode` | `USD` | Set your local currency code. See \"qalc.currency.convertLocal\" for how this is used\" |
| Temperature Shortcut | `qalc.shortcuts.temperature` | `true` | When on, enables you to use oF and oC as substitutes for degF, degC, fahrenheit, and celsius |
| Enabled Languages | `qalc.enabledLanguages` | `["qalc", "plaintext", "markdown"]` | Language identifiers for which to enable Qalc processing on. Keep in mind that Qalc will not examine partial matches, but only full lines. If your full line is not parseable, no output is displayed. For example, if you have a line in a JSON file like \"  'key': '1 + 1'  \", the \"1 + 1\" will not be evaluated because the full line is not parseable. Defaults to [\"qalc\", \"plaintext\", \"markdown\"]. |

# Acknowledgments

Forked from [Mathpad](https://github.com/sagebind/mathpad), inspired by [Numi](https://numi.app/) and [Parsify](https://github.com/sagebind/mathpad). I built this because I wanted something cross platform, and integrated with my most common text editor.

# Feature Todo List

* [x] Syntax highlighting (calc file type?)
* [x] $
* [x] %
* [x] auto detect some date formats
* [ ] Settings
  * [x] foreground color
  * [ ] currency ttl
  * [x] languages to enable in
  * [x] https://mathjs.org/docs/reference/functions/format.html
  * [x] include commas or not in output
  * [x] transform USD into $ or not in output
  * [x] aligned, not aligned
  * [x] max alignment column
* [x] tps as a unit
* [x] sum above lines until last empty line
* [ ] implement/extend round()/floor()/ceil() to work with dates
* [ ] more stuff from numi: https://github.com/nikolaeu/numi/wiki/Documentation
* [x] this could actually benefit from tests...
* [ ] Copy to clipboard command (just text? text but insert =? html? html table?)
* [ ] Sort by output (should work within header sections? within empty lines?)
* [x] upgrade mathjs version to latest, but have unit tests first - gets binary support
* [x] base (binary, hex) conversion
* [x] "time"
* [ ] time in <city>
* [ ] "next friday"
* [x] support for "ago"
* [x] Seems to be a bug if a document has 1 USD in it, when it loads, it caches a wrong result before currencies load?
* [ ] convert hex to rgb and vice versa?
* [x] use oC and oF as "degrees c" and "degress f"
* [x] px/points units
* [x] formatter needs to take settings object for performance and tests
* [ ] more efficient use of scopes for the reassignUnitError
* [x] output should be an error when reassigning a unit
* [ ] ability to change px per inch and px per em
* [x] finish an actual readme
* [x] don't count headers for longest line
* [x] Local currency conversion in output
* [ ] enable "in $"
* [x] enable mph and kph
* [x] syntax highlighting for mistakenly assigning ANY keyword (new. math.js native constants units and functions)
* [x] decoration explanation to accompany syntax highlighting for reassigning builtins
