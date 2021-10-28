/*! Copyright (c) 2021, XAPPmedia */
import { TemplatedList } from "stentor-models";

/**
 * Guard to check if the provided object is a TemplatedList object for compilation.
 * @param list 
 * @returns 
 */
export function isTemplatedList(list: object): list is TemplatedList {
    // We need itemsObject, itemsName & array of items for this to check out
    return !!list
        && typeof (list as TemplatedList).itemsObject === "string"
        // Not required actually, we default it to "item"
        // && typeof (list as TemplatedList).itemsName === "string"
        && Array.isArray((list as TemplatedList).items);
}