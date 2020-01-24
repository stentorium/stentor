/*! Copyright (c) 2019, XAPPmedia */
import { Actionable } from "stentor-models";

/**
 * Guard to check if the object is actionable.
 *
 * @export
 * @template T
 * @param {(T | Actionable<T>)} potential
 * @returns {potential is Actionable<T>}
 */
export function isActionable(potential: object | Actionable): potential is Actionable {
    return !!potential && Array.isArray((potential as Actionable).actions);
}
