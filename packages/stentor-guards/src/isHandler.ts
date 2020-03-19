/*! Copyright (c) 2019, XAPPmedia */
import { Handler, Intent } from "stentor-models";

/**
 * Determine if the request handler props are for a handler.
 *
 * @public
 */
export function isHandler(props: Handler | Intent): props is Handler {
    return !!props && (props as Handler).type !== undefined && (props as Handler).type !== null;
}

