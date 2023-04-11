/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { RequestDependent } from "stentor-models";
import { IntentRequestBuilder, LaunchRequestBuilder } from "../Builders";
import { onWebPage, RequestConditionalCheck } from "../RequestConditionalCheck";

const launchRequest = new LaunchRequestBuilder().build();
const intentWithAttributes = new IntentRequestBuilder().withAttributes({
    currentUrl: "https://www.google.com"
}).build();

const intentWithAttributesAndUrlWithPath = new IntentRequestBuilder().withAttributes({
    currentUrl: "https://xapp.ai/about-us"
}).build();

const obj: RequestDependent = {
    requestMatch: {
        name: "type",
        value: ["INTENT_REQUEST", "LAUNCH_REQUEST"]
    }
};

describe(`${onWebPage.name}()`, () => {
    it('returns the expected result', () => {
        expect(onWebPage(launchRequest, "google.com")).to.be.false;
        expect(onWebPage(undefined, "google.com")).to.be.false;
        expect(onWebPage(intentWithAttributes, undefined)).to.be.false;
        expect(onWebPage(intentWithAttributes, "")).to.be.false;
        expect(onWebPage(intentWithAttributes, "google.com")).to.be.true;
        expect(onWebPage(intentWithAttributes, "xapp.ai")).to.be.false;
        expect(onWebPage(intentWithAttributes, "xapp.ai/about-us")).to.be.false;
        expect(onWebPage(intentWithAttributesAndUrlWithPath, "xapp.ai/about-us")).to.be.true;
    });
});

describe(`${RequestConditionalCheck.name}`, () => {
    describe(`test`, () => {
        it("returns the correct result", () => {
            expect(RequestConditionalCheck(launchRequest).test(undefined)).to.be.false;
            expect(RequestConditionalCheck(launchRequest).test(obj)).to.be.true;
        });
    });
    describe('check', () => {
        it("returns the correct result", () => {
            expect(RequestConditionalCheck(launchRequest).check(obj)).to.be.true;
        });
    });
    describe(`functions`, () => {
        it('returns the correct result', () => {
            // 10th is isRequestID
            const isRequestID = RequestConditionalCheck(launchRequest).functions[10];
            expect(isRequestID("LaunchRequest")).to.be.true;
            expect(isRequestID(["LaunchRequest"])).to.be.true;
            expect(isRequestID("IntentID")).to.be.false;
            // Pull out the 11th
            const isRequestType = RequestConditionalCheck(launchRequest).functions[11];
            expect(isRequestType("LAUNCH_REQUEST")).to.be.true;
            expect(isRequestType(["INTENT_REQUEST"])).to.be.false;
            // 4th is isLaunchRequest
            const isLaunchRequest = RequestConditionalCheck(launchRequest).functions[4];
            expect(isLaunchRequest()).to.be.true;
            // 5th is isNewSession
            const isNewSession = RequestConditionalCheck(launchRequest).functions[5];
            expect(isNewSession()).to.be.true;
        });
    });
});