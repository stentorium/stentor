/*! Copyright (c) 2019, XAPPmedia */
import { SlotDependable, SlotDependent } from "stentor-models";

/**
 * Guard to check if an object is SlotDependable
 *
 * @template T
 * @param {object} item
 * @returns {item is SlotDependable<T>}
 */
export function isSlotDependable<T>(item: object): item is SlotDependable<T> {
    return !!item && (item as SlotDependent).slotMatch !== undefined;
}
