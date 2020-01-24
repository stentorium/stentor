/*! Copyright (c) 2019, XAPPmedia */
import { Contextual, JSONDependable, JSONDependent } from "stentor-models";

/**
 * Guard to determine if the path is a JSON dependent path.
 *
 * @export
 * @param {Path} path
 * @returns {path is JSONPathDependentPath}
 */
export function isJSONDependable<T>(item: object): item is JSONDependable<T> {
    return !!item && !!(item as JSONDependent).JSONPathMatch;
}

export function isContextual(item: object): item is Contextual {
    return !!item && typeof (item as Contextual).context === "object";
}
