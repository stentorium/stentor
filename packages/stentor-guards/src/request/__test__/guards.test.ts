/*! Copyright (c) 2022, XAPP AI */
import { expect } from "chai";
import { ChannelActionRequest, IntentRequest } from "stentor-models";
import { isChannelActionRequest } from "../guards";

const intentRequest: IntentRequest = {
    type: "INTENT_REQUEST",
    intentId: "HelpIntent",
    userId: "userId",
    sessionId: "sessionId"
}

const request: ChannelActionRequest = {
    type: "CHANNEL_ACTION_REQUEST",
    userId: "userId",
    action: "OPEN"
}

describe(`#${isChannelActionRequest.name}()`, () => {
    describe(`it returns the correct result`, () => {
        expect(isChannelActionRequest(undefined)).to.be.false;
        // @ts-expect-error Unit tests
        expect(isChannelActionRequest(false)).to.be.false;
        // @ts-expect-error Unit tests
        expect(isChannelActionRequest(true)).to.be.false;
        expect(isChannelActionRequest(intentRequest)).to.be.false;
        expect(isChannelActionRequest(request)).to.be.true;
    });
});