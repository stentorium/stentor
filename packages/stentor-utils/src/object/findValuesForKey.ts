
/*! Copyright (c) 2021, XAPPmedia */
export interface ObjectWithKeys<V> {
    [key: string]: V;
}

/**
 * Finds all values that match for the provided key.
 * 
 * Smarter than a normal obj[key] as key can also be a regex.
 *
 * @param key 
 * @param obj 
 * @returns 
 */
export function findValuesForKey<V>(key: string, obj: ObjectWithKeys<V>): V[] {
    if (!key) {
        return undefined;
    }

    if (!obj) {
        return undefined;
    }

    // Look for a regex match
    const regexMatches: V[] = [];

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
            regexMatches.push(objectKeyAsRegexMatch || keyAsRegexMatch);
        }
    });

    return regexMatches;
}