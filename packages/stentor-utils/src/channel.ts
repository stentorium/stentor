/*! Copyright (c) 2022, XAPP AI */

import { Channeled, Request } from "stentor-models";

/**
 * Determines if the provided channeled object matches with the provided request.
 * 
 * @param channeled 
 * @param request 
 * @returns 
 */
export function channelMatchesRequest(channeled: Channeled, request: Request,): boolean {

    // Try desired method then deprecated.
    const channel: string = request?.channel || request?.device?.channel;

    if (!channel) {
        return false;
    }

    if (!channeled?.channel?.name) {
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