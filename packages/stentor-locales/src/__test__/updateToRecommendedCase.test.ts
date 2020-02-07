/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { updateToRecommendedCase } from "../updateToRecommendedCase";

describe("#updateToRecommendedCase()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(updateToRecommendedCase(undefined)).to.be.undefined;
        });
    });
    describe("when passed a language code", () => {
        it("returns the language code", () => {
            expect(updateToRecommendedCase("en")).to.equal("en");
        });
    });
    describe("when passed a lower case country code", () => {
        it("capitalizes the country code", () => {
            expect(updateToRecommendedCase("en-us")).to.equal("en-US");
        });
    });
    describe("when passed the correct case", () => {
        it("maintains the case", () => {
            expect(updateToRecommendedCase("en-US")).to.equal("en-US");
        });
    });
    describe("when passed a tag with three sections", () => {
        it("maintains the case", () => {
            expect(updateToRecommendedCase("zh-Hant-HK")).to.equal("zh-Hant-HK");
        });
    });
});
