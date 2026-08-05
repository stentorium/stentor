/*! Copyright (c) 2019, XAPPmedia */
import { existsAndNotEmpty } from "../array.js";
import { findValuesForKey } from "./findValuesForKey.js";
/**
 * Searches the provided object for the provided key.
 *
 * Smarter than a normal obj[key] as key can also be a regex.
 *
 * In the cases where a regex is broad (".*") but there is also an exact match,
 * the exact match is preferred.
 *
 * @param {string} key
 * @param {ObjectWithKeys<V>} obj
 * @returns {(V | undefined)}
 */
export function findValueForKey(key, obj) {
    if (!key) {
        return undefined;
    }
    if (!obj) {
        return undefined;
    }
    // Look for an exact match
    const exactMatch = obj[key] ? obj[key] : undefined;
    // Look for a regex match
    let regexMatch;
    if (!exactMatch) {
        // only if we don't have an exact already
        const regexMatches = findValuesForKey(key, obj);
        if (existsAndNotEmpty(regexMatches)) {
            regexMatch = regexMatches.pop();
        }
    }
    // Return what you find.
    return exactMatch || regexMatch;
}
//# sourceMappingURL=findValueForKey.js.map