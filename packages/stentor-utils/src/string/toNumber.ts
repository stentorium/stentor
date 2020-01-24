/*! Copyright (c) 2019, XAPPmedia */
/**
 * Converts the string to a number, if applicable.
 * @param number
 */
export function toNumber(stringOrNumber: string | number): number {
    if (typeof stringOrNumber === "number") {
        return stringOrNumber;
    }

    const possible = Number(stringOrNumber);
    if (isNaN(possible)) {
        return undefined;
    } else {
        return possible;
    }
}
