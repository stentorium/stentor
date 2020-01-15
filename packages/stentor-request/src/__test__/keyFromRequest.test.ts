/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import {
    InputUnknownRequestBuilder,
    IntentRequestBuilder,
    LaunchRequestBuilder,
    OptionSelectBuilder,
    SignInRequestBuilder
} from "../Builders";
import { keyFromRequest } from "../keyFromRequest";

describe("#keyFromRequest()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(keyFromRequest(undefined)).to.be.undefined;
        });
    });
    describe("for a SignInRequest", () => {
        it("returns the correct key", () => {
            expect(keyFromRequest(new SignInRequestBuilder().build())).to.equal("SignIn");
        });
    });
    describe("for a LaunchRequest", () => {
        it("returns the correct key", () => {
            expect(keyFromRequest(new LaunchRequestBuilder().build())).to.equal("LaunchRequest");
        });
    });
    describe("for an OptionSelectRequest", () => {
        it("returns the correct key", () => {
            expect(keyFromRequest(new OptionSelectBuilder().build())).to.equal("OptionSelect");
        });
    });
    describe("for a IntentRequest", () => {
        it("returns the correct key", () => {
            expect(keyFromRequest(new IntentRequestBuilder().withIntentId("IntentId").build())).to.equal("IntentId");
        });
    });
    describe("for an InputUnknownRequest", () => {
        it("returns the correct key", () => {
            expect(keyFromRequest(new InputUnknownRequestBuilder().build())).to.equal("InputUnknown");
        });
    });
});
