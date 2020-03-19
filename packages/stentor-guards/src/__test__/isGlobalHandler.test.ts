/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Handler } from "stentor-models";
import { isGlobalHandler } from "../isGlobalHandler";

const organizationId = "organizationId";
const appId = "appId";

const anotherHandler: Handler = {
    organizationId,
    appId,
    intentId: "anotherHandler",
    type: "HandlerType",
    name: "Another Handler",
    content: {},
    data: {}
};

const globalHandler: Handler = {
    organizationId,
    appId,
    intentId: "globalHandler",
    type: "HandlerType",
    name: "Global Handler",
    utterancePatterns: ["global access"],
    content: {
        ["globalHandler"]: [{ outputSpeech: "Hi", reprompt: "Hello?" }]
    },
    forward: {
        ["launchRequest"]: [
            {
                type: "START",
                intentId: "intentId"
            }
        ]
    },
    data: {}
};

const launchRequest: Handler = {
    organizationId,
    appId,
    intentId: "LaunchRequest",
    type: "HandlerType",
    name: "Launch Request",
    content: {
        ["LaunchRequest"]: [{ outputSpeech: "Hi", reprompt: "Hello?" }]
    }
};

describe(`#${isGlobalHandler.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isGlobalHandler(undefined)).to.be.false;
        });
    });
    describe("when passed a normal handler", () => {
        it("returns false", () => {
            expect(isGlobalHandler(anotherHandler)).to.be.false;
        });
    });
    describe("when passed a global handler", () => {
        it("returns true", () => {
            expect(isGlobalHandler(globalHandler)).to.be.true;
        });
    });
    describe("when passed a LaunchRequest", () => {
        it("returns true", () => {
            expect(isGlobalHandler(launchRequest)).to.be.true;
        });
    });
});