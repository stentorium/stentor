/*! Copyright (c) 2022, XAPP AI */
import { expect } from "chai";
import { Request, Channeled } from "stentor-models";
import { channelMatchesRequest } from "../channel";

const request1: Request = {
    type: 'INTENT_REQUEST',
    userId: 'userId',
    sessionId: 'sessionId',
    isNewSession: false,
    intentId: 'intentId',
    locale: 'en-US',
    device: {
        channel: 'test',
        audioSupported: true,
        canPlayAudio: true,
        videoSupported: false,
        canPlayVideo: false,
        canSpeak: true,
        canThrowCard: true,
        canTransferCall: false,
        hasScreen: false,
        hasWebBrowser: false
    },
    deviceId: 'deviceId',
    channel: 'device1'
}

const request2: Request = {
    type: 'INTENT_REQUEST',
    userId: 'userId',
    sessionId: 'sessionId',
    isNewSession: false,
    intentId: 'intentId',
    locale: 'en-US',
    device: {
        channel: 'test',
        audioSupported: true,
        canPlayAudio: true,
        videoSupported: false,
        canPlayVideo: false,
        canSpeak: true,
        canThrowCard: true,
        canTransferCall: false,
        hasScreen: false,
        hasWebBrowser: false
    },
    deviceId: 'deviceId',
    channel: 'channel-2'
}

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