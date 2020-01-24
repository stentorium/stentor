/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { compare } from "../compare";

describe("#compare()", () => {
    describe("when passed undefined operation", () => {
        it("defaults to ===", () => {
            expect(compare("test", "test")).to.be.true;
        });
    });
    describe("when passed undefined as a value", () => {
        it("returns the correct result", () => {
            expect(compare(undefined, undefined)).to.be.true;
            expect(compare("undefined", undefined)).to.be.true;
            expect(compare(undefined, "undefined")).to.be.true;
            expect(compare(undefined, 1)).to.be.false;
            expect(compare(1, undefined)).to.be.false;
            expect(compare("undefined", 1)).to.be.false;
            expect(compare("string", "undefined")).to.be.false;
            expect(compare(undefined, 1, "!==")).to.be.true;
            expect(compare(1, undefined, "!==")).to.be.true;
            expect(compare("undefined", 1, "!==")).to.be.true;
            expect(compare("string", "undefined", "!==")).to.be.true;
        });
    });
    describe("with loose equality operator", () => {
        it("returns the correct result", () => {
            expect(compare("test", "test", "==")).to.be.true;
            expect(compare(1, 1, "==")).to.be.true;
            expect(compare(1, "1", "==")).to.be.true;
            expect(compare("test", "no", "==")).to.be.false;
            expect(compare(1, 2, "==")).to.be.false;
        });
    });
    describe("with strict equality operator", () => {
        it("returns the correct result", () => {
            expect(compare("test", "test", "===")).to.be.true;
            expect(compare(1, 1, "===")).to.be.true;
            expect(compare(1, "1", "===")).to.be.false;
            expect(compare("test", "no", "===")).to.be.false;
            expect(compare(1, 2, "===")).to.be.false;
        });
    });
    describe("with the inequality operator", () => {
        it("returns the correct result", () => {
            expect(compare("test", "test", "!=")).to.be.false;
            expect(compare(1, 1, "!=")).to.be.false;
            expect(compare("test", "no", "!=")).to.be.true;
            expect(compare(1, 2, "!=")).to.be.true;
            expect(compare(1, "1", "!=")).to.be.false;
        });
    });
    describe("with the strict inequality operator", () => {
        it("returns the correct result", () => {
            expect(compare("test", "test", "!==")).to.be.false;
            expect(compare(1, 1, "!==")).to.be.false;
            expect(compare("test", "no", "!==")).to.be.true;
            expect(compare(1, 2, "!==")).to.be.true;
            expect(compare(1, "1", "!==")).to.be.true;
        });
    });
    describe("with less than operator", () => {
        it("returns the correct result", () => {
            expect(compare("test", "test", "<")).to.be.false;
            expect(compare(1, 1, "<")).to.be.false;
            expect(compare("test", "no", "<")).to.be.false;
            expect(compare(1, 2, "<")).to.be.true;
            expect(compare(2, 1, "<")).to.be.false;
        });
    });
    describe("with the greater than operator", () => {
        it("returns the correct result", () => {
            expect(compare("test", "test", ">")).to.be.false;
            expect(compare(1, 1, ">")).to.be.false;
            expect(compare("test", "no", ">")).to.be.true;
            expect(compare(1, 2, ">")).to.be.false;
            expect(compare(2, 1, ">")).to.be.true;
        });
    });
    describe("with the less than or equal to operator", () => {
        it("returns the correct result", () => {
            expect(compare("test", "test", "=<")).to.be.true;
            expect(compare(1, 1, "=<")).to.be.true;
            expect(compare("test", "no", "=<")).to.be.false;
            expect(compare(1, 2, "=<")).to.be.true;
            expect(compare(2, 1, "=<")).to.be.false;
        });
    });
    describe("with the greater than or equal to operator", () => {
        it("returns the correct result", () => {
            expect(compare("test", "test", ">=")).to.be.true;
            expect(compare(1, 1, ">=")).to.be.true;
            expect(compare("test", "no", ">=")).to.be.true;
            expect(compare(1, 2, ">=")).to.be.false;
            expect(compare(2, 1, ">=")).to.be.true;
        });
    });
    describe("with the includes operator", () => {
        it("returns the correct result", () => {
            expect(compare("hello", "e", "includes")).to.be.true;
            expect(compare("hello", "llov", "includes")).to.be.false;
            expect(compare("he2llo", 2, "includes")).to.be.true;
            expect(compare("he2llo", 1, "includes")).to.be.false;
            expect(compare("hello true", true, "includes")).to.be.true;
            expect(compare("hello true", false, "includes")).to.be.false;
            expect(compare(true, true, "includes")).to.be.true;
            expect(compare(true, "ue", "includes")).to.be.true;
        });
    });
    describe("with the !includes operator", () => {
        it("returns the correct result", () => {
            expect(compare("hello", "e", "!includes")).to.be.false;
            expect(compare("hello", "llov", "!includes")).to.be.true;
            expect(compare("he2llo", 2, "!includes")).to.be.false;
            expect(compare("he2llo", 1, "!includes")).to.be.true;
            expect(compare("hello true", true, "!includes")).to.be.false;
            expect(compare("hello true", false, "!includes")).to.be.true;
            expect(compare(true, true, "!includes")).to.be.false;
            expect(compare(true, "ue", "!includes")).to.be.false;
        });
    });
});
