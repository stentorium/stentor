/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { toResponseOutput } from "../response";

describe("#toResponseOutput()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(toResponseOutput(undefined)).to.be.undefined;
        });
    });
    describe("when a string", () => {
        it("converts it to a ResponseOutput", () => {
            expect(toResponseOutput("Hello world!")).to.deep.equal({
                ssml: "<speak>Hello world!</speak>",
                displayText: "Hello world!"
            });
        });
    });
    describe("when passed a ResponseOutput", () => {
        it("passes it through", () => {
            expect(
                toResponseOutput({
                    ssml: "<speak>Hello world!</speak>",
                    displayText: "Hello world!"
                })
            ).to.deep.equal({
                ssml: "<speak>Hello world!</speak>",
                displayText: "Hello world!"
            });
        });
    });
});
