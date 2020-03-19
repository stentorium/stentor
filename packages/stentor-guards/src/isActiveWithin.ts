/*! Copyright (c) 2019, XAPPmedia */
import {
    ActiveWithin,
    ActiveWithinable
} from "stentor-models";

/**
 * Type guard to check if the object implements ActiveWithinable
 * 
 * @param item Item to check 
 */
export function isActiveWithin<T>(item: object): item is ActiveWithin<T> {
    return !!item && (item as ActiveWithinable).activeWithin !== undefined;
}