/*! Copyright (c) 2019, XAPPmedia */
import { SLOT_REGEX } from "./Slot";

/**
 * From a string, it returns the slot name.
 *
 * It will take fields such as ${foo}, {foo}, or {-|foo} and return foo.
 *
 * @param {string} slot
 * @returns {(string | undefined)}
 */
export function getSlotName(slot: string): string | undefined {
    let slotName: string;
    const match = new RegExp(SLOT_REGEX).exec(slot);
    if (match) {
        slotName = match[1];
    }

    return slotName;
}
