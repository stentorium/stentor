/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { ResponseOutput } from "stentor-models";
import { expect } from "chai";
import { concatResponseOutput } from "../concat";

const responseOne: ResponseOutput = {
    displayText: "one",
    ssml: "<speak>one</speak>",
    textToSpeech: "one",
    suggestions: ["one"],
};

const responseOnePartial: ResponseOutput = {
    displayText: "one",
    ssml: "<speak>one</speak>",
    suggestions: ["one"]
};

const responseTwo: ResponseOutput = {
    displayText: "two",
    ssml: "<speak>two</speak>",
    textToSpeech: "two",
    suggestions: ["two"]
};

const responseTwoPartial: ResponseOutput = {
    displayText: "two",
    ssml: "<speak>two</speak>",
    suggestions: ["two"]
};

describe("#concatResponseOutput()", () => {
    describe("with both parameters undefined", () => {
        it("returns undefined", () => {
            expect(concatResponseOutput(undefined, undefined)).to.not.exist;
        });
    });
    describe("with one undefined parameter", () => {
        it("returns the first when the second is undefined", () => {
            expect(concatResponseOutput(responseOne, undefined)).to.equal(responseOne);
        });
        it("returns the second when the first is undefined", () => {
            expect(concatResponseOutput(undefined, responseTwo)).to.equal(responseTwo);
        });
    });
    describe("without options", () => {
        it("combines two full response outputs", () => {
            expect(concatResponseOutput(responseOne, responseTwo)).to.deep.equal({
                displayText: "one two",
                ssml: "<speak>one two</speak>",
                textToSpeech: "one two",
                suggestions: ["one", "two"]
            });
        });
        it("combines two partial response outputs", () => {
            expect(concatResponseOutput(responseOnePartial, responseTwoPartial)).to.deep.equal({
                displayText: "one two",
                ssml: "<speak>one two</speak>",
                suggestions: ["one", "two"]
            });
        });
    });
    describe("with options", () => {
        describe("with delimiter", () => {
            it("combines two response outputs using the delimiter", () => {
                expect(
                    concatResponseOutput(responseOnePartial, responseTwoPartial, { delimiter: "\n\n" })
                ).to.deep.equal({
                    displayText: "one\n\ntwo",
                    ssml: "<speak>one\n\ntwo</speak>",
                    suggestions: ["one", "two"]
                });
            });
        });
    });
});
