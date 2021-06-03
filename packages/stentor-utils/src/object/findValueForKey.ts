/*! Copyright (c) 2019, XAPPmedia */
import { existsAndNotEmpty } from "../array";
import { ObjectWithKeys, findValuesForKey } from "./findValuesForKey";

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
export function findValueForKey<V>(key: string, obj: ObjectWithKeys<V>): V | undefined {
    if (!key) {
        return undefined;
    }

    if (!obj) {
        return undefined;
    }

    // Look for an exact match
    const exactMatch: V = obj[key] ? obj[key] : undefined;

    // Look for a regex match
    let regexMatch: V;

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
