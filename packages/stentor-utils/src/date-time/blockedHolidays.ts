/*! Copyright (c) 2026, XAPPmedia */
import { BlockedDay, BlockedHoliday, BlockedHolidayRule, DayOfWeek } from "stentor-models";

/**
 * Suggested holidays for the scheduler's blocked-holiday checklist.
 *
 * `enabled` is the suggested checked state only - a preset blocks nothing until it is saved
 * into an app's `blockedHolidays`.
 */
export const DEFAULT_HOLIDAY_PRESETS: readonly BlockedHoliday[] = [
    // US federal
    { id: "new-years-day", name: "New Year's Day", category: "federal", enabled: true, rule: { type: "fixed", month: 1, day: 1, observed: true } },
    { id: "mlk-day", name: "Martin Luther King Jr. Day", category: "federal", enabled: true, rule: { type: "nthWeekday", month: 1, weekday: "monday", n: 3 } },
    { id: "presidents-day", name: "Presidents' Day", category: "federal", enabled: true, rule: { type: "nthWeekday", month: 2, weekday: "monday", n: 3 } },
    { id: "memorial-day", name: "Memorial Day", category: "federal", enabled: true, rule: { type: "nthWeekday", month: 5, weekday: "monday", n: -1 } },
    { id: "juneteenth", name: "Juneteenth", category: "federal", enabled: true, rule: { type: "fixed", month: 6, day: 19, observed: true } },
    { id: "independence-day", name: "Independence Day", category: "federal", enabled: true, rule: { type: "fixed", month: 7, day: 4, observed: true } },
    { id: "labor-day", name: "Labor Day", category: "federal", enabled: true, rule: { type: "nthWeekday", month: 9, weekday: "monday", n: 1 } },
    { id: "columbus-day", name: "Columbus / Indigenous Peoples' Day", category: "federal", enabled: true, rule: { type: "nthWeekday", month: 10, weekday: "monday", n: 2 } },
    { id: "veterans-day", name: "Veterans Day", category: "federal", enabled: true, rule: { type: "fixed", month: 11, day: 11, observed: true } },
    { id: "thanksgiving", name: "Thanksgiving", category: "federal", enabled: true, rule: { type: "nthWeekday", month: 11, weekday: "thursday", n: 4 } },
    { id: "christmas-day", name: "Christmas Day", category: "federal", enabled: true, rule: { type: "fixed", month: 12, day: 25, observed: true } },
    // Common business
    { id: "new-years-eve", name: "New Year's Eve", category: "business", enabled: false, rule: { type: "fixed", month: 12, day: 31 } },
    { id: "good-friday", name: "Good Friday", category: "business", enabled: false, rule: { type: "easterOffset", offsetDays: -2 } },
    { id: "day-after-thanksgiving", name: "Day after Thanksgiving", category: "business", enabled: false, rule: { type: "relative", holidayId: "thanksgiving", offsetDays: 1 } },
    { id: "christmas-eve", name: "Christmas Eve", category: "business", enabled: false, rule: { type: "fixed", month: 12, day: 24 } },
    { id: "day-after-christmas", name: "Day after Christmas", category: "business", enabled: false, rule: { type: "fixed", month: 12, day: 26 } }
];

const DAY_MS = 24 * 60 * 60 * 1000;

const WEEKDAYS: readonly DayOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

/**
 * How far a rule can push a date out of its own year (observed shifting, relative offsets).
 * Each year in the range is evaluated with this many neighbouring years on either side.
 */
const YEAR_PADDING = 1;

/** "YYYY-MM-DD" -> UTC day number, or undefined if malformed. */
function toDay(date: string | undefined): number | undefined {
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return undefined;
    }
    const [year, month, day] = date.split("-").map(Number);
    const ms = Date.UTC(year, month - 1, day);
    const check = new Date(ms);
    if (check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) {
        return undefined;
    }
    return Math.round(ms / DAY_MS);
}

function fromDay(day: number): string {
    return new Date(day * DAY_MS).toISOString().slice(0, 10);
}

function utcDay(year: number, month: number, day: number): number | undefined {
    const ms = Date.UTC(year, month - 1, day);
    const date = new Date(ms);
    // Rejects overflow, e.g. Feb 29 in a non-leap year.
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
        return undefined;
    }
    return Math.round(ms / DAY_MS);
}

function isInteger(value: unknown): value is number {
    return typeof value === "number" && Number.isInteger(value);
}

function isMonth(value: unknown): value is number {
    return isInteger(value) && value >= 1 && value <= 12;
}

/** Western (Gregorian) Easter Sunday, anonymous Gregorian algorithm. */
function easterDay(year: number): number {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return utcDay(year, month, day) as number;
}

type HolidayLookup = (id: string) => BlockedHoliday | undefined;

/**
 * The day the rule resolves to for the given year, or undefined if it has none that year.
 * `visiting` guards against relative-rule cycles.
 */
