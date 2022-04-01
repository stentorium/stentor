/*! Copyright (c) 2020, XAPPmedia */
import { Request, RequestSlot, Slot, SlotTypeMap } from "stentor-models";
import { isIntentRequest } from "stentor-guards";
import { hasSlots, matchRequestSlotToSlotTypeValue } from "stentor-utils";

/**
 * Returns the slot type for the given slot name.
 */
export function getSlotType(slotName: string, slots: Slot[]): string | undefined {
    if (!slots) {
        return undefined;
    }

    const slot = slots.find(slot => {
        return slot.name === slotName;
    });

    return slot ? slot.type : undefined;
}

/**
 * If the provided request is an intent request, it searches for the provided slot name
 * and then tries to find the appropriate data associated with that slot value.
 */
export function getMatchedSlotData<T>(
    request: Request,
    slotName: string,
    slots: Slot[],
    slotTypeMap: SlotTypeMap<T>
): T | undefined {
    let data: T | undefined;

    if (isIntentRequest(request) && hasSlots(request)) {
        // Intent request and we have slots
        const requestSlot: RequestSlot = request.slots[slotName];

        // First failure condition, no requested slot
        if (!requestSlot) {
            console.info(`Could not find a slot for ${slotName}`);
            return data;
        }

        // Second possible failure condition, no slot value or id was given
        // for what we are looking up
        if (!requestSlot.id && !requestSlot.value) {
            // This is something we want to see in the logs.
            console.info(`No slot value or id was returned for ${slotName}`);
            // return undefined
            return data;
        }

        // figure out the slot type for provided name
        const slotType = getSlotType(slotName, slots);
        // find the slot values if the type exists or set it to an empty array
        const slotValues = slotTypeMap[slotType] ? slotTypeMap[slotType].values : [];
        // then find the podcast utterance within the slot type values
        const slotTypeValue = matchRequestSlotToSlotTypeValue(requestSlot, slotValues);
        // Figure out what type of data we have
        if (slotTypeValue) {
            data = slotTypeValue.data;
        } else {
            // This is something we want to see in the logs
            console.info(
                `Could not match utterance "${requestSlot.id}" or "${requestSlot.value}" to a slot value in ${slotType}`
            );
        }
    }

    return data;
}