/*! Copyright (c) 2020, XAPPmedia */
import { ConditionalCheck, RequestSlotMap, SlotDependable } from "stentor-models";

import { isSlotDependable } from "./Slot";
import { findSlotDependentMatch } from "./Slot/findSlotDependentMatch";

/**
 * Has a value for the provided slot name.
 * 
 * The slot is not undefined or an empty string.
 * @param slots 
 * @param name 
 */
export function hasSlot(slots: RequestSlotMap, name: string): boolean {

    const isNotUndefined = !!findSlotDependentMatch([{
        slotMatch: {
            name,
            value: "undefined",
            operation: "!="
        }
    }], slots);
    const isNotEmptyString = !!findSlotDependentMatch([
        {
            slotMatch: {
                name,
                value: "",
                operation: "!="
            }
        }
    ], slots);

    return isNotEmptyString && isNotUndefined;
}

/**
 * Has a value for the provided slot name.
 * 
 * The slot is not undefined or an empty string.
 * 
 * @privateRemark
 * This is just a wrapper around {@link hasSlots}
 * @param slots 
 * @param name 
 */
export function slotExists(slots: RequestSlotMap, name: string): boolean {
    return hasSlot(slots, name);
}

/**
 * The provided slot name does not exists.
 * 
 * It either is undefined or is an empty string.
 * @param slots 
 * @param name 
 */
export function slotDoesNotExist(slots: RequestSlotMap, name: string): boolean {
    return !!findSlotDependentMatch([{
        slotMatch: {
            name,
            value: "undefined"
        }
    },
    {
        slotMatch: {
            name,
            value: ""
        }
    }
    ], slots);
}

/**
 * The provided slot name equals the provided value.
 * 
 * @param slots 
 * @param name 
 * @param value 
 */
export function slotEquals(slots: RequestSlotMap, name: string, value: string | string[]): boolean {
    return !!findSlotDependentMatch([{
        slotMatch: {
            name,
            value
        }
    }], slots);
}

export function SlotConditionalCheck<T extends object>(slots: RequestSlotMap): ConditionalCheck {
    return {
        test: isSlotDependable,
        check: (obj: SlotDependable<T>): boolean => {
            return !!findSlotDependentMatch([obj], slots);
        },
        functions: [
            hasSlot.bind(null, slots),
            slotDoesNotExist.bind(null, slots),
            slotEquals.bind(null, slots),
            slotExists.bind(null, slots),
        ],
    }
}