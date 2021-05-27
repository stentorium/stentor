
/*! Copyright (c) 2021, XAPPmedia */
import { expect } from "chai";

import { wordToNumber } from "../wordToNumber";

describe.only("#wordToNumber()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(wordToNumber(undefined)).to.be.undefined;
        });
    });
    describe("when passed a word that is a number", () => {
        it("passes it through", () => {
            expect(wordToNumber("fifty-five")).to.equal(55);
        });
    });
    describe("when passed a normal word", () => {
        it("passes it through", () => {
            expect(wordToNumber("foo")).to.equal("foo");
        });
    });
});