import { requestSlotValueToString } from "./requestSlotValueToString.js";
/**
 * Convert a set of slots to a string, helpful for debuging.
 *
 * @param slots
 * @returns - A string respresentation of the slot values
 */
export function requestSlotsToString(slots) {
    let str = "";
    if (!slots || typeof slots !== "object") {
        return str;
    }
    const slotNames = Object.keys(slots);
    slotNames.forEach((name) => {
        const slot = slots[name];
        str += `${name}:${requestSlotValueToString(slot.value)}  `;
    });
    return str.trim();
}
//# sourceMappingURL=requestSlotsToString.js.map