/*! Copyright (c) 2019, XAPPmedia */
import { Intent, Handler } from "stentor-models";
import { isHandler } from "./isHandler";

/**
 * Determine if the props are for an Intent
 *
 * @public
 */
export function isIntent(props: Handler | Intent): props is Intent {
    return !!props && (!isHandler(props) || (Array.isArray((props as Intent).utterancePatterns) && (props as Intent).utterancePatterns.length > 0));
}
