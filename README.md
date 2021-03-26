
# Qalc

![](/resources/icon.png)

Qalc is an interactive calculator that turns any text document into a math processor. Quickly and easily run simple or complex calculations naturally. Lightweight, powerful, simple.

# Features

* At its core, Qalc is powered by [Math.js](https://mathjs.org/), so you have access to hundreds of built in mathemtical functions, constants, units and conversions
   * But, we've also built on top of Math.js to power things like percentages, currencies, date calculations, natural language, and aggregations
* Qalc evaluates your text as you type it, displaying the result at the end of the line
* Works in Plain Text, Markdown and Qalc files by default, but you can enable it in any type of file
* Syntax highlighting when using the Qalc language mode
* Completely configurable and customizable: colors, alignment, precision, formatting, and more

## Examples

## Units

## Functions

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

# Acknowledgments

Forked from [Mathpad](https://github.com/sagebind/mathpad), inspired by [Numi](https://numi.app/) and [Parsify](https://github.com/sagebind/mathpad). I built this because I wanted something cross platform, and integrated with my most common text editor.



# Notes
```
note: had to run `sudo apt-get install libnss3-dev` to get tests running on cmd
and `sudo apt-get install libatk1.0-0`
and `sudo apt-get install libatk-bridge2.0-0`
and `sudo apt-get install libx11-xcb1`
and ... never was working
```