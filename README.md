
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

# Syntax

## Basic Operators

![](/resources/examples/basic-operators.png)

See [Math.js operators](https://mathjs.org/docs/expressions/syntax.html#operators) for all available operators and [Math.js precedence](https://mathjs.org/docs/expressions/syntax.html#precedence) for order of operations.

## Functions

![](/resources/examples/basic-functions.png)
This is just a subset of available functions, see [Math.js function documentation](https://mathjs.org/docs/reference/functions.html) for all available functions

## Aggregations

![](/resources/examples/aggregations.png)

These are built on top of Math.js and are specific to Qalc. Are you looking for more types of aggregations? Let us know. 

## Dates

![](/resources/examples/dates.png)

Support for dates is built on top of Math.js and is specific to Qalc.

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

## Other Keywords

![](/resources/examples/other-keywords.png)

The `last` keyword brings up the result of the previous line.

## Pixels/Points/em

![](/resources/examples/pixels-points-em.png)

These units are not native to Math.js, and for good reason: they are not well defined. Depending on the context, pixels to inches can vary drastically, most commonly in the 72-300 pixels per inch range. Emphemeral units (em) by definition are relative to their parent html element. We've chosen default ratios for converting these units currently, and soon we'll offer the ability to customize them.

## Binary, Hex and Octal

![](/resources/examples/binary-hex-octal.png)

# Settings

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
* [x] upgrade mathjs version to latest, but have unit tests first - gets binary support
* [x] base (binary, hex) conversion
* [x] "time"
* [ ] time in <city>
* [ ] "next friday"
* [x] support for "ago"
* [x] Seems to be a bug if a document has 1 USD in it, when it loads, it caches a wrong result before currencies load?
* [ ] convert hex to rgb
* [x] use oC and oF as "degrees c" and "degress f"
* [x] px/points units
* [x] formatter needs to take settings object for performance and tests
* [ ] more efficient use of scopes for the reassignUnitError
* [ ] output should be an error when reassigning a unit
* [ ] ability to change px per inch and px per em
* [ ] finish an actual readme
* [ ] don't count headers for longest line
* [ ] Local currency conversion in output
* [ ] enable "in $"
* [ ] enable mph and kph

# Acknowledgments

Forked from [Mathpad](https://github.com/sagebind/mathpad), inspired by [Numi](https://numi.app/) and [Parsify](https://github.com/sagebind/mathpad). I built this because I wanted something cross platform, and integrated with my most common text editor.
