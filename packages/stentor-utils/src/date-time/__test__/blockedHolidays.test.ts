/*! Copyright (c) 2026, XAPPmedia */
import { expect } from "chai";
import { BlockedHoliday } from "stentor-models";

import {
    DEFAULT_HOLIDAY_PRESETS,
    expandBlockedDays,
    expandBlockedHolidays,
    nextOccurrence
} from "../blockedHolidays";

function preset(id: string, enabled = true): BlockedHoliday {
    const found = DEFAULT_HOLIDAY_PRESETS.find((holiday) => holiday.id === id);
    if (!found) {
        throw new Error(`No preset ${id}`);
    }
    return { ...found, enabled };
}

function datesFor(id: string, from: string, to: string): string[] {
    return expandBlockedHolidays([preset(id)], from, to);
}

describe(`#${expandBlockedHolidays.name}()`, () => {
    describe("fixed rules", () => {
        it("returns the date in each year of the range", () => {
            expect(datesFor("juneteenth", "2026-01-01", "2027-12-31")).to.deep.equal(["2026-06-19", "2027-06-18"]);
        });
        it("does not shift when observed is off", () => {
            const holiday: BlockedHoliday = { id: "x", name: "X", rule: { type: "fixed", month: 7, day: 4 } };
            expect(expandBlockedHolidays([holiday], "2026-01-01", "2026-12-31")).to.deep.equal(["2026-07-04"]);
        });
        it("shifts Saturday to Friday when observed", () => {
            expect(datesFor("independence-day", "2026-01-01", "2026-12-31")).to.deep.equal(["2026-07-03"]);
            expect(datesFor("christmas-day", "2027-01-01", "2027-12-31")).to.deep.equal(["2027-12-24"]);
        });
        it("shifts Sunday to Monday when observed", () => {
            expect(datesFor("independence-day", "2027-01-01", "2027-12-31")).to.deep.equal(["2027-07-05"]);
        });
        it("returns an observed date that crosses the year boundary", () => {
            // Jan 1 2028 is a Saturday, observed Fri Dec 31 2027
            expect(datesFor("new-years-day", "2027-12-01", "2027-12-31")).to.deep.equal(["2027-12-31"]);
            expect(datesFor("new-years-day", "2028-01-01", "2028-01-31")).to.deep.equal([]);
        });
        it("only returns Feb 29 in leap years", () => {
            const holiday: BlockedHoliday = { id: "leap", name: "Leap", rule: { type: "fixed", month: 2, day: 29 } };
            expect(expandBlockedHolidays([holiday], "2026-01-01", "2028-12-31")).to.deep.equal(["2028-02-29"]);
        });
    });

    describe("nthWeekday rules", () => {
        it("resolves the nth weekday", () => {
            expect(datesFor("thanksgiving", "2026-01-01", "2026-12-31")).to.deep.equal(["2026-11-26"]);
            expect(datesFor("mlk-day", "2027-01-01", "2027-12-31")).to.deep.equal(["2027-01-18"]);
            expect(datesFor("labor-day", "2026-01-01", "2026-12-31")).to.deep.equal(["2026-09-07"]);
        });
        it("resolves the last weekday with n = -1", () => {
            expect(datesFor("memorial-day", "2026-01-01", "2026-12-31")).to.deep.equal(["2026-05-25"]);
            expect(datesFor("memorial-day", "2027-01-01", "2027-12-31")).to.deep.equal(["2027-05-31"]);
        });
        it("returns nothing for a 5th weekday that does not exist", () => {
            // February 2026 has only four Mondays
            const holiday: BlockedHoliday = {
                id: "x",
                name: "X",
                rule: { type: "nthWeekday", month: 2, weekday: "monday", n: 5 }
            };
            expect(expandBlockedHolidays([holiday], "2026-01-01", "2026-12-31")).to.deep.equal([]);
        });
    });

    describe("easterOffset rules", () => {
        it("resolves Good Friday", () => {
            expect(datesFor("good-friday", "2026-01-01", "2027-12-31")).to.deep.equal(["2026-04-03", "2027-03-26"]);
        });
        it("resolves Easter itself with offset 0", () => {
            const holiday: BlockedHoliday = { id: "easter", name: "Easter", rule: { type: "easterOffset", offsetDays: 0 } };
            expect(expandBlockedHolidays([holiday], "2025-01-01", "2025-12-31")).to.deep.equal(["2025-04-20"]);
        });
    });

    describe("relative rules", () => {
        it("resolves the day after Thanksgiving", () => {
            const holidays = [preset("thanksgiving", false), preset("day-after-thanksgiving")];
            expect(expandBlockedHolidays(holidays, "2026-01-01", "2026-12-31")).to.deep.equal(["2026-11-27"]);
        });
        it("resolves against the target's observed date", () => {
            const holidays: BlockedHoliday[] = [
                { id: "xmas", name: "Xmas", enabled: false, rule: { type: "fixed", month: 12, day: 25, observed: true } },
                { id: "after", name: "After", rule: { type: "relative", holidayId: "xmas", offsetDays: 1 } }
            ];
            // Christmas 2027 is a Saturday, observed Fri Dec 24 -> day after is Dec 25
            expect(expandBlockedHolidays(holidays, "2027-01-01", "2027-12-31")).to.deep.equal(["2027-12-25"]);
        });
        it("falls back to the built-in preset when the target is not in the list", () => {
            expect(expandBlockedHolidays([preset("day-after-thanksgiving")], "2026-01-01", "2026-12-31"))
                .to.deep.equal(["2026-11-27"]);
        });
        it("skips a missing target", () => {
            const holiday: BlockedHoliday = { id: "x", name: "X", rule: { type: "relative", holidayId: "nope", offsetDays: 1 } };
            expect(expandBlockedHolidays([holiday], "2026-01-01", "2026-12-31")).to.deep.equal([]);
        });
        it("skips a cycle without throwing", () => {
            const holidays: BlockedHoliday[] = [
                { id: "a", name: "A", rule: { type: "relative", holidayId: "b", offsetDays: 1 } },
                { id: "b", name: "B", rule: { type: "relative", holidayId: "a", offsetDays: 1 } }
            ];
            expect(expandBlockedHolidays(holidays, "2026-01-01", "2026-12-31")).to.deep.equal([]);
        });
        it("includes an offset date that lands in the range from the previous year", () => {
            const holidays: BlockedHoliday[] = [
                { id: "nye-plus", name: "X", rule: { type: "relative", holidayId: "christmas-day", offsetDays: 10 } }
            ];
            // Christmas 2025 (Thu) + 10 = Jan 4 2026
            expect(expandBlockedHolidays(holidays, "2026-01-01", "2026-01-31")).to.deep.equal(["2026-01-04"]);
        });
    });

    it("excludes disabled holidays", () => {
        expect(expandBlockedHolidays([preset("thanksgiving", false)], "2026-01-01", "2026-12-31")).to.deep.equal([]);
    });
    it("treats a missing enabled flag as enabled", () => {
        const holiday: BlockedHoliday = { id: "x", name: "X", rule: { type: "fixed", month: 3, day: 3 } };
        expect(expandBlockedHolidays([holiday], "2026-01-01", "2026-12-31")).to.deep.equal(["2026-03-03"]);
    });
    it("returns sorted, deduped dates", () => {
        const holidays: BlockedHoliday[] = [
            preset("christmas-day"),
            { id: "dupe", name: "Dupe", rule: { type: "fixed", month: 12, day: 25 } },
            preset("new-years-day")
        ];
        expect(expandBlockedHolidays(holidays, "2026-01-01", "2026-12-31")).to.deep.equal(["2026-01-01", "2026-12-25"]);
    });
    it("returns nothing for an empty or reversed range", () => {
        expect(expandBlockedHolidays([], "2026-01-01", "2026-12-31")).to.deep.equal([]);
        expect(expandBlockedHolidays(undefined, "2026-01-01", "2026-12-31")).to.deep.equal([]);
        expect(datesFor("thanksgiving", "2026-12-31", "2026-01-01")).to.deep.equal([]);
    });
    it("ignores malformed rules", () => {
        const holidays = [
            { id: "bad", name: "Bad", rule: { type: "fixed", month: 13, day: 1 } },
            { id: "bad2", name: "Bad2", rule: { type: "nope" } }
        ] as unknown as BlockedHoliday[];
        expect(expandBlockedHolidays(holidays, "2026-01-01", "2026-12-31")).to.deep.equal([]);
    });
});