function resolveRule(rule: BlockedHolidayRule | undefined, year: number, lookup: HolidayLookup, visiting: Set<string>): number | undefined {
    if (!rule || typeof rule !== "object") {
        return undefined;
    }
    switch (rule.type) {
        case "fixed": {
            if (!isMonth(rule.month) || !isInteger(rule.day)) {
                return undefined;
            }
            const day = utcDay(year, rule.month, rule.day);
            if (day === undefined || !rule.observed) {
                return day;
            }
            const weekday = new Date(day * DAY_MS).getUTCDay();
            if (weekday === 6) {
                return day - 1;
            }
            if (weekday === 0) {
                return day + 1;
            }
            return day;
        }
        case "nthWeekday": {
            const weekday = WEEKDAYS.indexOf(rule.weekday);
            if (!isMonth(rule.month) || weekday < 0 || !isInteger(rule.n) || rule.n === 0 || rule.n < -1 || rule.n > 5) {
                return undefined;
            }
            if (rule.n === -1) {
                // Day 0 of the next month is the last day of this one (Date.UTC months are 0-based).
                const lastOfMonth = Math.round(Date.UTC(year, rule.month, 0) / DAY_MS);
                const back = (new Date(lastOfMonth * DAY_MS).getUTCDay() - weekday + 7) % 7;
                return lastOfMonth - back;
            }
            const first = utcDay(year, rule.month, 1) as number;
            const forward = (weekday - new Date(first * DAY_MS).getUTCDay() + 7) % 7;
            const day = first + forward + (rule.n - 1) * 7;
            return new Date(day * DAY_MS).getUTCMonth() === rule.month - 1 ? day : undefined;
        }
        case "easterOffset": {
            if (!isInteger(rule.offsetDays)) {
                return undefined;
            }
            return easterDay(year) + rule.offsetDays;
        }
        case "relative": {
            if (!isInteger(rule.offsetDays) || visiting.has(rule.holidayId)) {
                return undefined;
            }
            const target = lookup(rule.holidayId);
            if (!target) {
                return undefined;
            }
            visiting.add(rule.holidayId);
            const base = resolveRule(target.rule, year, lookup, visiting);
            visiting.delete(rule.holidayId);
            return base === undefined ? undefined : base + rule.offsetDays;
        }
        default:
            return undefined;
    }
}

/**
 * Relative rules resolve against the given list first (so a customer's edited Thanksgiving
 * moves their "day after" with it), then the built-in presets.  A target resolves whether or
 * not it is enabled.
 */
function lookupFor(holidays: readonly BlockedHoliday[]): HolidayLookup {
    return (id: string) => holidays.find((holiday) => holiday && holiday.id === id) || DEFAULT_HOLIDAY_PRESETS.find((holiday) => holiday.id === id);
}

function occurrences(holiday: BlockedHoliday, lookup: HolidayLookup, from: number, to: number): number[] {
    const fromYear = new Date(from * DAY_MS).getUTCFullYear() - YEAR_PADDING;
    const toYear = new Date(to * DAY_MS).getUTCFullYear() + YEAR_PADDING;
    const days: number[] = [];
    for (let year = fromYear; year <= toYear; year++) {
        const visiting = new Set<string>(holiday.id ? [holiday.id] : []);
        const day = resolveRule(holiday.rule, year, lookup, visiting);
        if (day !== undefined && day >= from && day <= to) {
            days.push(day);
        }
    }
    return days;
}

function sortedDates(days: Iterable<number>): string[] {
    return Array.from(new Set(days)).sort((a, b) => a - b).map(fromDay);
}

/**
 * Every date (YYYY-MM-DD) an enabled holiday falls on within the inclusive range, sorted and
 * deduped.  Pure date math - the caller decides which local dates the range covers.
 */
export function expandBlockedHolidays(holidays: readonly BlockedHoliday[] | undefined, fromDate: string, toDate: string): string[] {
    const from = toDay(fromDate);
    const to = toDay(toDate);
    if (!holidays || from === undefined || to === undefined || from > to) {
        return [];
    }
    const lookup = lookupFor(holidays);
    const days: number[] = [];
    for (const holiday of holidays) {
        if (!holiday || holiday.enabled === false) {
            continue;
        }
        days.push(...occurrences(holiday, lookup, from, to));
    }
    return sortedDates(days);
}

/**
 * Every date (YYYY-MM-DD) covered by the blocked days within the inclusive range, sorted and
 * deduped.  A day with an `endDate` blocks the inclusive range; an `endDate` before `date` is
 * ignored.
 */
export function expandBlockedDays(blockedDays: readonly BlockedDay[] | undefined, fromDate: string, toDate: string): string[] {
    const from = toDay(fromDate);
    const to = toDay(toDate);
    if (!blockedDays || from === undefined || to === undefined || from > to) {
        return [];
    }
    const days: number[] = [];
    for (const blockedDay of blockedDays) {
        const start = toDay(blockedDay?.date);
        if (start === undefined) {
            continue;
        }
        const end = toDay(blockedDay.endDate);
        const last = end !== undefined && end >= start ? end : start;
        for (let day = Math.max(start, from); day <= Math.min(last, to); day++) {
            days.push(day);
        }
    }
    return sortedDates(days);
}

/**
 * The next date (YYYY-MM-DD) on or after `fromDate` the holiday falls on, regardless of whether
 * it is enabled.  `holidays` is the list relative rules resolve against.
 */
export function nextOccurrence(holiday: BlockedHoliday, holidays: readonly BlockedHoliday[], fromDate: string): string | undefined {
    const from = toDay(fromDate);
    if (!holiday || from === undefined) {
        return undefined;
    }
    // Two years always contains the next yearly occurrence.
    const [next] = occurrences(holiday, lookupFor(holidays || []), from, from + 2 * 366);
    return next === undefined ? undefined : fromDay(next);
}
