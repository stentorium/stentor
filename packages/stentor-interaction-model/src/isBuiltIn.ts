/*! Copyright (c) 2019, XAPPmedia */
import { BUILT_IN } from "./Entity";

/**
 * Is the Entity type for a built-in entity.
 *
 * @param {string} type
 * @returns {boolean}
 */
export function isBuiltInEntity(type: string): boolean {
    return BUILT_IN.includes(type);
}
