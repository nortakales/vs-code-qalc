/** 
     * Text transformations before passing a line to MathJS
     */
export function transform(text: string) : string {

    // Replaces date(1-1-2021) with date("1-1-2021"), must avoid detecting date("1-1-2021") though
    if(/date\([^\"]+?\)/.test(text)) {
        text = text.replace(/(date\()([^\"]+?)(\))/g, "$1\"$2\"$3")
    }

    // Removes comment at the end of a line
    if(/\/\/.*/.test(text)) {
        text = text.replace(/\/\/.*/g, "")
    }

    // Removes commas in things like 1,000,000, but not inside one level of () or []
    if(/(?<!\([^)]*)(?<!\[[^\]]*),(\d{3})/.test(text)) {
        console.log("before: " + text);
        text = text.replace(/(?<!\([^)]*)(?<!\[[^\]]*),(\d{3})/g, "$1");
        console.log("after: " + text);
    }

    // $5USD, $5 AUD, $5.0 CAD, etc will have the $ stripped to work with MathJS
    if(/\$[\d\.]+\s*[A-Z]{3}/.test(text)) {
        text = text.replace(/\$([\d\.]+\s*[A-Z]{3})/g, "$1")
    }

    // $ alone will be treated as USD
    if(/\$([\d\.\,]+)(?=([^\d\.\,A-Z]|$))(?!\b\s*[A-Z]{3})/.test(text)) {
        text = text.replace(/\$([\d\.\,]+)(?=([^\d\.\,A-Z]|$))(?!\b\s*[A-Z]{3})/g, "$1 USD")
    }

    // Change %" off of "whatever units to " * -whatever units + whatever units"
    if(/(?<=%)(\s+off( of)?\s+)(\$?[\d\.]+\s*\w*)/.test(text)) {
        text = text.replace(/(?<=%)(\s+off( of)?\s+)(\$?[\d\.]+\s*\w*)/, " * -$3 + $3")
    }

    // Change x% into 100/x
    if(/([\d\.\,]+)\%/.test(text)) {
        text = text.replace(/([\d\.\,]+)\%/, "($1/100)")
    }

    // Change of to *
    if(/ of /.test(text)) {
        text = text.replace(/ of /, " * ");
    }

    // Need to protect against keywords being used as variable names

    return text;
}