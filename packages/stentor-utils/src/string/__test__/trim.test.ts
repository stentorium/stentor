/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import { trim } from "../trim";

describe("#trim()", () => {
    it("Tests that all the strings are trimmed.", () => {
        expect(trim(["   ", "   Left", "Right    ", "   Both    "])).to.have.members(["", "Left", "Right", "Both"]);
    });
    it("Tests that the filter works.", () => {
        const trimmed = trim(["   ", "   Left", "Right   ", "   Both    "], (trim: string) => {
            return trim.length > 0;
        });
        expect(trimmed).to.have.members(["Left", "Right", "Both"]);
    });
});
