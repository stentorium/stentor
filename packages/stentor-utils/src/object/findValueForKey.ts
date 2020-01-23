/*! Copyright (c) 2019, XAPPmedia */
export interface ObjectWithKeys<V> {
    [key: string]: V;
}

/**
 * Searches the provided object for the provided key.
 *
 * Smarter than a normal obj[key] as key can also be a regex.
 *
 * In the cases where a regex is broad (".*") but there is also an exact match,
 * the exact match is preferred.
 *
 * @export
 * @template V
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

        let keyAsRegexMatch: V;
        let objectKeyAsRegexMatch: V;

        const keys = Object.keys(obj);
        // Iterate through and look for a regex match
        keys.forEach(objectKey => {
            // Check the objectKey for a regex match
            const objectKeyRegex = new RegExp(objectKey);
            const objectKeyResults = objectKeyRegex.exec(key);
            if (Array.isArray(objectKeyResults) && objectKeyResults.length > 0 && objectKeyResults[0] === key) {
                objectKeyAsRegexMatch = obj[objectKey];
            }
            // Check the key, see if it is a regex
            const keyRegex = new RegExp(key);
            const keyResults = keyRegex.exec(objectKey);
            if (Array.isArray(keyResults) && keyResults.length > 0 && keyResults[0] === objectKey) {
                keyAsRegexMatch = obj[objectKey];
            }

            if (objectKeyAsRegexMatch || keyAsRegexMatch) {
                regexMatch = objectKeyAsRegexMatch || keyAsRegexMatch;
            }
        });
    }

    // Return what you find.
    return exactMatch || regexMatch;
}
