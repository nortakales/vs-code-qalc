# Change Log

## 0.4.1 - 2024-09-06

- Fixes [#39](https://github.com/nortakales/vs-code-qalc/issues/39) - hex literals containing "c" and "f" were sometimes not evaluating if `qalc.shortcuts.temperature` was turned on

## 0.4 - 2024-03-24

- Addresses [#35](https://github.com/nortakales/vs-code-qalc/issues/35)
  - Adds a new option (`qalc.explicitActivationLanguages`) to have Qalc processing off by default for a language, but to be able to turn it on at will using `//qalc:on`
- Default cache TTL for exchange rates is now 4 weeks instead of 2.
  - The Qalc extension is getting enough usage now that the exchange rate API monthly quota is being exceeded within 2 weeks.
  - Reminder: you can get your own API key and have a daily cache instead

## 0.3 - 2024-02-12

- Addresses [#11](https://github.com/nortakales/vs-code-qalc/issues/11)
  - Removes the `qalc.output.displayCommas` setting
  - Adds the `qalc.output.digitGroupingSymbol` setting. Setting this to either `,` or simply nothing at all will achieve the behavior that `qalc.output.displayCommas` had, but now you can change it to other symbols as well.
  - Adds the `qalc.output.decimalSeparator` setting so you can change the decimal separator
  - For example, now if your result is `1234.56`, you can have it formatted like `1.234,56`, `1 234.56` or whatever your heart desires.

## 0.2 - 2024-01-12

- Show user notification when currency exchange rates have been exhausted for the current month, and prompt user to get their own API key
- Default cache for exchange rates is now 2 weeks instead of 1 week 

## 0.1.17 - 2023-12-28

- Updates some dependencies

## 0.1.16 - 2023-12-28

- Allow `qalc.currency.apiKey` setting to be empty

## 0.1.15 - 2023-12-18

- Fixes [#34](https://github.com/nortakales/vs-code-qalc/issues/34), a bug so bad it stopped the extension from starting up!
- From here on out, bug fixes will happen on 0.0.x versions, smaller features on 0.x.0 versions, and major milestone on x.0.0 versions

## 0.1.14 - 2023-12-13

- Resolves [#32](https://github.com/nortakales/vs-code-qalc/issues/32)
  - Switched to a new API for exchange rates
  - A default API key is used that is allowed 1000 calls per month, and default TTL for cached exchange rates is 7 days
  - A personal API key can be specified via the `qalc.currency.apiKey` setting, and if so the cache TTL will be 1 day
  - Go to https://openexchangerates.org/ to get your own free API key (no payment info required at all)

## 0.1.13 - 2023-12-12

- [#32](https://github.com/nortakales/vs-code-qalc/issues/32) The exchange rate API being used has finally blocked free access, which broke any line that used a currency symbol. For now, I have quickly hacked $ and USD to still work, but actual conversions to/from any other currency are broken. I will search for a new free API, and give an option for users to provide their own API key as well in the next update.

## 0.1.12 - 2023-05-25

- Bumped math.js version to 9.5.2 
  - Thanks to [luis-c465](https://github.com/luis-c465)
- [#13](https://github.com/nortakales/vs-code-qalc/issues/13) Added new setting (`qalc.globalDeclarations`) which allows you to define anything to be used across all files that Qalc processes. This would typically be useful for defining specific functions or constants that you use often.
  - Thanks to [luis-c465](https://github.com/luis-c465)
- Added a couple special comments that can turn off (`//qalc:off`) or on (`//qalc:on`) Qalc processing within a file. This is useful if you just have portions of a file where you want Qalc to work.


## 0.1.11 - 2022-07-01

- [#23](https://github.com/nortakales/vs-code-qalc/issues/23) The temperature shortcuts settings (`qalc.shortcuts.temperature`) now also enables `f` and `c` to be used for fahrenheit and celsius (in addition to `oF` and `oC`)
- [#21](https://github.com/nortakales/vs-code-qalc/issues/21) Updated default precision (`qalc.output.precision`) to `2`. The previous default of `0` was not a great choice.
- [#22](https://github.com/nortakales/vs-code-qalc/issues/22) Support expressions like `x + y%` or `x - y%`. For example, `200 + 10% = 220`.
- [#20](https://github.com/nortakales/vs-code-qalc/issues/20) You can now disable Qalc using glob patterns using the setting `qalc.disabledPatterns` (this takes precedence over `qalc.enabledLanguages`)
- [#19](https://github.com/nortakales/vs-code-qalc/issues/19) Added `hexToChar` and `charToHex` functions. They work like this: `hexToChar("D83DDE0E") = "😎"`
- [#16](https://github.com/nortakales/vs-code-qalc/issues/16) Added a new command (`qalc.copy.resultOnly`) that will copy only the result of the current/selected line (or multiple lines if more than one is selected)

## 0.1.10 - 2022-05-12

- Changed `activationEvents` to `onStartupFinished` instead of `*` as an immediate stopgap for long startup times

## 0.1.9 - 2022-02-23

- [#12](https://github.com/nortakales/vs-code-qalc/issues/12) Fixed issue where negative numbers in output would ignore formatting options
- [#18](https://github.com/nortakales/vs-code-qalc/issues/18) Fixed bug where the builtin Math.js `sum()` function was not working due to conflict with Qalc's custom `sum` keyword
- [#15](https://github.com/nortakales/vs-code-qalc/issues/15) Added VSCode language support so line commenting via keyboard shortcut works as expected, bracket highlighting works, and brackets auto close

## 0.1.8 - 2021-12-23

- Introduced new settings for output formatting
  - `qalc.output.notation` - fixed, exponential, engineering, auto. See documentation for more details.
  - `qalc.output.trimTrailingZeros` - trims any trailing zeros in output that might show up as a result of certain output formatting combinations.
- Fixed bug where `% off of <variable>` and `% off <variable>` were not working
- Fixed bug where error message would not show up sometimes when trying to reassign keywords like `total` or `sum`
- Currency conversion no longer uses a limited API key that would break once the number of requests exceeded the limit within a month

## 0.1.7 - 2021-04-13

- Fixed bug when using `sum`, `total`, `avg`, and `average` with long numbers or numbers with commas would fail

## 0.1.6 - 2021-04-02

- With convert local currency mode enabled, you can now convert like `1 EUR in $` (assuming $$ is set as your local currency symbol)

## 0.1.5 - 2021-04-02

- Fixed `sum`, `total`, `avg`, and `average` so you can do more things on the same line such as `variable = sum` or `sum / 5`
- Fixed bug in loading currency exchange rates if you had an error response from the API cached

## 0.1.4 - 2021-04-02

- Currency conversion stopped working some time recently since the API used to retrieve exchange rates stopped being free. In this release I temporarily changed to http requests, and added a free access key that will limit calls to the API to 1000 per month across all users of this extension. It is a short term solution until I can find a better alternative.
- Fixed a bug where something like `12000/5/60` would be perceived as a date instead of division.

## 0.1.3 - 2021-03-30

- Added two commands for copying lines to the clipboard including the output from Qalc. One includes the delimiter, the other does not. See README for more details.

## 0.1.2 - 2021-03-29

- Users are now fully prevented from reassigning built in constants, keywords and functions. This is in order to prevent scenarios where a user might try something harmless like `m = 3.14` and later try to specify 2 meters like `2m` and be utterly confused why that is evaluating to `6.28` instead of just `2m`.
- Finally created this changelog

## 0.1.1 - 2021-03-28

- Added icon for VSCode extension marketplace

## 0.1.0 - 2021-03-28

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
