/**
 * Determine if the request slot value is a Duration
 *
 * @public
 * @param slotValue - Slot value to check
 */
export function isDuration(slotValue) {
    return !!slotValue && typeof slotValue === "object" && typeof slotValue.amount === "number" && typeof slotValue.format === "string";
}
//# sourceMappingURL=isDuration.js.map