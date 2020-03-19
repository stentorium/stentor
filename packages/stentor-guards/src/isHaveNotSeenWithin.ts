/*! Copyright (c) 2019, XAPPmedia */
import {
    HaveNotSeenWithin,
    HaveNotSeenWithinable
} from "stentor-models";

/**
 * Type guard to check if the object implements HaveNotSeenWithinable.
 * 
 * @param item 
 */
export function isHaveNotSeenWithin<T>(item: object): item is HaveNotSeenWithin<T> {
    return !!item && (item as HaveNotSeenWithinable).haveNotSeenWithin !== undefined;
}