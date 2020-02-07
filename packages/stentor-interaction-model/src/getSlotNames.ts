/*! Copyright (c) 2019, XAPPmedia */
import { SLOT_REGEX } from "./Slot";

/**
 * From the provided utterance, pull out the slot names found within the utterance
 *
 * Supports both ${name} & {-|name} style slot values.
 *
 * @param utterance
 */
export function getSlotNames(utterance: string): string[] {
    if (typeof utterance !== "string") {
        return [];
    }

    const slotNames: { [name: string]: true } = {};
    // The "g" flag allows us to iterate with the while loop
    const regex = new RegExp(SLOT_REGEX, "g");
    let results = regex.exec(utterance);
    while (results) {
        slotNames[results[1]] = true;
        results = regex.exec(utterance);
    }

    return Object.keys(slotNames);
}
