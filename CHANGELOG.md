# Change Log

## 0.1.11

- [#23](https://github.com/nortakales/vs-code-qalc/issues/23) The temperature shortcuts settings (`qalc.shortcuts.temperature`) now also enables `f` and `c` to be used for fahrenheit and celsius (in addition to `oF` and `oC`)
- [#21](https://github.com/nortakales/vs-code-qalc/issues/21) Updated default precision (`qalc.output.precision`) to `2`. The previous default of `0` was not a great choice.
- [#22](https://github.com/nortakales/vs-code-qalc/issues/22) Support expressions like `x + y%` or `x - y%`. For example, `200 + 10% = 220`.
- [#20](https://github.com/nortakales/vs-code-qalc/issues/20) You can now disable Qalc using glob patterns using the setting `qalc.disabledPatterns` (this takes precedence over `qalc.enabledLanguages`)
- [#19](https://github.com/nortakales/vs-code-qalc/issues/19) Added `hexToChar` and `charToHex` functions. They work like this: `hexToChar("D83DDE0E") = "😎"`
- [#16](https://github.com/nortakales/vs-code-qalc/issues/16) Added a new command (`qalc.copy.resultOnly`) that will copy only the result of the current/selected line (or multiple lines if more than one is selected)

## 0.1.10

- Changed `activationEvents` to `onStartupFinished` instead of `*` as an immediate stopgap for long startup times

## 0.1.9

- [#12](https://github.com/nortakales/vs-code-qalc/issues/12) Fixed issue where negative numbers in output would ignore formatting options
- [#18](https://github.com/nortakales/vs-code-qalc/issues/18) Fixed bug where the builtin Math.js `sum()` function was not working due to conflict with Qalc's custom `sum` keyword
- [#15](https://github.com/nortakales/vs-code-qalc/issues/15) Added VSCode language support so line commenting via keyboard shortcut works as expected, bracket highlighting works, and brackets auto close

## 0.1.8

- Introduced new settings for output formatting
  - `qalc.output.notation` - fixed, exponential, engineering, auto. See documentation for more details.
  - `qalc.output.trimTrailingZeros` - trims any trailing zeros in output that might show up as a result of certain output formatting combinations.
- Fixed bug where `% off of <variable>` and `% off <variable>` were not working
- Fixed bug where error message would not show up sometimes when trying to reassign keywords like `total` or `sum`
- Currency conversion no longer uses a limited API key that would break once the number of requests exceeded the limit within a month

## 0.1.7

- Fixed bug when using `sum`, `total`, `avg`, and `average` with long numbers or numbers with commas would fail

## 0.1.6

- With convert local currency mode enabled, you can now convert like `1 EUR in $` (assuming $$ is set as your local currency symbol)

## 0.1.5

- Fixed `sum`, `total`, `avg`, and `average` so you can do more things on the same line such as `variable = sum` or `sum / 5`
- Fixed bug in loading currency exchange rates if you had an error response from the API cached

## 0.1.4

- Currency conversion stopped working some time recently since the API used to retrieve exchange rates stopped being free. In this release I temporarily changed to http requests, and added a free access key that will limit calls to the API to 1000 per month across all users of this extension. It is a short term solution until I can find a better alternative.
- Fixed a bug where something like `12000/5/60` would be perceived as a date instead of division.

## 0.1.3

- Added two commands for copying lines to the clipboard including the output from Qalc. One includes the delimiter, the other does not. See README for more details.

## 0.1.2

- Users are now fully prevented from reassigning built in constants, keywords and functions. This is in order to prevent scenarios where a user might try something harmless like `m = 3.14` and later try to specify 2 meters like `2m` and be utterly confused why that is evaluating to `6.28` instead of just `2m`.
- Finally created this changelog

## 0.1.1

- Added icon for VSCode extension marketplace

## 0.1.0

- First release of Qalc
- Enabled in Plain Text, Markdown and new Qalc language modes
- Qalc language mode provides syntax highlighting
- Added initial set of settings:
    - Output Color
    - Output Delimiter
    - Show Output Delimiter
    - Output Alignment
    - Output Max Alignment Column
    - Display Commas
    - Precision
    - Upper/Lower Exponent Bounds
    - Convert Local Currency Code/Symbol
    - Local Currency Code/Symbol
    - Temperature Shortcuts
    - Enabled Language Modes
- Added a test suite
- Added an extensive readme with examples and links to full Math.js documentation
- Added aggregation keywords `sum`, `total`, `avg` and `average`
- Added `// comments`
- Added `pixel`, `point` and `em` units
- Added `mph` and `kph` unit aliases
- Added `time`, `yesterday` and `tomorrow` keywords
- Added natural date parsing
- Added handling for `%` (not mod, percent)
- Added handling for `% of` and `% off of`
- Allow some inputs to contain commas (doesn't work inside of function calls or matrices)
- Added support for `ago`

## 0.0.2

- Forked from Mathpad v0.0.2
