# Development

* VSCode should automatically run `npm run watch` while developing
* Run tests manually: `npm run test`

# Publishing

* Make sure to update the version in `package.json`, and optionally tag the commit like `git tag "<version>"`
* Tests will run before publishing to VSCode marketplace via `vscode:prepublish` in package.json
* If personal access token as expired, run `vsce login <username>`
* To publish run `vsce publish`
* Update `vsce` with `npm install -g vsce`

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
* [x] Copy to clipboard command (just text? text but insert =? html? html table?)
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
* [x] enable "in $"
* [x] enable mph and kph
* [x] syntax highlighting for mistakenly assigning ANY keyword (new. math.js native constants units and functions)
* [x] decoration explanation to accompany syntax highlighting for reassigning builtins
* [ ] Enable "yesterday 11pm"
* [ ] Decide on better file extension
* [ ] Fix math API
