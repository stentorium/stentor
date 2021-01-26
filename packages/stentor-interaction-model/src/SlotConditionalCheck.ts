/*! Copyright (c) 2020, XAPPmedia */
import { log } from "stentor-logger";
import { ConditionalCheck, IntentRequest, Request, RequestSlotMap, SlotDependable } from "stentor-models";

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
    // No request slot map, anything they pass doesn't exist
    if (!slots) {
        return true;
    }

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
    const slotEquals = !!findSlotDependentMatch([{
        slotMatch: {
            name,
            value
        }
    }], slots);

    if (slotEquals) {
        log().debug(`Slot ${name} did NOT equal ${value}`);
    } else {
        log().debug(`Slot ${name} equals ${value}`);
    }

    return slotEquals;
}

/**
 * Returns all the slot conditional checks for the provided request.
 * 
 * @param input 
 */
export function SlotConditionalCheck<T extends object>(input: RequestSlotMap | Request): ConditionalCheck {

    function hasSlots(possibleRequest: RequestSlotMap | Request): possibleRequest is IntentRequest {
        return !!possibleRequest && (possibleRequest as Request).type === "INTENT_REQUEST" && typeof (possibleRequest as IntentRequest).slots === "object";
    }

    function isRequestSlotmap(possibleRequest: RequestSlotMap | Request): possibleRequest is RequestSlotMap {
        return !!possibleRequest && typeof possibleRequest === "object" && (possibleRequest as Request).type !== "INTENT_REQUEST";
    }

    let slots: RequestSlotMap;

    if (hasSlots(input)) {
        slots = input.slots;
    }

    if (isRequestSlotmap(input)) {
        slots = input;
    }

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