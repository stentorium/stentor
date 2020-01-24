/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import { capitalize } from "../capitalize";

describe("#capitalize()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(capitalize(undefined)).to.be.undefined;
        });
    });
    describe("when passed an empty string", () => {
        it("returns an empty string", () => {
            expect(capitalize("")).to.equal("");
        });
    });
    describe("when passed a word", () => {
        it("capitalizes the first letter", () => {
            expect(capitalize("zero")).to.equal("Zero");
            expect(capitalize("a")).to.equal("A");
            expect(capitalize("Bar")).to.equal("Bar");
        });
    });
});
