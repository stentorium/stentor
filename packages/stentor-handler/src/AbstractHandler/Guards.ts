/*! Copyright (c) 2019, XAPPmedia */
import { Handler, Intent } from "stentor-models";
import { existsAndNotEmpty } from "stentor-utils";

/**
 * Determine if the request handler props are for a handler.
 *
 * @public
 */
export function isHandler(props: Handler | Intent): props is Handler {
    return !!props && (props as Handler).type !== undefined && (props as Handler).type !== null;
}

/**
 * Determine if the props are for an Intent
 *
 * @public
 */
export function isIntent(props: Handler | Intent): props is Intent {
    return !!props && (!isHandler(props) || existsAndNotEmpty((props as Intent).utterancePatterns));
}
