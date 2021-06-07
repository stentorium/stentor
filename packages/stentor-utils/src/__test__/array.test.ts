/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { combine, existsAndNotEmpty, random, shuffle } from "../array";

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

describe(`#${combine.name}()`, () => {
    it('returns the expected result', () => {
        expect(combine(undefined, undefined)).to.deep.equal([]);
        expect(combine([], [])).to.deep.equal([]);
        expect(combine([1], undefined)).to.deep.equal([1]);
        expect(combine([1], [])).to.deep.equal([1]);
        expect(combine(undefined, [1])).to.deep.equal([1]);
        expect(combine([], [1])).to.deep.equal([1]);
        expect(combine([1, 2], [3])).to.deep.equal([1, 2, 3]);
    });
});
