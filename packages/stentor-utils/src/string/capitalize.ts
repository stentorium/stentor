/*! Copyright (c) 2019, XAPPmedia */
/**
 * Capitalizes the word
 *
 * It turns "zero" to "Zero"
 *
 * @see https://stackoverflow.com/a/33704783/1349766
 * @export
 * @param {string} s
 * @returns
 */
export function capitalize(s: string): string | undefined {
    return typeof s === "string" && s.length > 0 ? s[0].toUpperCase() + s.slice(1) : s;
}
