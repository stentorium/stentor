/*! Copyright (c) 2019, XAPPmedia */
import { Slot, SlotTypeMap, SlotTypeValue } from "stentor-models";

export interface MergeSlotsResult {
    totalAddedSlots?: number;
    addedSlots?: Slot[];
    totalIgnoredSlots?: number;
    ignoredSlots?: Slot[];
}

/**
 * Merge two arrays of slots together.
 *
 * A slot in the secondary array is ignored if one in the primary
 * with the same name is found.
 *
 * @export
 * @param {Slot[]} primary
 * @param {Slot[]} secondary
 * @returns {Slot[]}
 */
export function mergeSlots(primary: Slot[], secondary: Slot[], results: MergeSlotsResult = {}): Slot[] {
    // initial values
    results.totalAddedSlots = 0;
    results.addedSlots = [];
    results.totalIgnoredSlots = 0;
    results.ignoredSlots = [];

    if (!primary && !secondary) {
        return undefined;
    }

    if (!primary) {
        return secondary;
    }

    // Only rule with slots is we can't have two with the same name
    // we can have two with different names and same type
    const mergedSlots = primary.slice();
    // create a map of the names
    interface NameMap {
        [name: string]: Slot;
    }
    const names: NameMap = mergedSlots.reduce((current: NameMap, slot) => {
        return { ...current, [slot.name]: slot };
    }, {});
    // go through the secondary, see if they are in the
    // map and if not add them to the new merged slots
    secondary.forEach(slot => {
        if (!names[slot.name]) {
            mergedSlots.push({ ...slot });
            ++results.totalAddedSlots;
            results.addedSlots.push({ ...slot });
        } else {
            ++results.totalIgnoredSlots;
            results.ignoredSlots.push({ ...slot });
        }
    });

    return mergedSlots;
}

export interface MergeSlotTypeMapsResult {
    addedSlots?: number;
    ignoredSlots?: number;
}

/**
 * Merge two slot type maps together.
 *
 * This will combine slot type values of slot types with the same name.
 *
 * @export
 * @param {SlotTypeMap} primary
 * @param {SlotTypeMap} secondary
 * @returns {SlotTypeMap}
 */
export function mergeSlotTypeMaps(primary: SlotTypeMap, secondary: SlotTypeMap): SlotTypeMap {
    if (!primary && !secondary) {
        return undefined;
    }

    if (!primary) {
        return secondary;
    }

    // Create a copy of the primary
    const mergedSlotTypeMaps = { ...primary };

    // go through each key of the secondary
    Object.keys(secondary).forEach(key => {
        // Does the key exist in the primary?
        if (!mergedSlotTypeMaps[key]) {
            // just add it
            mergedSlotTypeMaps[key] = { ...secondary[key] };
        } else {
            // it exists, we need to combine the values
            // first make a copy
            const values = Array.isArray(mergedSlotTypeMaps[key].values) ? mergedSlotTypeMaps[key].values.slice() : [];
            // pull out the names and put them in a map
            interface ValueNameMap {
                [name: string]: SlotTypeValue;
            }
            const valueNames: ValueNameMap = values.reduce((current: ValueNameMap, value: SlotTypeValue) => {
                return { ...current, [value.name]: value };
            }, {});
            // make a copy of the secondary values
            const secondaryValues = Array.isArray(secondary[key].values) ? secondary[key].values.slice() : [];
            // then go through them, seeing if they exist and if not add them
            secondaryValues.forEach((value: SlotTypeValue) => {
                if (!valueNames[value.name]) {
                    values.push(value);
                }
            });
            // and finally add them back
            mergedSlotTypeMaps[key].values = values.slice();
        }
    });

    return mergedSlotTypeMaps;
}
