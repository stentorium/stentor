/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { toNumberIfPossible } from "../toNumberIfPossible";

// tslint:disable:no-magic-numbers
describe("#toNumberIfPossible()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(toNumberIfPossible(undefined)).to.be.undefined;
        });
    });
    describe("when passed a number", () => {
        it("returns the number", () => {
            expect(toNumberIfPossible(4)).to.equal(4);
        });
    });
    describe("when passed a string", () => {
        it("returns the number", () => {
            expect(toNumberIfPossible("3")).to.equal(3);
        });
        describe("that is empty", () => {
            it("passes it through", () => {
                expect(toNumberIfPossible("")).to.equal("");
            });
        });
    });
    describe("when passed an object", () => {
        it("passes it through", () => {
            expect(toNumberIfPossible({ foo: "bar" })).to.deep.equal({ foo: "bar" });
        });
    });
    describe("when passed a boolean", () => {
        it("passes it through", () => {
            expect(toNumberIfPossible(false)).to.deep.equal(false);
        });
    });
    describe("when passed a Date", () => {
        it("passes it through", () => {
            const date = new Date();
            expect(toNumberIfPossible(date)).to.equal(date);
        });
    });
});
