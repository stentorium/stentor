/*! Copyright (c) 2019, XAPPmedia */
import { existsAndNotEmpty } from "@xapp/stentor-utils";
import { DelegatingHandlersMap, HandlersArray, HandlersKeyValue } from "./HandlerFactory";

/**
 * Guard to determine if any of the possible HandlerFactory prop values are for Delegating Handlers
 *
 * @export
 * @param {(DelegatingHandlersMap | HandlersArray | HandlersKeyValue)} props
 * @returns {props is DelegatingHandlersMap}
 */
export function isDelegatingHandlersMap(
    props: DelegatingHandlersMap | HandlersArray | HandlersKeyValue
): props is DelegatingHandlersMap {
    let isDelegatingHandlersMap: boolean = false;

    if (typeof props === "object") {
        const keys = Object.keys(props);
        if (existsAndNotEmpty(keys)) {
            const value = (props as DelegatingHandlersMap)[keys[0]];
            if (typeof value === "object") {
                isDelegatingHandlersMap = true;
            }
        }
    }

    return isDelegatingHandlersMap;
}

/**
 * Guard to determine if any of the possible HandlerFactory prop values are an array of Handlers
 *
 * @export
 * @param {(DelegatingHandlersMap | HandlersArray | HandlersKeyValue)} props
 * @returns {props is HandlersArray}
 */
export function isHandlersArray(
    props: DelegatingHandlersMap | HandlersArray | HandlersKeyValue
): props is HandlersArray {
    return Array.isArray(props);
}

/**
 * Guard to determine if any of the possible HandlerFactory prop values are a key value object of Handlers
 *
 * @export
 * @param {(DelegatingHandlersMap | HandlersArray | HandlersKeyValue)} props
 * @returns {props is HandlersKeyValue}
 */
export function isHandlersKeyValue(
    props: DelegatingHandlersMap | HandlersArray | HandlersKeyValue
): props is HandlersKeyValue {
    let isHandlersKeyValue: boolean = false;

    // arrays are objects, need to check this first.
    if (Array.isArray(props)) {
        return isHandlersKeyValue;
    }

    if (typeof props === "object") {
        const keys = Object.keys(props);
        if (existsAndNotEmpty(keys)) {
            const value = (props as DelegatingHandlersMap)[keys[0]];
            if (typeof value === "function") {
                isHandlersKeyValue = true;
            }
        }
    }

    return isHandlersKeyValue;
}
