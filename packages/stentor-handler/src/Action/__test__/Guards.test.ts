/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { isActionable } from "../Guards";

describe("#isActionable()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isActionable(undefined)).to.be.false;
        });
    });
    describe("when passed an actionable object", () => {
        it("returns true", () => {
            expect(
                isActionable({
                    actions: []
                })
            );
        });
    });
    describe("when passed a normal object", () => {
        it("returns false", () => {
            expect(isActionable({})).to.be.false;
        });
    });
});
