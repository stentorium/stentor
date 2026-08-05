/*! Copyright (c) 2022, XAPP AI */
/**
 * Determines if the provided channeled object matches with the provided request.
 *
 * @param channeled
 * @param request
 * @returns
 */
export function channelMatchesRequest(channeled, request) {
    var _a, _b;
    // Try desired method then deprecated.
    const channel = (request === null || request === void 0 ? void 0 : request.channel) || ((_a = request === null || request === void 0 ? void 0 : request.device) === null || _a === void 0 ? void 0 : _a.channel);
    if (!channel) {
        return false;
    }
    if (!((_b = channeled === null || channeled === void 0 ? void 0 : channeled.channel) === null || _b === void 0 ? void 0 : _b.name)) {
        return false;
    }
    // try exact match first
    if (channel === channeled.channel.name) {
        return true;
    }
    // then try regex 
    const match = new RegExp(channeled.channel.name).exec(channel);
    if (match) {
        return true;
    }
    return false;
}
//# sourceMappingURL=channel.js.map