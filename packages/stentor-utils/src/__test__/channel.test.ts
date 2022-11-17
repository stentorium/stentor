/*! Copyright (c) 2022, XAPP AI */
import { expect } from "chai";
import { Request, Channeled } from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";
import { channelMatchesRequest } from "../channel";


const request1: Request = new IntentRequestBuilder().onChannel("device1").build();
const request2: Request = new IntentRequestBuilder().onChannel("channel-2").build();

const channeled1: Channeled = {
    channel: {
        name: "device1"
    }
}

const channeled2: Channeled = {
    channel: {
        name: "device1|device2"
    }
}

const channeled3: Channeled = {
    channel: {
        name: "no-match"
    }
}

const channeled4: Channeled = {
    channel: {
        name: "channel-1"
    }
}

describe(`$${channelMatchesRequest.name}()`, () => {

    it(`returns the expected result`, () => {
        expect(channelMatchesRequest(channeled1, undefined)).to.be.false;
        expect(channelMatchesRequest(undefined, request1)).to.be.false;
        expect(channelMatchesRequest(channeled1, request1)).to.be.true;
        expect(channelMatchesRequest(channeled3, request1)).to.be.false;
        expect(channelMatchesRequest(channeled4, request2)).to.be.false;
    });
    describe("when passed a regex string", () => {
        it(`returns the expected result`, () => {
            expect(channelMatchesRequest(channeled2, undefined)).to.be.false;
            expect(channelMatchesRequest(channeled2, request1)).to.be.true;
        });
    });
});