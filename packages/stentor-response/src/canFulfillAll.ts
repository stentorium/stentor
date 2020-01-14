/*! Copyright (c) 2019, XAPPmedia */
import { CanFulfillIntentResult, RequestSlotMap, ThreeChoices } from "stentor-models";

/**
 * Convenience method to generate all positive response
 *
 * @param slots
 */
export function canFulfillAll(slots: RequestSlotMap, deny?: boolean): CanFulfillIntentResult {
    const results: CanFulfillIntentResult = {
        canFulfill: !!deny ? ThreeChoices.No : ThreeChoices.Yes,
        slots: {}
    };

    if (slots) {
        Object.keys(slots).forEach(key => {
            results.slots[key] = {
                canFulfill: !!deny ? ThreeChoices.No : ThreeChoices.Yes,
                canUnderstand: !!deny ? ThreeChoices.No : ThreeChoices.Yes
            };
        });
    }

    return results;
}
