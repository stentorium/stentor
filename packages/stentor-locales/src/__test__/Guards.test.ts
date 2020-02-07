/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Locale } from "stentor-models";
import { isLanguage, isLanguageTag } from "../Guards";

describe("#isLanguageTag", () => {
    it("Tests that a language is false.", () => {
        expect(isLanguageTag("en")).to.be.false;
    });

    it("Tests that an undefined is false.", () => {
        expect(isLanguageTag(undefined)).to.be.false;
    });

    it("Tests that a dialect is true.", () => {
        expect(isLanguageTag("en-AU")).to.be.true;
    });

    it("Tests that an badly formatted dialect is false.", () => {
        expect(isLanguageTag("en?AAAAL" as Locale)).to.be.false;
    });

    it("Tests that a formatted es-419 is true.", () => {
        expect(isLanguageTag("es-419")).to.be.true;
    });
});

describe("#isLanguage", () => {
    it("Tests that a language is true.", () => {
        expect(isLanguage("en")).to.be.true;
    });

    it("Tests that an undefined is false.", () => {
        expect(isLanguage(undefined)).to.be.false;
    });

    it("Tests that a dialect is false.", () => {
        expect(isLanguage("en-AU")).to.be.false;
    });

    it("Tests that an badly formatted language is false.", () => {
        expect(isLanguage("EN?" as Locale)).to.be.false;
    });
});
