import { existsAndNotEmpty } from "../array.js";
import { getSlotValue } from "./getSlotValue.js";
/**
 * Will check the provided slot map with the array of potential slot names to see if there is a value.
 *
 * @param slots
 * @param slotNames
 */
export function slotExists(slots, slotNames) {
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
//# sourceMappingURL=slotExists.js.map