import { isIntentRequest } from "stentor-guards";
/**
 * Helper method to get the slots from the request, regardless of the type of request
 *
 * @param request
 * @returns
 */
export function getSlots(request) {
    let slots;
    if (isIntentRequest(request)) {
        slots = request.slots;
    }
    return slots;
}
//# sourceMappingURL=getSlots.js.map