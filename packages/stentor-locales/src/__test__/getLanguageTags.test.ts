/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { getLanguageTags } from "../getLanguageTags";

describe("#getLanguageTags()", () => {
    describe("when passed undefined", () => {
        it("returns an empty array", () => {
            expect(getLanguageTags(undefined, ["en-AU", "es-ES"])).to.have.length(0);
        });
    });
    describe("when passed an empty string", () => {
        it("returns an empty array", () => {
            expect(getLanguageTags("" as any, ["en-AU", "es-ES"])).to.have.length(0);
        });
    });
    describe("when passed a language", () => {
        it("returns the correct result", () => {
            expect(getLanguageTags("en", ["en-AU", "es-ES", "en-US"])).to.deep.equal(["en-AU", "en-US"]);
            expect(getLanguageTags("es", ["en-AU", "es-ES", "en-US"])).to.deep.equal(["es-ES"]);
            expect(getLanguageTags("de", ["en-AU", "es-ES", "en-US"])).to.deep.equal([]);
            expect(getLanguageTags("de", [])).to.deep.equal([]);
        });
    });
    describe("when passed a language tag", () => {
        it("returns the correct result", () => {
            expect(getLanguageTags("en-AU", ["en-AU", "es-ES", "en-US"])).to.deep.equal(["en-AU"]);
            expect(getLanguageTags("en-US", ["en-AU", "es-ES", "en-US"])).to.deep.equal(["en-US"]);
            expect(getLanguageTags("en-CA", ["en-AU", "es-ES", "en-US"])).to.deep.equal([]);
            expect(getLanguageTags("es-ES", ["en-AU", "es-ES", "en-US"])).to.deep.equal(["es-ES"]);
            expect(getLanguageTags("de-DE", ["en-AU", "es-ES", "en-US"])).to.deep.equal([]);
        });
    });
});
