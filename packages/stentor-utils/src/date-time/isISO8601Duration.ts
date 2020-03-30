/*! Copyright (c) 2020, XAPPmedia */

/**
 * Regex to detect ISO-8601 duration strings
 * 
 * {@link https://stackoverflow.com/a/32045167}
 */
export const ISO_8601_DURATION = /^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/;

/**
 * Determine if the string is a proper ISO-8601 duration format.
 * 
 * {@link https://stackoverflow.com/questions/32044846/regex-for-iso-8601-durations}
 * {@link https://en.wikipedia.org/wiki/ISO_8601#Durations}
 * @param potential - Potential ISO-8601 duration string to test
 * @returns - True if the provided string is a ISO-8601 duration formatted string.
 */
export function isISO8601Duration(potential: string): boolean {
    if (!potential) {
        return false;
    }

    const regex = new RegExp(ISO_8601_DURATION);
    const results = regex.exec(potential);

    return !!results;

}