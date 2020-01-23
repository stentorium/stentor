/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { generateIntentId } from "../id";

describe("#generateIntentId()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(generateIntentId(undefined)).to.equal(undefined);
        });
    });
    describe("when passed a number", () => {
        it("returns undefined", () => {
            const one: any = 1;
            expect(generateIntentId(one)).to.equal(undefined);
        });
    });
    describe("when passed an already formated intent ID", () => {
        it("returns it untouched", () => {
            expect(generateIntentId("PhoneNumberIntent")).to.equal("PhoneNumberIntent");
            expect(generateIntentId("APhoneNumberIntent")).to.equal("APhoneNumberIntent");
        });
    });
    describe("when passed a name with spaces", () => {
        it("removes the spaces", () => {
            expect(generateIntentId("My Awesome Intent")).to.equal("MyAwesomeIntent");
        });
    });
    describe("when passed a name with lower case", () => {
        it("capitalizes the word", () => {
            expect(generateIntentId("This is a Good Intent")).to.equal("ThisIsAGoodIntent");
        });
    });
    describe("when passed a name with non-word character delimiters", () => {
        it("removes the delimiters", () => {
            expect(generateIntentId("This-Intent")).to.equal("ThisIntent");
            expect(generateIntentId("This_Intent")).to.equal("ThisIntent");
            expect(generateIntentId("This~Intent")).to.equal("ThisIntent");
            expect(generateIntentId("This--Intent")).to.equal("ThisIntent");
            expect(generateIntentId("This___Intent")).to.equal("ThisIntent");
            expect(generateIntentId("__This-Intent__")).to.equal("ThisIntent");
            expect(generateIntentId("__This_IsA-Intent__")).to.equal("ThisIsAIntent");
        });
    });
    describe("when passed unicode", () => {
        it("converts it", () => {
            expect(generateIntentId("unicode ♥ intent")).to.equal("UnicodeLoveIntent");
        });
    });
    describe("when passed a name that does not end in intent", () => {
        it("adds Intent", () => {
            expect(generateIntentId("my awesome")).to.equal("MyAwesomeIntent");
            expect(generateIntentId(" my awesome ")).to.equal("MyAwesomeIntent");
        });
    });
});
