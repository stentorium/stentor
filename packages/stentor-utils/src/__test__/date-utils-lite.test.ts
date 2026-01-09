/*! Copyright (c) 2026, XAPPmedia */
/**
 * Tests to verify our lightweight date utilities match date-fns behavior.
 */

import { expect } from "chai";
import * as dateFns from "date-fns";
import * as dateLite from "../date-utils-lite";

describe("date-utils-lite vs date-fns", () => {
    describe("format()", () => {
        const testCases = [
            { date: new Date("2020-07-04T16:00:00Z"), pattern: "yyyy-MM-dd", name: "ISO date" },
            { date: new Date("2020-01-05T00:00:00Z"), pattern: "yyyy-MM-dd", name: "leading zeros" },
            { date: new Date("2020-12-25T00:00:00Z"), pattern: "M-d-yyyy", name: "M-d-yyyy format" },
            { date: new Date("2020-01-05T00:00:00Z"), pattern: "M-d-yyyy", name: "M-d-yyyy no leading" },
            { date: new Date("2020-07-04T08:30:00Z"), pattern: "h:mm aa", name: "AM time" },
            { date: new Date("2020-07-04T16:45:00Z"), pattern: "h:mm aa", name: "PM time" },
            { date: new Date("2020-07-04T00:00:00Z"), pattern: "h:mm aa", name: "midnight" },
            { date: new Date("2020-07-04T12:00:00Z"), pattern: "h:mm aa", name: "noon" },
        ];

        testCases.forEach(({ date, pattern, name }) => {
            it(`matches date-fns for ${name}: ${pattern}`, () => {
                const expected = dateFns.format(date, pattern);
                const actual = dateLite.format(date, pattern);
                expect(actual).to.equal(expected, `Pattern: ${pattern}, Date: ${date.toISOString()}`);
            });
        });

        it("handles timestamps", () => {
            const timestamp = Date.parse("2020-07-04T16:00:00Z");
            const expected = dateFns.format(timestamp, "yyyy-MM-dd");
            const actual = dateLite.format(timestamp, "yyyy-MM-dd");
            expect(actual).to.equal(expected);
        });
    });

    describe("parse()", () => {
        const testCases = [
            { str: "2020-7-4", pattern: "y-M-d", name: "single digits" },
            { str: "2020-12-25", pattern: "y-M-d", name: "double digits" },
            { str: "2020-1-25", pattern: "y-M-d", name: "mixed digits" },
        ];

        testCases.forEach(({ str, pattern, name }) => {
            it(`matches date-fns for ${name}`, () => {
                const refDate = new Date("2020-01-01T00:00:00Z");
                const expected = dateFns.parse(str, pattern, refDate);
                const actual = dateLite.parse(str, pattern, refDate);

                expect(actual.getFullYear()).to.equal(expected.getFullYear());
                expect(actual.getMonth()).to.equal(expected.getMonth());
                expect(actual.getDate()).to.equal(expected.getDate());
            });
        });
    });

    describe("isSameDay()", () => {
        it("matches date-fns for same day", () => {
            const date1 = new Date("2020-07-04T08:00:00Z");
            const date2 = new Date("2020-07-04T16:00:00Z");
            expect(dateLite.isSameDay(date1, date2)).to.equal(dateFns.isSameDay(date1, date2));
        });

        it("matches date-fns for different days", () => {
            const date1 = new Date("2020-07-04T23:59:59Z");
            const date2 = new Date("2020-07-05T00:00:00Z");
            expect(dateLite.isSameDay(date1, date2)).to.equal(dateFns.isSameDay(date1, date2));
        });
    });

    describe("formatISO()", () => {
        it("matches date-fns", () => {
            const date = new Date("2020-07-04T16:30:00Z");
            const expected = dateFns.formatISO(date);
            const actual = dateLite.formatISO(date);
            expect(actual).to.equal(expected);
        });
    });

    describe("addDays()", () => {
        it("matches date-fns for positive days", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const expected = dateFns.addDays(date, 5);
            const actual = dateLite.addDays(date, 5);
            expect(dateFns.format(actual, "yyyy-MM-dd")).to.equal(dateFns.format(expected, "yyyy-MM-dd"));
        });

        it("matches date-fns for negative days", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const expected = dateFns.addDays(date, -3);
            const actual = dateLite.addDays(date, -3);
            expect(dateFns.format(actual, "yyyy-MM-dd")).to.equal(dateFns.format(expected, "yyyy-MM-dd"));
        });
    });

    describe("addWeeks()", () => {
        it("matches date-fns", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const expected = dateFns.addWeeks(date, 2);
            const actual = dateLite.addWeeks(date, 2);
            expect(dateFns.format(actual, "yyyy-MM-dd")).to.equal(dateFns.format(expected, "yyyy-MM-dd"));
        });
    });

    describe("addMonths()", () => {
        it("matches date-fns for regular months", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const expected = dateFns.addMonths(date, 3);
            const actual = dateLite.addMonths(date, 3);
            expect(dateFns.format(actual, "yyyy-MM-dd")).to.equal(dateFns.format(expected, "yyyy-MM-dd"));
        });

        it("matches date-fns for end-of-month edge case", () => {
            const date = new Date("2020-01-31T12:00:00Z");
            const expected = dateFns.addMonths(date, 1);
            const actual = dateLite.addMonths(date, 1);
            expect(dateFns.format(actual, "yyyy-MM-dd")).to.equal(dateFns.format(expected, "yyyy-MM-dd"));
        });
    });

    describe("addYears()", () => {
        it("matches date-fns", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const expected = dateFns.addYears(date, 2);
            const actual = dateLite.addYears(date, 2);
            expect(dateFns.format(actual, "yyyy-MM-dd")).to.equal(dateFns.format(expected, "yyyy-MM-dd"));
        });
    });

    describe("startOfWeek()", () => {
        it("matches date-fns", () => {
            const date = new Date("2020-07-08T12:00:00Z"); // Wednesday
            const expected = dateFns.startOfWeek(date);
            const actual = dateLite.startOfWeek(date);
            expect(dateFns.format(actual, "yyyy-MM-dd")).to.equal(dateFns.format(expected, "yyyy-MM-dd"));
            expect(actual.getDay()).to.equal(expected.getDay());
        });
    });

    describe("endOfWeek()", () => {
        it("matches date-fns", () => {
            const date = new Date("2020-07-08T12:00:00Z"); // Wednesday
            const expected = dateFns.endOfWeek(date);
            const actual = dateLite.endOfWeek(date);
            expect(dateFns.format(actual, "yyyy-MM-dd")).to.equal(dateFns.format(expected, "yyyy-MM-dd"));
            expect(actual.getDay()).to.equal(expected.getDay());
        });
    });

    describe("startOfMonth()", () => {
        it("matches date-fns", () => {
            const date = new Date("2020-07-15T12:00:00Z");
            const expected = dateFns.startOfMonth(date);
            const actual = dateLite.startOfMonth(date);
            expect(dateFns.format(actual, "yyyy-MM-dd")).to.equal(dateFns.format(expected, "yyyy-MM-dd"));
        });
    });

    describe("endOfMonth()", () => {
        const testDates = [
            new Date("2020-07-15T12:00:00Z"), // 31 days
            new Date("2020-06-15T12:00:00Z"), // 30 days
            new Date("2020-02-15T12:00:00Z"), // leap year
            new Date("2019-02-15T12:00:00Z"), // non-leap year
        ];

        testDates.forEach((date) => {
            it(`matches date-fns for ${dateFns.format(date, "yyyy-MM")}`, () => {
                const expected = dateFns.endOfMonth(date);
                const actual = dateLite.endOfMonth(date);
                expect(dateFns.format(actual, "yyyy-MM-dd")).to.equal(dateFns.format(expected, "yyyy-MM-dd"));
            });
        });
    });

    describe("startOfYear()", () => {
        it("matches date-fns", () => {
            const date = new Date("2020-07-15T12:00:00Z");
            const expected = dateFns.startOfYear(date);
            const actual = dateLite.startOfYear(date);
            expect(dateFns.format(actual, "yyyy-MM-dd")).to.equal(dateFns.format(expected, "yyyy-MM-dd"));
        });
    });

    describe("endOfYear()", () => {
        it("matches date-fns", () => {
            const date = new Date("2020-07-15T12:00:00Z");
            const expected = dateFns.endOfYear(date);
            const actual = dateLite.endOfYear(date);
            expect(dateFns.format(actual, "yyyy-MM-dd")).to.equal(dateFns.format(expected, "yyyy-MM-dd"));
        });
    });

    describe("eachWeekendOfInterval()", () => {
        it("matches date-fns for interval with weekends", () => {
            const interval = {
                start: new Date("2020-07-01T00:00:00Z"),
                end: new Date("2020-07-07T23:59:59Z")
            };
            const expected = dateFns.eachWeekendOfInterval(interval);
            const actual = dateLite.eachWeekendOfInterval(interval);

            expect(actual.length).to.equal(expected.length);
            actual.forEach((date, i) => {
                expect(dateFns.format(date, "yyyy-MM-dd")).to.equal(dateFns.format(expected[i], "yyyy-MM-dd"));
            });
        });

        it("matches date-fns for interval without weekends", () => {
            const interval = {
                start: new Date("2020-07-06T00:00:00Z"),
                end: new Date("2020-07-08T23:59:59Z")
            };
            const expected = dateFns.eachWeekendOfInterval(interval);
            const actual = dateLite.eachWeekendOfInterval(interval);

            expect(actual.length).to.equal(expected.length);
        });
    });
});
