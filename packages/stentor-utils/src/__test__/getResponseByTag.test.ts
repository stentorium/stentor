/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Response } from "stentor-models";
import { getResponseByTag } from "../getResponseByTag";

const responses: Response[] = [
    {
        outputSpeech: "<speak>During playback, you can either pause or resume.</speak>",
        reprompt: "<speak>During playback, you can either pause or resume.</speak>",
        tag: "MEDIA_HELP"
    },
    {
        outputSpeech: "<speak>Goodbye</speak>"
    },
    {
        outputSpeech: "<speak>Hello, how are you?</speak>",
        tag: "GREETING"
    }
];

describe(`#${getResponseByTag.name}()`, () => {
    describe("when passed undefined tag", () => {
        it("returns undefined", () => {
            expect(getResponseByTag(responses, undefined)).to.be.undefined;
        });
    });
    describe("when passed undefined or empty responses", () => {
        it("returns undefined", () => {
            expect(getResponseByTag(undefined, "FOO")).to.be.undefined;
            expect(getResponseByTag([], "FOO")).to.be.undefined;
        });
    });
    describe("when passed a tag that doesn't exist", () => {
        it("returns undefined", () => {
            expect(getResponseByTag(responses, "FOO")).to.be.undefined;
        });
    });
    describe("when passed a tag that exists", () => {
        it("returns undefined", () => {
            expect(getResponseByTag(responses, "GREETING")).to.deep.equal(responses[2]);
        });
    });
});