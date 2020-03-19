/*! Copyright (c) 2019, XAPPmedia */
import {
    FirstTime,
    FirstTimeable
} from "stentor-models";

/**
 * Type guard to check if the object implements FirstTimeable
 * 
 * @param item 
 */
export function isFirstTime<T>(item: object): item is FirstTime<T> {
    return !!item && (item as FirstTimeable).firstTime !== undefined;
}