import TestSuite from "../testSuite";

const dateRegex = "\\d{1,2}/\\d{1,2}/\\d{4}"
const timeRegex = "\\d{1,2}:\\d{2}:\\d{2} [AP]M"
const datetimeRegex = dateRegex + ", " + timeRegex;

export const suite: TestSuite = {
    name: "Date",
    tests: {
        "date(\"1/2/2021\")": "1/2/2021",
        "date(1/2/2021)": "1/2/2021",
        "epoch(1615789316)": "3/14/2021, 11:21:56 PM",
        "date(1615789316)": "3/14/2021, 11:21:56 PM",
        "epoch(1615789316000)": "3/14/2021, 11:21:56 PM",
        "date(1615789316000)": "3/14/2021, 11:21:56 PM",
        "date(\"1/2/2021 10:10 PM\")": "1/2/2021, 10:10:00 PM",
        "date(1/2/2021 10:10 PM)": "1/2/2021, 10:10:00 PM",
        "2021-1-30": "1/30/2021",
        "12-30-2021": "12/30/2021",
        "1/30/2021": "1/30/2021",
        "2021/12/30": "12/30/2021",
        "1/30/2021 1:10": "1/30/2021, 1:10:00 AM",
        "1/30/2021 1:10:45": "1/30/2021, 1:10:45 AM",
        "1/30/2021 10:10 AM": "1/30/2021, 10:10:00 AM",
        "1/30/2021 19:10": "1/30/2021, 7:10:00 PM",
        "1/30/2021 19:10 PST": "1/30/2021, 7:10:00 PM",
        "1/30/2021 10:10 PM UTC": "1/30/2021, 2:10:00 PM",
        "6/11/2010 - 6/11/2008 in days": "730 days",
        "1 year in months": "12 months",
        "1 month in weeks": "4.3482 weeks",
        "1 week in days": "7 days",
        "1 day in hours": "24 hours",
        "60 miles / hour * 5 hours in mi": "300 mi",
        "now": {
            "match": datetimeRegex
        },
        "now - 1 hour": {
            "match": datetimeRegex
        },
        "today": {
            "match": dateRegex
        },
        "tomorrow": {
            "match": dateRegex
        },
        "yesterday": {
            "match": dateRegex
        },
        "1 year ago": {
            "match": datetimeRegex
        },
        "2 months ago": {
            "match": datetimeRegex
        },
        "1 week ago": {
            "match": datetimeRegex
        },
        "5 days ago": {
            "match": datetimeRegex
        },
        "1 hour ago": {
            "match": datetimeRegex
        },
        "30 minutes ago": {
            "match": datetimeRegex
        },
        "1 second ago": {
            "match": datetimeRegex
        },
        "time": {
            "match": datetimeRegex
        }
    }
}
