/*! Copyright (c) 2020, XAPPmedia */
import { RequestSlotMap } from "stentor-models";

/**
 * Combines two slot maps.
 * 
 * @remarks
 * The incoming will only override the current if the value doesn't exist
 * on the current and exists on the incoming.  This is helpful for slot filling.
 * 
 * If both are undefined, an empty object is returned.
 *  
 * @param current - The current slots 
 * @param incoming - The new incoming slots
 */
export function combineRequestSlots(current: RequestSlotMap, incoming: RequestSlotMap): RequestSlotMap {
    // A couple of quick failure conditions
    // Neither exist
    if (typeof current !== "object" && typeof incoming !== "object") {
        // Return empty
        return {};
    }
    // Current does not exist, incoming does
    if (typeof current !== "object" && typeof incoming === "object") {
        return incoming;
    }
    // Current exists, incoming does not
    if (typeof current === "object" && typeof incoming !== "object") {
        return current;
    }

    // Copy the original
    const combined: RequestSlotMap = { ...current };
    // For each, we only override if there is a new that does not exist on the previous.
    Object.keys(incoming).forEach((key): void => {
        const incomingSlot = incoming[key];
        // Only override if the value exists
        if (incomingSlot.value && incomingSlot.value !== null && incomingSlot.value !== undefined) {
            combined[key] = incomingSlot;
        }
    });
    return combined;
}