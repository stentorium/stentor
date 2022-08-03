/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { isBuiltInIntent, isIntent } from "../isIntent";

const appId = "appId";
const intentId = "intentId";
const organizationId = "organizationId";

describe(`#${isBuiltInIntent.name}()`, () => {
    it("returns the correct value", () => {
        expect(isBuiltInIntent({ appId, intentId, organizationId, utterancePatterns: null })).to.be.false;
        expect(isBuiltInIntent({ appId, intentId: "CancelIntent", organizationId, utterancePatterns: null })).to.be.true;
    });
    describe('with override', () => {
        it("returns the correct value", () => {
            expect(isBuiltInIntent({
                appId, intentId, organizationId, nlu: {
                    "lex-connect": {
                        type: "AMAZON.StopIntent"
                    }
                }
            })).to.be.true;

            expect(isBuiltInIntent({
                appId, intentId, organizationId, nlu: {
                    "lex-connect": {
                        type: "StopIntent"
                    }
                }
            })).to.be.false;
        })
    });
});

describe(`#${isIntent.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isIntent(undefined)).to.be.false;
        });
    });
    it("returns the correct result", () => {
        expect(isIntent({ appId, intentId, organizationId, utterancePatterns: null })).to.be.true;
        expect(isIntent({ appId, intentId, organizationId, utterancePatterns: ["foo"] })).to.be.true;
        expect(isIntent({ appId, intentId, organizationId, utterancePatterns: ["foo"], type: "bar" })).to.be.true;
        expect(isIntent({ appId, intentId, organizationId, utterancePatterns: [] })).to.be.true;
    });
    describe("when it is a built-in", () => {
        it("returns true", () => {
            expect(isIntent({ appId, intentId: "InputUnknown", organizationId, utterancePatterns: [] })).to.be.true;
            expect(isIntent({ appId, intentId: "LaunchRequest", organizationId, utterancePatterns: [] })).to.be.true;
            expect(isIntent({ appId, intentId: "CancelIntent", organizationId, utterancePatterns: [] })).to.be.true;
            expect(isIntent({ appId, intentId: "CancelIntent", organizationId, utterancePatterns: null })).to.be.true;
            expect(isIntent({ appId, intentId: "CancelIntent", organizationId, utterancePatterns: null, type: "ConversationHandler" })).to.be.true;
        });
    });
    describe("when it is a handler with empty utterances", () => {
        describe("with empty utterances", () => {
            it("returns true", () => {
                expect(isIntent({ appId, intentId, organizationId, utterancePatterns: [], type: "ConversationHandler" })).to.be.true;
            });
        });
        describe("without utterances", () => {
            it("returns false", () => {
                expect(isIntent({ appId, intentId, organizationId, utterancePatterns: null, type: "ConversationHandler" })).to.be.false;
            });
        });
    });
    describe("when there is an override", () => {
        it("returns true", () => {
            expect(isIntent({
                appId, intentId, organizationId, utterancePatterns: null, nlu: {
                    "foo": {
                        type: "bar"
                    }
                }
            })).to.be.true;

            expect(isIntent({
                appId, intentId, organizationId, utterancePatterns: null, type: "ConversationHandler", nlu: {
                    "foo": {
                        type: "bar"
                    }
                }
            })).to.be.true;

            expect(isIntent({
                appId, intentId, organizationId, type: "ConversationHandler"
            })).to.be.false;

            expect(isIntent({
                appId, intentId, organizationId, type: "ConversationHandler", nlu: null
            })).to.be.false;
        });
    });
});