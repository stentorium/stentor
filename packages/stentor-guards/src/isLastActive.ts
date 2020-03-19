/*! Copyright (c) 2019, XAPPmedia */
import { LastActive } from "stentor-models";
import { isActiveWithin } from "./isActiveWithin";
import { isFirstTime } from "./isFirstTime";
import { isHaveNotSeenWithin } from "./isHaveNotSeenWithin"

/**
 * Type guard to check if the object implements LastActive interface
 * @param item T
 */
export function isLastActive<T>(item: object): item is LastActive<T> {
    return isActiveWithin(item) || isFirstTime(item) || isHaveNotSeenWithin(item);
}