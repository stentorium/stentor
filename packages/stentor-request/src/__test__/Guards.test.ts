/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import * as sinon from "sinon";

import { hasSessionId, isAnonymousUser, isRequestDependable } from "stentor-guards";
import { RequestDependent } from "stentor-models";
import {
    AudioPlayerRequestBuilder,
    IntentRequestBuilder,
    LaunchRequestBuilder,
    PermissionGrantBuilder,
    PlaybackControlRequestBuilder,
    SessionEndedRequestBuilder
} from "../Builders";

describe("#hasSessionId()", () => {
    describe("with IntentRequest", () => {
        it("returns true", () => {
            const request = new IntentRequestBuilder().build();
            expect(hasSessionId(request)).to.be.true;
        });
    });
    describe("with LaunchRequest", () => {
        it("returns true", () => {
            const request = new LaunchRequestBuilder().build();
            expect(hasSessionId(request)).to.be.true;
        });
    });
    describe("with SessionEndedRequest", () => {
        it("returns true", () => {
            const request = new SessionEndedRequestBuilder().build();
            expect(hasSessionId(request)).to.be.true;
        });
    });
    describe("with PermissionGrant", () => {
        it("returns true", () => {
            const request = new PermissionGrantBuilder().build();
            expect(hasSessionId(request)).to.be.true;
        });
    });
    describe("with AudioPlayerRequest", () => {
        it("returns false", () => {
            const request = new AudioPlayerRequestBuilder().build();
            expect(hasSessionId(request)).to.be.false;
        });
    });
    describe("with PlaybackControlRequest", () => {
        it("returns false", () => {
            const request = new PlaybackControlRequestBuilder().build();
            expect(hasSessionId(request)).to.be.false;
        });
    });
});

describe("#isAnonymousUser()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isAnonymousUser(undefined)).to.be.false;
        });
    });
    describe("when passed an anonymous userId", () => {
        let clock: sinon.SinonFakeTimers;

        beforeEach(() => {
            const date = new Date("2018-10-10T16:16:13Z");
            clock = sinon.useFakeTimers(date.getTime());
        });
        afterEach(() => {
            clock.restore();
        });
        it("returns true", () => {
            const request = new IntentRequestBuilder().withUserId("15392025728371774174715").build();
            expect(isAnonymousUser(request)).to.be.true;
        });
    });
    describe("when passed a normal userId", () => {
        it("returns false", () => {
            const googleRequest = new IntentRequestBuilder()
                .withUserId("ABwppHHKqGS2YRm91iRa57RvgZxWgjyQrOSZP8yvWe0D0RHPbxbTGmhUYtsLtXxQgDoU6q7k7uRM3kBd4w")
                .build();
            expect(isAnonymousUser(googleRequest)).to.be.false;
            const alexaRequest = new IntentRequestBuilder()
                .withUserId("amzn1.ask.skill.15402f5e-c548-4a16-ba80-f0e83320d407")
                .build();
            expect(isAnonymousUser(alexaRequest)).to.be.false;
        });
    });
});

describe("#isRequestDependable()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isRequestDependable(undefined)).to.be.false;
        });
    });
    describe("when passed a normal object", () => {
        it("returns false", () => {
            expect(isRequestDependable({ foo: false })).to.be.false;
        });
    });
    describe("when passed a RequestDependent object", () => {
        it("returns true", () => {
            const requestDependent: RequestDependent = {
                requestMatch: {
                    name: "newSession",
                    value: true
                }
            };
            expect(isRequestDependable(requestDependent)).to.be.true;
        });
    });
});
