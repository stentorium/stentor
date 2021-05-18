/*! Copyright (c) 2019, XAPPmedia */
/**
 * Converts to a number if possible otherwise it passes it through.
 *
 * This preserves Dates and booleans.  If true is passed in, true is passed out.
 * Additionally, if an empty string is passed, it passes it through instead of
 * turning it into a number.
 *
 * @param {T} potentialNumber
 * @returns {(T | number)}
 */
export function toNumberIfPossible<T>(potentialNumber: T): T | number {
    if (typeof potentialNumber === "number") {
        return potentialNumber;
    }

    if (typeof potentialNumber === "boolean") {
        return potentialNumber;
    }

    if (typeof potentialNumber === "string" && potentialNumber.length === 0) {
        return potentialNumber;
    }

    if (potentialNumber instanceof Date) {
        return potentialNumber;
    }

    const possible = Number(potentialNumber);
    if (isNaN(possible)) {
        return potentialNumber;
    } else {
        return possible;
    }
}
