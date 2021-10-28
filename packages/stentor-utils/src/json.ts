/*! Copyright (c) 2019, XAPPmedia */
/* eslint-disable @typescript-eslint/no-var-requires */

// We are making the jsonpath-plus available externally
import { JSONPath } from "jsonpath-plus";

const cloneDeep = require("lodash.clonedeep");
const forOwn = require("lodash.forown");
const isEmpty = require("lodash.isempty");
const isObject = require("lodash.isobject");
const isString = require("lodash.isstring");
const pull = require("lodash.pull");


/**
 * Prune an object.  Removes all empty strings, NaNs,
 * undefineds, and nulls.
 *
 * @see Based on https://stackoverflow.com/a/26202058/1349766
 *
 * @param obj
 */
export function pruneEmpty<T>(obj: T): T {
    return (function prune(current: any): any {
        forOwn(current, (value: any, key: any) => {
            if (
                typeof value === "undefined" ||
                value === undefined ||
                value === null ||
                Number.isNaN(value) ||
                (isString(value) && isEmpty(value))
            ) {
                delete current[key];
            } else if (isObject(value)) {
                // prune the object
                prune(value);
            }
        });
        // remove any leftover undefined values from the delete
        // operation on an array
        if (Array.isArray(current)) {
            pull(current, undefined);
        }

        return current;
    })(cloneDeep(obj)); // Do not modify the original object, create a clone instead
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
