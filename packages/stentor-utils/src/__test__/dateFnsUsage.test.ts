/*! Copyright (c) 2026, XAPPmedia */
/**
 * Comprehensive tests for date-fns usage patterns in the codebase.
 * These tests document all the ways date-fns is currently used,
 * which will help us replace or optimize the dependency.
 */

import { expect } from "chai";
import {
    format,
    parse,
    isSameDay,
    formatISO,
    addDays,
    addMonths,
    addWeeks,
    addYears,
    eachWeekendOfInterval,
    endOfMonth,
    endOfWeek,
    endOfYear,
    startOfMonth,
    startOfWeek,
    startOfYear
} from "date-fns";

describe("date-fns Usage Patterns", () => {
    describe("format() function", () => {
        describe('pattern: "yyyy-MM-dd"', () => {
            it("formats a Date object", () => {
                const date = new Date("2020-07-04T16:00:00Z");
                expect(format(date, "yyyy-MM-dd")).to.equal("2020-07-04");
            });

            it("formats the current date", () => {
                const now = new Date();
                const formatted = format(now, "yyyy-MM-dd");
                expect(formatted).to.match(/^\d{4}-\d{2}-\d{2}$/);
            });

            it("handles dates with single-digit months and days", () => {
                const date = new Date("2020-01-05T00:00:00Z");
                expect(format(date, "yyyy-MM-dd")).to.equal("2020-01-05");
            });

            it("handles leap years", () => {
                const date = new Date("2020-02-29T00:00:00Z");
                expect(format(date, "yyyy-MM-dd")).to.equal("2020-02-29");
            });
        });

        describe('pattern: "M-d-yyyy"', () => {
            it("formats without leading zeros", () => {
                const date = new Date("2020-01-05T00:00:00Z");
                expect(format(date, "M-d-yyyy")).to.equal("1-5-2020");
            });

            it("formats with double-digit month and day", () => {
                const date = new Date("2020-12-25T00:00:00Z");
                expect(format(date, "M-d-yyyy")).to.equal("12-25-2020");
            });
        });

        describe('pattern: "h:mm aa"', () => {
            it("formats time with AM/PM", () => {
                const date = new Date("2020-07-04T08:30:00Z");
                expect(format(date, "h:mm aa")).to.equal("8:30 AM");
            });

            it("formats afternoon time", () => {
                const date = new Date("2020-07-04T16:45:00Z");
                expect(format(date, "h:mm aa")).to.equal("4:45 PM");
            });

            it("formats midnight", () => {
                const date = new Date("2020-07-04T00:00:00Z");
                expect(format(date, "h:mm aa")).to.equal("12:00 AM");
            });

            it("formats noon", () => {
                const date = new Date("2020-07-04T12:00:00Z");
                expect(format(date, "h:mm aa")).to.equal("12:00 PM");
            });
        });
    });

    describe("parse() function", () => {
        describe('pattern: "y-M-d"', () => {
            it("parses dates with single-digit month and day", () => {
                const refDate = new Date("2020-01-01T00:00:00Z");
                const parsed = parse("2020-7-4", "y-M-d", refDate);
                expect(format(parsed, "yyyy-MM-dd")).to.equal("2020-07-04");
            });

            it("parses dates with double-digit month and day", () => {
                const refDate = new Date("2020-01-01T00:00:00Z");
                const parsed = parse("2020-12-25", "y-M-d", refDate);
                expect(format(parsed, "yyyy-MM-dd")).to.equal("2020-12-25");
            });

            it("parses dates with mixed digit formats", () => {
                const refDate = new Date("2020-01-01T00:00:00Z");
                const parsed = parse("2020-1-25", "y-M-d", refDate);
                expect(format(parsed, "yyyy-MM-dd")).to.equal("2020-01-25");
            });

            it("uses reference date for parsing context", () => {
                const refDate = new Date("2019-06-15T12:00:00Z");
                const parsed = parse("2020-7-4", "y-M-d", refDate);
                // The reference date doesn't affect y-M-d parsing, but is required
                expect(format(parsed, "yyyy-MM-dd")).to.equal("2020-07-04");
            });
        });
    });

    describe("isSameDay() function", () => {
        it("returns true for dates on the same day", () => {
            const date1 = new Date("2020-07-04T08:00:00Z");
            const date2 = new Date("2020-07-04T16:00:00Z");
            expect(isSameDay(date1, date2)).to.be.true;
        });

        it("returns false for dates on different days", () => {
            const date1 = new Date("2020-07-04T23:59:59Z");
            const date2 = new Date("2020-07-05T00:00:00Z");
            expect(isSameDay(date1, date2)).to.be.false;
        });

        it("returns false for same day different months", () => {
            const date1 = new Date("2020-07-04T12:00:00Z");
            const date2 = new Date("2020-08-04T12:00:00Z");
            expect(isSameDay(date1, date2)).to.be.false;
        });

        it("works with parsed dates", () => {
            const refDate = new Date();
            const date1 = parse("2020-7-4", "y-M-d", refDate);
            const date2 = parse("2020-7-4", "y-M-d", refDate);
            expect(isSameDay(date1, date2)).to.be.true;
        });
    });

    describe("formatISO() function", () => {
        it("formats date to ISO-8601 string", () => {
            const date = new Date("2020-07-04T16:30:00Z");
            const iso = formatISO(date);
            expect(iso).to.match(/^2020-07-04T/);
        });

        it("includes timezone information", () => {
            const date = new Date("2020-07-04T16:30:00Z");
            const iso = formatISO(date);
            expect(iso).to.include("Z");
        });
    });

    describe("addDays() function", () => {
        it("adds positive days", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const result = addDays(date, 5);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-07-09");
        });

        it("adds negative days (subtracts)", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const result = addDays(date, -3);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-07-01");
        });

        it("handles month boundaries", () => {
            const date = new Date("2020-07-29T12:00:00Z");
            const result = addDays(date, 5);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-08-03");
        });

        it("handles year boundaries", () => {
            const date = new Date("2020-12-30T12:00:00Z");
            const result = addDays(date, 5);
            expect(format(result, "yyyy-MM-dd")).to.equal("2021-01-04");
        });
    });

    describe("addWeeks() function", () => {
        it("adds positive weeks", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const result = addWeeks(date, 2);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-07-18");
        });

        it("adds negative weeks (subtracts)", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const result = addWeeks(date, -1);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-06-27");
        });
    });

    describe("addMonths() function", () => {
        it("adds positive months", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const result = addMonths(date, 3);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-10-04");
        });

        it("adds negative months (subtracts)", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const result = addMonths(date, -2);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-05-04");
        });

        it("handles year boundaries", () => {
            const date = new Date("2020-11-15T12:00:00Z");
            const result = addMonths(date, 3);
            expect(format(result, "yyyy-MM-dd")).to.equal("2021-02-15");
        });

        it("handles end-of-month edge cases", () => {
            const date = new Date("2020-01-31T12:00:00Z");
            const result = addMonths(date, 1);
            // Feb doesn't have 31 days, so it adjusts
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-02-29");
        });
    });

    describe("addYears() function", () => {
        it("adds positive years", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const result = addYears(date, 2);
            expect(format(result, "yyyy-MM-dd")).to.equal("2022-07-04");
        });

        it("adds negative years (subtracts)", () => {
            const date = new Date("2020-07-04T12:00:00Z");
            const result = addYears(date, -1);
            expect(format(result, "yyyy-MM-dd")).to.equal("2019-07-04");
        });
    });

    describe("startOfWeek() function", () => {
        it("returns Sunday for a week", () => {
            const date = new Date("2020-07-08T12:00:00Z"); // Wednesday
            const result = startOfWeek(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-07-05");
            expect(result.getDay()).to.equal(0); // Sunday
        });

        it("returns same date if already Sunday", () => {
            const date = new Date("2020-07-05T12:00:00Z"); // Sunday
            const result = startOfWeek(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-07-05");
        });
    });

    describe("endOfWeek() function", () => {
        it("returns Saturday for a week", () => {
            const date = new Date("2020-07-08T12:00:00Z"); // Wednesday
            const result = endOfWeek(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-07-11");
            expect(result.getDay()).to.equal(6); // Saturday
        });

        it("returns same date if already Saturday", () => {
            const date = new Date("2020-07-11T12:00:00Z"); // Saturday
            const result = endOfWeek(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-07-11");
        });
    });

    describe("startOfMonth() function", () => {
        it("returns first day of month", () => {
            const date = new Date("2020-07-15T12:00:00Z");
            const result = startOfMonth(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-07-01");
        });

        it("returns same date if already first of month", () => {
            const date = new Date("2020-07-01T12:00:00Z");
            const result = startOfMonth(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-07-01");
        });
    });

    describe("endOfMonth() function", () => {
        it("returns last day of month (31 days)", () => {
            const date = new Date("2020-07-15T12:00:00Z");
            const result = endOfMonth(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-07-31");
        });

        it("returns last day of month (30 days)", () => {
            const date = new Date("2020-06-15T12:00:00Z");
            const result = endOfMonth(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-06-30");
        });

        it("returns last day of February (leap year)", () => {
            const date = new Date("2020-02-15T12:00:00Z");
            const result = endOfMonth(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-02-29");
        });

        it("returns last day of February (non-leap year)", () => {
            const date = new Date("2019-02-15T12:00:00Z");
            const result = endOfMonth(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2019-02-28");
        });
    });

    describe("startOfYear() function", () => {
        it("returns first day of year", () => {
            const date = new Date("2020-07-15T12:00:00Z");
            const result = startOfYear(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-01-01");
        });

        it("returns same date if already first of year", () => {
            const date = new Date("2020-01-01T12:00:00Z");
            const result = startOfYear(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-01-01");
        });
    });

    describe("endOfYear() function", () => {
        it("returns last day of year", () => {
            const date = new Date("2020-07-15T12:00:00Z");
            const result = endOfYear(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-12-31");
        });

        it("returns same date if already last of year", () => {
            const date = new Date("2020-12-31T12:00:00Z");
            const result = endOfYear(date);
            expect(format(result, "yyyy-MM-dd")).to.equal("2020-12-31");
        });
    });

    describe("eachWeekendOfInterval() function", () => {
        it("returns weekend days in an interval", () => {
            const start = new Date("2020-07-01T00:00:00Z"); // Wednesday
            const end = new Date("2020-07-07T23:59:59Z"); // Tuesday
            const weekends = eachWeekendOfInterval({ start, end });

            expect(weekends).to.have.length(2);
            expect(format(weekends[0], "yyyy-MM-dd")).to.equal("2020-07-04"); // Saturday
            expect(format(weekends[1], "yyyy-MM-dd")).to.equal("2020-07-05"); // Sunday
        });

        it("returns multiple weekend days for longer interval", () => {
            const start = new Date("2020-07-01T00:00:00Z");
            const end = new Date("2020-07-15T23:59:59Z");
            const weekends = eachWeekendOfInterval({ start, end });

            expect(weekends).to.have.length(4);
            // Two weekends worth of days
        });

        it("returns empty array if no weekends in interval", () => {
            const start = new Date("2020-07-06T00:00:00Z"); // Monday
            const end = new Date("2020-07-08T23:59:59Z"); // Wednesday
            const weekends = eachWeekendOfInterval({ start, end });

            expect(weekends).to.have.length(0);
        });
    });

    describe("Combined usage patterns from codebase", () => {
        it("parse then format pattern (dateTime.ts:68)", () => {
            const dateString = "2020-7-4";
            const parsed = parse(dateString, "y-M-d", new Date());
            const formatted = format(parsed, "yyyy-MM-dd");
            expect(formatted).to.equal("2020-07-04");
        });

        it("format current date pattern (response.ts:63)", () => {
            const formatted = format(new Date(), "yyyy-MM-dd");
            expect(formatted).to.match(/^\d{4}-\d{2}-\d{2}$/);
        });

        it("parse and compare dates (response.ts:119)", () => {
            const refDate = new Date();
            const date1 = parse("2020-7-4", "y-M-d", refDate);
            const date2 = parse("2020-7-4", "y-M-d", refDate);
            expect(isSameDay(date1, date2)).to.be.true;
        });

        it("format Date.parse result (response.ts:69)", () => {
            const dateTime = { date: "2020-07-04", time: "16:00:00" };
            const dateString = `${dateTime.date}T${dateTime.time}`;
            const date = Date.parse(dateString);
            const formatted = format(date, "yyyy-MM-dd");
            expect(formatted).to.equal("2020-07-04");
        });
    });
});
