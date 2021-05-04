/*! Copyright (c) 2019, XAPPmedia */
import { Channel, Device, NLUService } from "stentor-models";

import { DEFAULT_DEVICE, STENTOR_PLATFORM } from "./Constants";
import { isDeviceable, isStentorRequest } from "./Guards";
import { TranslateStentorRequest, TranslateStentorResponse } from "./Translators";

/**
 * Returns the capabilities of the device.
 * 
 * If the request coming in has a device key, it will return that as the device capabilities otherwise
 * it defaults to a web based chat widget.
 * @param body 
 * @returns 
 */
export function capabilities(body: Record<string, unknown>): Device {

    if (isDeviceable(body)) {
        return body.device;
    }

    return DEFAULT_DEVICE;
}

export const STENTOR_CHANNEL: Channel = {
    name: STENTOR_PLATFORM,
    test: isStentorRequest,
    request: new TranslateStentorRequest(),
    response: new TranslateStentorResponse(),
    capabilities
};

export function Stentor(nlu?: NLUService): Channel {
    return {
        ...STENTOR_CHANNEL,
        nlu
    };
}
