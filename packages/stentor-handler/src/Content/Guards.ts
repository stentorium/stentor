/*! Copyright (c) 2019, XAPPmedia */
import { Contentable } from "./Contentable";

/**
 * Guard to check if the provided object is Contentable, it has a content key.
 *
 * @export
 * @param {object} item
 * @returns {item is Contentable}
 */
export function isContentable(item: object): item is Contentable {
    return !!item && (item as Contentable).content !== undefined;
}
