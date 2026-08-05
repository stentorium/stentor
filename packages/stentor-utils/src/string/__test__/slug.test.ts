/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import { slug } from "../slug";

describe("#slug()", () => {
    describe("when passed no options", () => {
        it("replaces spaces with dashes and keeps the case", () => {
            expect(slug("Word that is not url safe")).to.equal("Word-that-is-not-url-safe");
        });
        it("leaves an already safe word alone", () => {
            expect(slug("URLSafeWord")).to.equal("URLSafeWord");
        });
        it("strips unicode", () => {
            expect(slug("Crème Brûlée")).to.equal("Creme-Brulee");
        });
    });
    describe("when passed lower", () => {
        it("lowercases the slug", () => {
            expect(slug("URLSafeWord", { lower: true })).to.equal("urlsafeword");
        });
    });
    describe("when passed remove", () => {
        it("removes the matched characters", () => {
            expect(slug("Apostrophe's", { remove: /'/ })).to.equal("Apostrophes");
        });
    });
    describe("when passed a string", () => {
        it("uses it as the replacement character", () => {
            expect(slug("two words", "_")).to.equal("two_words");
        });
    });
    describe("when passed lower and strict", () => {
        // The shape used for appIds and campaign slugs.
        it("lowercases and drops characters that are not alphanumeric or the replacement", () => {
            expect(slug("My App's Name!", { lower: true, strict: true })).to.equal("my-apps-name");
            expect(slug("Summer Sale 2026", { lower: true, strict: true })).to.equal("summer-sale-2026");
        });
        it("collapses runs of separators", () => {
            expect(slug("A -- B", { lower: true, strict: true })).to.equal("a-b");
        });
    });
    describe("when nested to sanitize a file name", () => {
        // The shape used when deriving an uploaded asset's name.
        const remove = /[$*_+~.()'"!\\:@%^#&+={}[\];<>,?]/g;
        it("strips unicode then the special characters", () => {
            // The removed characters are dropped outright, not replaced - so the dot before an
            // extension closes up rather than becoming a dash.
            expect(slug(slug("Crème (Brûlée)!.wav"), { remove, lower: true })).to.equal("creme-bruleewav");
        });
        it("keeps a plain name intact", () => {
            expect(slug(slug("my recording"), { remove, lower: true })).to.equal("my-recording");
        });
    });
    describe("when passed a non string", () => {
        // slugify itself throws; the call sites rely on that rather than a silent empty string.
        it("throws", () => {
            expect(() => slug(undefined)).to.throw();
            expect(() => slug(42 as unknown as string)).to.throw();
        });
    });
});
