/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Locale } from "stentor-models";
import { getLanguageOfLocale } from "../getLanguageOfLocale";

describe("#getLanguageOfLocale", () => {
    it("Tests that a language is returned.", () => {
        expect(getLanguageOfLocale("en")).to.equal("en");
    });

    it("Tests that the language is returned for a full locale.", () => {
        expect(getLanguageOfLocale("en-US")).to.equal("en");
    });

    it("Tests that the language is undefined with an undefined.", () => {
        expect(getLanguageOfLocale(undefined)).to.be.undefined;
    });

    it("Tests that the language is undefined if the locale does not match the appropriate regex.", () => {
        expect(getLanguageOfLocale("qwe?" as Locale)).to.be.undefined;
    });
});
