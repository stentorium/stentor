/*! Copyright (c) 2019, XAPPmedia */
/**
 * Clean HTML and XML tags from a string
 *
 * @param {string} str
 * @returns {string}
 */
export function cleanTags(str: string): string {
    if (!str) {
        return str;
    }
    const regex = /(<([^>]+?)>)/gi;
    return str.replace(regex, "");
}
