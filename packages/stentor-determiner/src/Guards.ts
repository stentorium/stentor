/*! Copyright (c) 2019, XAPPmedia */
import { Conditional, JSONDependable, JSONDependent } from "stentor-models";

/**
 * Guard to determine if the object implements JSONDependable.
 * 
 * @param item 
 * @returns Type checked boolean if the object implements JSON
 */
export function isJSONDependable<T>(item: object): item is JSONDependable<T> {
    return !!item && !!(item as JSONDependent).JSONPathMatch;
}

/**
 * Type guard to check if the object implements Conditional
 * 
 * @param item 
 * @returns Type checked boolean if the object implements Conditioned
 */
export function isConditional<T>(item: object): item is Conditional<T> {
    return !!item && (typeof (item as Conditional<T>).conditions === "object" || typeof (item as Conditional<T>).conditions === "string");
}

