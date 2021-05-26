/*! Copyright (c) 2019, XAPPmedia */
import { Storage, StorageDependable } from "stentor-models";
import { compare, random } from "stentor-utils";
import { JSONPath } from "jsonpath-plus";
import { isStorageDependable } from "./Guards";

/**
 * Based on the provided storage, it finds the storage dependent object
 * that is a match.
 *
 * @param {((T | StorageDependable<T>)[])} storageDependents
 * @param {Storage} storage
 * @returns {(T | undefined)}
 */
export function findStorageDependentMatch<T extends object>(
    storageDependents: (T | StorageDependable<T>)[],
    storage: Storage
): StorageDependable<T> | undefined {
    if (!Array.isArray(storageDependents) || storageDependents.length === 0) {
        return undefined;
    }

    if (!storage) {
        return undefined;
    }

    const matches: StorageDependable<T>[] = [];

    storageDependents.forEach(path => {
        if (!isStorageDependable(path)) {
            // not for us
            return;
        }

        const test = path.storageMatch;
        const operation = test.operation;
        const name = test.name;
        const storageValueResults = JSONPath({ json: storage, path: name.trim() });
        const storageValue = storageValueResults[0];

        if (typeof storageValue === "number" || typeof storageValue === "string" || typeof storageValue === "boolean") {
            // check if it is an array or not
            if (Array.isArray(test.value)) {
                // it is an array, try each for a match
                test.value.forEach(value => {
                    if (compare(storageValue, value, operation)) {
                        matches.push(path);
                    }
                });
            } else {
                if (compare(storageValue, test.value, operation)) {
                    matches.push(path);
                }
            }
        } else if (typeof storageValue === "object") {
            console.error(`Sorry, cannot determine a match off of value type ${typeof storageValue}.`);
        } else if (storageValue === undefined) {
            // check if it is an array or not
            if (Array.isArray(test.value)) {
                // it is an array, try each for a match
                test.value.forEach(value => {
                    if (compare(storageValue, value, operation)) {
                        matches.push(path);
                    }
                });
            } else {
                if (compare(storageValue, test.value, operation)) {
                    matches.push(path);
                }
            }
        }
    });

    // Not expecting more than one match at the moment but we need to
    // return one before defining better behavior
    return random(matches);
}
