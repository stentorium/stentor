/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { existsAndNotEmpty, random, shuffle } from "../array";

describe("Array", () => {
    describe("#random()", () => {
        describe("for an empty array", () => {
            it("returns undefined", () => {
                expect(random([])).to.be.undefined;
            });
        });
        describe("for an array of one item", () => {
            it("returns the first item", () => {
                expect(random(["item"])).to.equal("item");
            });
        });
    });
    describe("#existsAndNotEmpty()", () => {
        describe("when passed undefined", () => {
            it("returns false", () => {
                expect(existsAndNotEmpty(undefined)).to.be.false;
            });
        });
        describe("when passed an empty array", () => {
            it("returns false", () => {
                expect(existsAndNotEmpty([])).to.be.false;
            });
        });
        describe("when passed a string", () => {
            // strings also have a length parameter
            it("returns false", () => {
                const notAnArray: any = "string";
                expect(existsAndNotEmpty(notAnArray)).to.be.false;
            });
        });
        describe("when passed an array with one item", () => {
            it("returns true", () => {
                expect(existsAndNotEmpty(["string"])).to.be.true;
            });
        });
    });
});

describe(`#${shuffle.name}`, () => {
    describe("when passed an empty array", () => {
        it("returns an empty array", () => {
            expect(shuffle([])).to.deep.equal([]);
        });
    });
    describe("when passed an array", () => {
        it("returns the array shuffled", () => {
            const shuffled = shuffle([1, 2, 3, 4]);
            expect(shuffled).to.have.length(4);
            expect(shuffled).to.contain(1);
            expect(shuffled).to.contain(2);
            expect(shuffled).to.contain(3);
            expect(shuffled).to.contain(4);
        });
    });
});
