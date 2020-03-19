/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { isLinkoutSuggestion } from "../isLinkoutSuggestion";

describe(`#${isLinkoutSuggestion.name}()`, () => {
    it("returns false for undefined", () => {
        expect(isLinkoutSuggestion(undefined)).to.be.false;
    });
    it("returns false for a string", () => {
        expect(isLinkoutSuggestion("string")).to.be.false;
    });
});
