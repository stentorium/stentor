/*! Copyright (c) 2026, XAPPmedia */
/**
 * Lightweight natural language date parser to replace chrono-node.
 *
 * This module provides parsing for common relative date phrases like
 * "today", "yesterday", "last friday", "two weeks ago", etc.
 *
 * @remarks
 * This implementation focuses on the specific use cases in our codebase
 * and handles the most common patterns.
 */

const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const NUMBER_WORDS: { [key: string]: number } = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
};

/**
 * Parse a natural language date string and return a Date object.
 *
 * Supported patterns:
 * - "today", "yesterday", "tomorrow"
 * - Day names: "monday", "friday", etc. (returns nearest occurrence)
 * - "last <day>": previous occurrence of that day
 * - "next <day>": occurrence after the immediate next
 * - "X days/weeks/months ago": relative to current date
 * - "X days/weeks/months from now": future relative date
 *
 * @param input - The natural language date string
 * @returns Date object or null if unable to parse
 */
export function parseNaturalDate(input: string): Date | null {
    if (!input || typeof input !== 'string') {
        return null;
    }

    const normalized = input.toLowerCase().trim();
    const now = new Date();

    // Simple cases
    if (normalized === 'today') {
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    if (normalized === 'yesterday') {
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        date.setDate(date.getDate() - 1);
        return date;
    }

    if (normalized === 'tomorrow') {
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        date.setDate(date.getDate() + 1);
        return date;
    }

    // Day name alone (e.g., "monday", "friday")
    const dayIndex = DAY_NAMES.indexOf(normalized);
    if (dayIndex !== -1) {
        return getNearestDayOfWeek(now, dayIndex);
    }

    // "last <day>" pattern
    const lastDayMatch = normalized.match(/^last\s+(\w+)$/);
    if (lastDayMatch) {
        const dayName = lastDayMatch[1];
        const dayIdx = DAY_NAMES.indexOf(dayName);
        if (dayIdx !== -1) {
            return getLastDayOfWeek(now, dayIdx);
        }
    }

    // "next <day>" pattern
    const nextDayMatch = normalized.match(/^next\s+(\w+)$/);
    if (nextDayMatch) {
        const dayName = nextDayMatch[1];
        const dayIdx = DAY_NAMES.indexOf(dayName);
        if (dayIdx !== -1) {
            return getNextDayOfWeek(now, dayIdx);
        }
    }

    // "X days/weeks/months/years ago" pattern
    const agoMatch = normalized.match(/^(\w+)\s+(day|week|month|year)s?\s+ago$/);
    if (agoMatch) {
        const amount = parseNumberWord(agoMatch[1]);
        const unit = agoMatch[2];
        if (amount !== null) {
            return getRelativeDate(now, -amount, unit);
        }
    }

    // "X days/weeks/months/years from now" pattern
    const fromNowMatch = normalized.match(/^(\w+)\s+(day|week|month|year)s?\s+from\s+now$/);
    if (fromNowMatch) {
        const amount = parseNumberWord(fromNowMatch[1]);
        const unit = fromNowMatch[2];
        if (amount !== null) {
            return getRelativeDate(now, amount, unit);
        }
    }

    // Unable to parse
    return null;
}

/**
 * Get the nearest occurrence of a day of week.
 * If the day is earlier in the current week, returns last occurrence.
 * If the day is later in the current week, returns next occurrence.
 */
function getNearestDayOfWeek(from: Date, targetDay: number): Date {
    const currentDay = from.getDay();
    const result = new Date(from.getFullYear(), from.getMonth(), from.getDate());

    if (targetDay <= currentDay) {
        // Day is in the past this week, go backward
        const daysBack = currentDay - targetDay;
        result.setDate(result.getDate() - daysBack);
    } else {
        // Day is in the future this week, go forward
        const daysForward = targetDay - currentDay;
        result.setDate(result.getDate() + daysForward);
    }

    return result;
}

/**
 * Get the previous occurrence of a day of week.
 */
function getLastDayOfWeek(from: Date, targetDay: number): Date {
    const currentDay = from.getDay();
    const result = new Date(from.getFullYear(), from.getMonth(), from.getDate());

    let daysBack = currentDay - targetDay;
    if (daysBack <= 0) {
        daysBack += 7;
    }

    result.setDate(result.getDate() - daysBack);
    return result;
}

/**
 * Get the next occurrence of a day of week.
 * "next <day>" always means next week's occurrence of that day.
 *
 * Formula: (7 - currentDay) + targetDay
 * This takes us to the end of the current week, then to the target day of next week.
 *
 * Examples from Wednesday Sep 11 (day 3):
 * - "next monday" (day 1): (7 - 3) + 1 = 5 days = Sep 16
 * - "next friday" (day 5): (7 - 3) + 5 = 9 days = Sep 20
 */
function getNextDayOfWeek(from: Date, targetDay: number): Date {
    const currentDay = from.getDay();
    const result = new Date(from.getFullYear(), from.getMonth(), from.getDate());

    // Days forward = days to end of week + target day of next week
    const daysForward = (7 - currentDay) + targetDay;

    result.setDate(result.getDate() + daysForward);
    return result;
}

/**
 * Get a date relative to the given date by a certain amount and unit.
 */
function getRelativeDate(from: Date, amount: number, unit: string): Date {
    const result = new Date(from.getFullYear(), from.getMonth(), from.getDate());

    switch (unit) {
        case 'day':
            result.setDate(result.getDate() + amount);
            break;
        case 'week':
            result.setDate(result.getDate() + (amount * 7));
            break;
        case 'month':
            result.setMonth(result.getMonth() + amount);
            break;
        case 'year':
            result.setFullYear(result.getFullYear() + amount);
            break;
    }

    return result;
}

/**
 * Parse a number word (e.g., "five", "ten") to a number.
 * Also handles numeric strings (e.g., "5", "10").
 */
function parseNumberWord(word: string): number | null {
    const normalized = word.toLowerCase();

    // Check if it's a number word
    if (NUMBER_WORDS[normalized] !== undefined) {
        return NUMBER_WORDS[normalized];
    }

    // Check if it's a numeric string
    const num = parseInt(normalized, 10);
    if (!isNaN(num) && num > 0) {
        return num;
    }

    return null;
}
