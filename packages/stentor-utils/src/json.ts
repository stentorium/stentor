/*! Copyright (c) 2019, XAPPmedia */
/* eslint-disable @typescript-eslint/no-var-requires */

// We are making the jsonpath-plus available externally
import { JSONPath } from "jsonpath-plus";

/**
 * Prune an object by removing all empty strings, NaNs, undefined, and null values.
 *
 * @param obj - The object to be pruned.
 * @returns A new object with the empty, NaN, undefined, and null values removed.
 */
export function pruneEmpty<T>(obj: T): T {
    // Clone the object deeply without Lodash
    const cloneDeep = (o: any): any => {
        if (o === null || typeof o !== 'object') {
            return o;
        }
        if (Array.isArray(o)) {
            return o.map((a) => cloneDeep(a));
        }
        return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, cloneDeep(v)]));
    };

    const prune = (current: any): any => {
        // Ensure current is an object before using Object.keys
        if (current === null || typeof current !== 'object') {
            return current;
        }

        Object.keys(current).forEach((key) => {
            const value = current[key];
            if (
                value === undefined ||
                value === null ||
                Number.isNaN(value) ||
                (typeof value === 'string' && value.trim() === '')
            ) {
                delete current[key];
            } else if (value && typeof value === 'object') {
                prune(value);
            }
        });

        if (Array.isArray(current)) {
            for (let i = 0; i < current.length; i++) {
                if (current[i] === undefined) {
                    current.splice(i, 1);
                    i--; // Adjust the index since we've modified the array
                }
            }
        }

        return current;
    };

    return prune(cloneDeep(obj));
}


/**
 * Simple wrapper around JSONPath Plus
 * 
 * @param path 
 * @param data 
 * @returns 
 */
export function getJSONPath(path: string, json: null | boolean | number | string | object | any[]): any[] {
    return JSONPath({ path, json });
}
