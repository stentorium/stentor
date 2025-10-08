/*! Copyright (c) 2022, XAPP AI */
import { expect } from "chai";
import { ChannelActionRequest, EventRequest, IntentRequest } from "stentor-models";
import { isChannelActionRequest, isEventRequest } from "../guards";

const intentRequest: IntentRequest = {
    type: "INTENT_REQUEST",
    intentId: "HelpIntent",
    userId: "userId",
    sessionId: "sessionId"
}

const channelActionRequest: ChannelActionRequest = {
    type: "CHANNEL_ACTION_REQUEST",
    userId: "userId",
    action: "OPEN"
}

const eventRequest: EventRequest = {
    type: "EVENT_REQUEST",
    userId: "userId",
    eventName: "test_event",
    metadata: { foo: "bar" }
}

describe(`#${isChannelActionRequest.name}()`, () => {
    describe(`it returns the correct result`, () => {
        expect(isChannelActionRequest(undefined)).to.be.false;
        // @ts-expect-error Unit tests
        expect(isChannelActionRequest(false)).to.be.false;
        // @ts-expect-error Unit tests
        expect(isChannelActionRequest(true)).to.be.false;
        expect(isChannelActionRequest(intentRequest)).to.be.false;
        expect(isChannelActionRequest(channelActionRequest)).to.be.true;
    });
});

describe(`#${isEventRequest.name}()`, () => {
    describe(`it returns the correct result`, () => {
        expect(isEventRequest(undefined)).to.be.false;
        // @ts-expect-error Unit tests
        expect(isEventRequest(false)).to.be.false;
        // @ts-expect-error Unit tests
        expect(isEventRequest(true)).to.be.false;
        expect(isEventRequest(intentRequest)).to.be.false;
        expect(isEventRequest(channelActionRequest)).to.be.false;
        expect(isEventRequest(eventRequest)).to.be.true;
    });
});