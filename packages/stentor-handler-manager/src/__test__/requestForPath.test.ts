/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { ExecutablePath, Request } from "stentor-models";
import { IntentRequestBuilder, isIntentRequest, LaunchRequestBuilder } from "@xapp/stentor-request";
import { requestForPath } from "../requestForPath";

const launchRequest: Request = new LaunchRequestBuilder().build();
const intentRequest: Request = new IntentRequestBuilder().withIntentId("TwoIntent").build();

const startPath: ExecutablePath = {
    type: "START",
    intentId: "OneIntent"
};

const slotsPath: ExecutablePath = {
    type: "START",
    intentId: "ThreeIntent",
    slots: {
        ["NUMBER"]: {
            name: "NUMBER",
            value: "one",
            successfulMatch: true
        }
    }
};

const launchPath: ExecutablePath = {
    intentId: "LaunchRequest"
};

describe("#requestForPath()", () => {
    let request: Request;
    describe("when passed undefined", () => {
        it("returns the original request", () => {
            expect(requestForPath(undefined, undefined)).to.be.undefined;
            expect(requestForPath(launchRequest, undefined)).to.equal(launchRequest);
        });
    });
    describe("when passed a path with type:start", () => {
        it("sets the overrideKey", () => {});
    });
    describe("when passed a path for an intent", () => {
        beforeEach(() => {
            request = requestForPath(launchRequest, startPath);
        });
        it("updates the request overrideKey", () => {
            expect(request.overrideKey).to.equal("OneIntent");
        });
        it("preserves the request information", () => {
            expect(request.userId).to.equal(launchRequest.userId);
            expect(request.isNewSession).to.equal(launchRequest.isNewSession);
        });
    });
    describe("when passed a launch request path without type:start", () => {
        beforeEach(() => {
            request = requestForPath(intentRequest, launchPath);
        });
        it("keeps the request type the same", () => {
            expect(isIntentRequest(request)).to.be.true;
        });
        it("keeps the request intentId the same", () => {
            if (isIntentRequest(request)) {
                expect(request.intentId).to.equal("TwoIntent");
            }
        });
    });
    describe("when passed a path with slots", () => {
        beforeEach(() => {
            request = requestForPath(intentRequest, slotsPath);
        });
        it("updates the request type", () => {
            expect(isIntentRequest(request)).to.be.true;
        });
        it("updates the request intentId", () => {
            expect(request.overrideKey).to.equal("ThreeIntent");
        });
        it("adds the slots to the request", () => {
            if (isIntentRequest(request)) {
                expect(request.slots).to.exist;
                expect(request.slots).to.deep.equal(slotsPath.slots);
            }
        });
        it("preserves the request information", () => {
            expect(request.userId).to.equal(intentRequest.userId);
            expect(request.isNewSession).to.equal(intentRequest.isNewSession);
        });
    });
});
