/* eslint-disable @typescript-eslint/naming-convention */
import TestSuite from "../testSuite";

export const suite_day_month_year: TestSuite = {
    name: "Date Format: day/month/year",
    dateFormat: "day/month/year",
    tests: {
        "30/1/2021": "30/01/2021",
        "30-12-2021": "30/12/2021",
        "date(30/1/2021)": "30/01/2021",
        "date(\"30/1/2021\")": "30/01/2021",
        "2021-01-30": "30/01/2021",
        "2021/12/30": "30/12/2021",
        "30/1/2021 19:10": "30/01/2021, 19:10:00",
        "30/1/2021 7:10 PM": "30/01/2021, 19:10:00",
        "date(\"30/01/2021, 19:10:00\")": "30/01/2021, 19:10:00",
        "31/12/2021 - 1/12/2021 in days": "30 days",
        "1/30/2021": "Invalid Date",
        "12000/60/5": "40"
    }
};

export const suite_year_month_day: TestSuite = {
    name: "Date Format: year-month-day",
    dateFormat: "year-month-day",
    tests: {
        "2021-01-30": "2021-01-30",
        "2021/1/30": "2021-01-30",
        "2021-1-30 19:10": "2021-01-30 19:10:00",
        "date(\"2021-01-30 19:10:00\")": "2021-01-30 19:10:00",
        // Dates that don't start with a year are read as month/day/year
        "1/30/2021": "2021-01-30"
    }
};
