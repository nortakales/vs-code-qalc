# Change Log

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
