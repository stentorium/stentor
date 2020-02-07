/*! Copyright (c) 2019, XAPPmedia */
import { Slot } from "stentor-models";
import { SLOT_UTTERANCE_PATTERNS_REGEX } from "./Constants";

interface SlotMap {
    [name: string]: Slot;
}
/**
 * Parses an array of strings for Utterance Patterns
 * and turns them into an array of Slots
 *
 * @export
 * @param {string[]} utterancePatterns
 * @param {Slot[]} slots
 * @returns {Slot[]}
 */
export function determineSlots(utterancePatterns: string[], slots: Slot[]): Slot[] {
    if (utterancePatterns === undefined) {
        return [];
    }

    // First map the existing slots for quick access by name
    const emptySlotMap: SlotMap = {}; // the initial value
    const slotMap: SlotMap = slots.reduce((map, slot) => {
        map[slot.name] = slot;
        return map;
    }, emptySlotMap);

    // we will then need to create a new map
    // to track the Slots we find in the utterances
    const foundSlotMap: SlotMap = {};

    // For each utterance, look for for {-|SlotName}
    utterancePatterns.forEach((pattern, index) => {
        const res = SLOT_UTTERANCE_PATTERNS_REGEX.exec(pattern);
        // if there was a match
        if (res && res[1]) {
            // pull out the name
            const name = res[1];
            // see if we already know about it by checkin the original
            if (!slotMap[name]) {
                // we got one we don't know about
                // make an empty type for it
                const type = "";
                // and add it
                foundSlotMap[name] = { name, type };
            } else {
                // add the original
                foundSlotMap[name] = slotMap[name];
            }
        }
    });

    // And reduce it back to an array
    const foundSlots: Slot[] = Object.keys(foundSlotMap).map(name => {
        return foundSlotMap[name];
    });

    return foundSlots;
}
