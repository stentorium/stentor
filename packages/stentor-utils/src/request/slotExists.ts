/*! Copyright (c) 2022, XAPP AI */
import { RequestSlotMap } from "stentor-models";
import { existsAndNotEmpty } from "../array";
import { getSlotValue } from "./getSlotValue";

/**
 * Will check the provided slot map with the array of potential slot names to see if there is a value.
 * 
 * @param slots 
 * @param slotNames 
 */
export function slotExists(slots: RequestSlotMap, slotNames: string[]): boolean {

    let hasSlot = false;

    if (!slots || !existsAndNotEmpty(slotNames)) {
        return hasSlot;
    }

    for (const slotName of slotNames) {
        if (getSlotValue(slots, slotName)) {
            hasSlot = true;
            break;
        }
    }

    return hasSlot;
}