/*! Copyright (c) 2026, XAPPmedia */
/**
 * Lightweight date utility functions to replace date-fns.
 *
 * This module provides minimal implementations of the date-fns functions
 * we actually use in the codebase, significantly reducing bundle size.
 *
 * @remarks
 * These implementations focus on the specific use cases in our codebase
 * and may not handle all edge cases that date-fns handles.
 */

/**
 * Format a date using a simple pattern.
 *
 * Supported patterns:
 * - yyyy: 4-digit year
 * - M: month (1-12)
 * - MM: month with leading zero (01-12)
 * - d: day (1-31)
 * - dd: day with leading zero (01-31)
 * - h: hour 12-hour format (1-12)
 * - hh: hour 12-hour format with leading zero (01-12)
 * - mm: minute with leading zero (00-59)
 * - aa: AM/PM
 *
 * @param date - The date to format
 * @param pattern - The format pattern
 * @returns Formatted date string
 */
export function format(date: Date | number, pattern: string): string {
    const d = typeof date === 'number' ? new Date(date) : new Date(date);

    if (isNaN(d.getTime())) {
        throw new RangeError('Invalid date');
    }

    let result = pattern;

    // Year
    result = result.replace('yyyy', d.getFullYear().toString());

    // Month
    const month = d.getMonth() + 1;
    result = result.replace('MM', month.toString().padStart(2, '0'));
    result = result.replace('M', month.toString());

    // Day
    const day = d.getDate();
    result = result.replace('dd', day.toString().padStart(2, '0'));
    result = result.replace('d', day.toString());

    // Hour (12-hour format)
    let hour = d.getHours();
    const isPM = hour >= 12;
    hour = hour % 12 || 12; // Convert 0 to 12
    result = result.replace('hh', hour.toString().padStart(2, '0'));
    result = result.replace('h', hour.toString());

    // Minute
    const minute = d.getMinutes();
    result = result.replace('mm', minute.toString().padStart(2, '0'));

    // AM/PM
    result = result.replace('aa', isPM ? 'PM' : 'AM');

    return result;
}

/**
 * Parse a date string using a simple pattern.
 *
 * Supported pattern: "y-M-d" (year-month-day with flexible digit counts)
 *
 * @param dateString - The date string to parse
 * @param pattern - The format pattern (currently only supports "y-M-d")
 * @param referenceDate - Reference date for context (not used in current implementation)
 * @returns Parsed Date object
 */
export function parse(dateString: string, pattern: string, referenceDate: Date): Date {
    if (pattern === 'y-M-d') {
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
            const day = parseInt(parts[2], 10);
            return new Date(year, month, day);
        }
    }

    throw new RangeError(`Unsupported parse pattern: ${pattern}`);
}

/**
 * Check if two dates are on the same day (ignoring time).
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if dates are on the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

/**
 * Format a date to ISO 8601 string.
 *
 * @param date - The date to format
 * @returns ISO 8601 formatted string
 */
export function formatISO(date: Date): string {
    // Match date-fns v4 behavior: remove .000 milliseconds if zero
    const iso = date.toISOString();
    return iso.replace('.000Z', 'Z');
}

/**
 * Add days to a date.
 *
 * @param date - The date
 * @param amount - Number of days to add (can be negative)
 * @returns New Date object with days added
 */
export function addDays(date: Date, amount: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + amount);
    return result;
}

/**
 * Add weeks to a date.
 *
 * @param date - The date
 * @param amount - Number of weeks to add (can be negative)
 * @returns New Date object with weeks added
 */
export function addWeeks(date: Date, amount: number): Date {
    return addDays(date, amount * 7);
}

/**
 * Add months to a date.
 *
 * @param date - The date
 * @param amount - Number of months to add (can be negative)
 * @returns New Date object with months added
 */
export function addMonths(date: Date, amount: number): Date {
    const result = new Date(date);
    const day = result.getDate();

    result.setMonth(result.getMonth() + amount);

    // Handle month-end edge cases (e.g., Jan 31 + 1 month = Feb 28/29)
    if (result.getDate() < day) {
        result.setDate(0); // Go to last day of previous month
    }

    return result;
}

/**
 * Add years to a date.
 *
 * @param date - The date
 * @param amount - Number of years to add (can be negative)
 * @returns New Date object with years added
 */
export function addYears(date: Date, amount: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + amount);
    return result;
}

/**
 * Get the start of the week (Sunday) for a date.
 *
 * @param date - The date
 * @returns New Date object at start of week
 */
export function startOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay(); // 0 = Sunday, 6 = Saturday
    result.setDate(result.getDate() - day);
    result.setHours(0, 0, 0, 0);
    return result;
}

/**
 * Get the end of the week (Saturday) for a date.
 *
 * @param date - The date
 * @returns New Date object at end of week
 */
export function endOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    result.setDate(result.getDate() + (6 - day));
    result.setHours(23, 59, 59, 999);
    return result;
}

/**
 * Get the start of the month for a date.
 *
 * @param date - The date
 * @returns New Date object at start of month
 */
export function startOfMonth(date: Date): Date {
    const result = new Date(date);
    result.setDate(1);
    result.setHours(0, 0, 0, 0);
    return result;
}

/**
 * Get the end of the month for a date.
 *
 * @param date - The date
 * @returns New Date object at end of month
 */
export function endOfMonth(date: Date): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1, 0); // Day 0 of next month = last day of this month
    result.setHours(23, 59, 59, 999);
    return result;
}

/**
 * Get the start of the year for a date.
 *
 * @param date - The date
 * @returns New Date object at start of year
 */
export function startOfYear(date: Date): Date {
    const result = new Date(date);
    result.setMonth(0, 1);
    result.setHours(0, 0, 0, 0);
    return result;
}

/**
 * Get the end of the year for a date.
 *
 * @param date - The date
 * @returns New Date object at end of year
 */
export function endOfYear(date: Date): Date {
    const result = new Date(date);
    result.setMonth(11, 31);
    result.setHours(23, 59, 59, 999);
    return result;
}

/**
 * Get all weekend days (Saturday and Sunday) in an interval.
 *
 * @param interval - Object with start and end dates
 * @returns Array of Date objects for weekend days
 */
export function eachWeekendOfInterval(interval: { start: Date; end: Date }): Date[] {
    const result: Date[] = [];
    const current = new Date(interval.start);

    while (current <= interval.end) {
        const day = current.getDay();
        if (day === 0 || day === 6) { // Sunday or Saturday
            result.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
    }

    return result;
}
