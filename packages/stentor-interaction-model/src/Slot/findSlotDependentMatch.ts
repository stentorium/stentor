/*! Copyright (c) 2019, XAPPmedia */
import { RequestSlotMap, SlotDependable } from "stentor-models";
import { random } from "stentor-utils";
import { compare, isComparable } from "stentor-utils";
import { isSlotDependable } from "./Guards";

/**
 * Based on the request, it finds the slot dependent path
 * that is a match.
 *
 * @export
 * @param {SlotDependentPath[]} paths
 * @param {Request} request
 * @returns {(SlotDependentPath | undefined)}
 */
export function findSlotDependentMatch<T extends object>(
    paths: (T | SlotDependable<T>)[],
    slots: RequestSlotMap
): SlotDependable<T> | undefined {
    if (!Array.isArray(paths) || paths.length === 0) {
        return undefined;
    }

    if (!slots) {
        return undefined;
    }

    const matches: SlotDependable<T>[] = [];

    paths.forEach(path => {
        if (!isSlotDependable(path)) {
            return;
        }

        // See if we meet the criteria
        const test = path.slotMatch;
        const operation = test.operation;
        const slotName = test.name;
        const slot = slots[slotName];
        const slotValue = slot ? slot.value : undefined;

        // check if it is an array or not
        if (Array.isArray(test.value)) {
            // it is an array, try each for a match
            test.value.forEach(value => {
                if (isComparable(slotValue)) {
                    if (compare(slotValue, value, operation)) {
                        matches.push(path);
                    }
                }
            });
        } else {
            if (isComparable(slotValue)) {
                if (compare(slotValue, test.value, operation)) {
                    matches.push(path);
                }
            }
        }
    });

    if (matches.length > 1) {
        console.info("Found more than one slot dependent match.");
    }

    // Not expecting more than one match at the moment but we need to
    // return one before defining better behavior
    return random(matches);
}