describe(`#${expandBlockedDays.name}()`, () => {
    it("returns single days in the range", () => {
        expect(expandBlockedDays([{ date: "2026-03-03" }, { date: "2027-03-03" }], "2026-01-01", "2026-12-31"))
            .to.deep.equal(["2026-03-03"]);
    });
    it("expands an inclusive range", () => {
        expect(expandBlockedDays([{ date: "2026-03-30", endDate: "2026-04-02", label: "Retreat" }], "2026-01-01", "2026-12-31"))
            .to.deep.equal(["2026-03-30", "2026-03-31", "2026-04-01", "2026-04-02"]);
    });
    it("clips a range at both ends", () => {
        expect(expandBlockedDays([{ date: "2026-03-01", endDate: "2026-03-10" }], "2026-03-04", "2026-03-06"))
            .to.deep.equal(["2026-03-04", "2026-03-05", "2026-03-06"]);
    });
    it("treats an endDate before the date as a single day", () => {
        expect(expandBlockedDays([{ date: "2026-03-05", endDate: "2026-03-01" }], "2026-01-01", "2026-12-31"))
            .to.deep.equal(["2026-03-05"]);
    });
    it("skips entries without a date, sorts and dedupes", () => {
        expect(expandBlockedDays([{ date: "2026-05-02" }, { time: "10:00:00" }, { date: "2026-05-01", endDate: "2026-05-02" }], "2026-01-01", "2026-12-31"))
            .to.deep.equal(["2026-05-01", "2026-05-02"]);
        expect(expandBlockedDays(undefined, "2026-01-01", "2026-12-31")).to.deep.equal([]);
    });
});

