/*! Copyright (c) 2019, XAPPmedia */
import { JSONDependable, JSONDependent } from "stentor-models";

/**
 * Guard to determine if the object implements JSONDependable.
 * 
 * @param item 
 * @returns Type checked boolean if the object implements JSON
 */
export function isJSONDependable<T>(item: object): item is JSONDependable<T> {
    return !!item && !!(item as JSONDependent).JSONPathMatch;
}