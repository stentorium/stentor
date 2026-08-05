import { requestSlotValueToString } from "./requestSlotValueToString.js";
/**
 * Returns the slot value, if not found it returns undefined.
 *
 * @param slots
 * @param name
 * @returns
 */
export function getSlotValue(slots, name) {
    if (!slots) {
        return undefined;
    }
    const value = slots[name];
    return value ? value.value : undefined;
}
/**
 * From the provided slot map, it returns the slot value as a string or an empty string
 * if it doesn't find the value.
 *
 * @param request
 * @param name
 */
export function slot(slots, name) {
    const value = getSlotValue(slots, name);
    return value ? requestSlotValueToString(value) : "";
}
//# sourceMappingURL=getSlotValue.js.map