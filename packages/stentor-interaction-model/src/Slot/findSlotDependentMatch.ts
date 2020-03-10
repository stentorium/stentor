/*! Copyright (c) 2019, XAPPmedia */
import { log } from "stentor-logger";
import { RequestSlotMap, SlotDependable } from "stentor-models";
import { random } from "stentor-utils";
import { compare, isComparable } from "stentor-utils";
import { isSlotDependable } from "./Guards";

/**
 * Based on the request, it finds a slot dependent object that matches.
 *
 * @public
 * @param objects - Objects to look within
 * @param request - Request to compare the objects to in order to find a match
 * @returns - Returns the matched slot dependent object or undefined if not match was found.
 */
export function findSlotDependentMatch<T extends object>(
    objects: (T | SlotDependable<T>)[],
    slots: RequestSlotMap
): SlotDependable<T> | undefined {
    if (!Array.isArray(objects) || objects.length === 0) {
        return undefined;
    }

    if (!slots) {
        return undefined;
    }

    const matches: SlotDependable<T>[] = [];

    objects.forEach(obj => {
        if (!isSlotDependable(obj)) {
            // Fast fail
            return;
        }

        // See if we meet the criteria
        const test = obj.slotMatch;
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
                        matches.push(obj);
                    }
                }
            });
        } else {
            if (isComparable(slotValue)) {
                if (compare(slotValue, test.value, operation)) {
                    matches.push(obj);
                }
            }
        }
    });

    if (matches.length > 1) {
        log().info("Found more than one slot dependent match.");
    }

    // Not expecting more than one match at the moment but we need to
    // return one before defining better behavior
    return random(matches);
}