describe(`#${nextOccurrence.name}()`, () => {
    it("returns the next date on or after fromDate", () => {
        expect(nextOccurrence(preset("thanksgiving"), [], "2026-11-13")).to.equal("2026-11-26");
        expect(nextOccurrence(preset("thanksgiving"), [], "2026-11-26")).to.equal("2026-11-26");
        expect(nextOccurrence(preset("thanksgiving"), [], "2026-11-27")).to.equal("2027-11-25");
    });
    it("ignores the enabled flag", () => {
        expect(nextOccurrence(preset("christmas-eve", false), [], "2026-11-13")).to.equal("2026-12-24");
    });
    it("resolves relative holidays against the list", () => {
        const holidays: BlockedHoliday[] = [
            { id: "thanksgiving", name: "T", rule: { type: "nthWeekday", month: 11, weekday: "thursday", n: 3 } }
        ];
        const after: BlockedHoliday = { id: "a", name: "A", rule: { type: "relative", holidayId: "thanksgiving", offsetDays: 1 } };
        expect(nextOccurrence(after, holidays, "2026-11-01")).to.equal("2026-11-20");
    });
    it("returns undefined when it never occurs", () => {
        const holiday: BlockedHoliday = { id: "x", name: "X", rule: { type: "relative", holidayId: "nope", offsetDays: 1 } };
        expect(nextOccurrence(holiday, [], "2026-11-13")).to.equal(undefined);
    });
});

describe("DEFAULT_HOLIDAY_PRESETS", () => {
    it("has unique ids", () => {
        const ids = DEFAULT_HOLIDAY_PRESETS.map((holiday) => holiday.id);
        expect(new Set(ids).size).to.equal(ids.length);
    });
    it("covers the US federal holidays, enabled by default", () => {
        const federal = DEFAULT_HOLIDAY_PRESETS.filter((holiday) => holiday.category === "federal");
        expect(federal.map((holiday) => holiday.id)).to.have.members([
            "new-years-day", "mlk-day", "presidents-day", "memorial-day", "juneteenth", "independence-day",
            "labor-day", "columbus-day", "veterans-day", "thanksgiving", "christmas-day"
        ]);
        expect(federal.every((holiday) => holiday.enabled === true)).to.equal(true);
    });
    it("covers the common business holidays, disabled by default", () => {
        const business = DEFAULT_HOLIDAY_PRESETS.filter((holiday) => holiday.category === "business");
        expect(business.map((holiday) => holiday.id)).to.have.members([
            "new-years-eve", "good-friday", "day-after-thanksgiving", "christmas-eve", "day-after-christmas"
        ]);
        expect(business.every((holiday) => holiday.enabled === false)).to.equal(true);
    });
    it("expands to the 2026 federal calendar", () => {
        const federal = DEFAULT_HOLIDAY_PRESETS.filter((holiday) => holiday.category === "federal");
        expect(expandBlockedHolidays(federal, "2026-01-01", "2026-12-31")).to.deep.equal([
            "2026-01-01", "2026-01-19", "2026-02-16", "2026-05-25", "2026-06-19", "2026-07-03",
            "2026-09-07", "2026-10-12", "2026-11-11", "2026-11-26", "2026-12-25"
        ]);
    });
});
