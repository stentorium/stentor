/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { pruneEmpty } from "../json";

class ArrayExtension extends Array<string> {
    name: string;

    constructor() {
        super();

        Object.setPrototypeOf(this, ArrayExtension.prototype);

        this.name = "FOO";
    }
}

describe("#pruneEmpty()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(pruneEmpty(undefined)).to.equal(undefined);
        });
    });
    describe("when passed an object with 0", () => {
        it("keeps the 0", () => {
            expect(pruneEmpty({ foo: 0 })).to.deep.equal({ foo: 0 });
        });
    });
    describe("when passed an empty array", () => {
        it("keeps empty arrays", () => {
            expect(pruneEmpty({ foo: [] })).to.deep.equal({ foo: [] });
        });
    });
    describe("when passed an empty object", () => {
        it("keeps empty object", () => {
            expect(pruneEmpty({ foo: {} })).to.deep.equal({ foo: {} });
        });
    });
    describe("when passed an empty string", () => {
        it("prunes the string", () => {
            expect(pruneEmpty({ foo: "" })).to.deep.equal({});
        });
    });
    describe("when passed undefined", () => {
        it("prunes the undefined", () => {
            expect(pruneEmpty({ foo: undefined })).to.deep.equal({});
        });
    });
    describe("when passed nested undefined", () => {
        it("prunes the nested undefined", () => {
            expect(
                pruneEmpty({
                    foo: {
                        key: undefined
                    }
                })
            ).to.deep.equal({
                foo: {}
            });
        });
    });
    xdescribe("when passed a class that extends an array", () => {
        // NOTE: This test fails,
        // leaving it to document a known issue.
        it("removes the empty strings", () => {
            const arg = new ArrayExtension();
            arg.push(undefined, "bar");
            expect(arg).to.exist;
            const clone = pruneEmpty(arg);
            expect(clone).to.exist;
            expect(clone[0]).to.equal("bar");
        });
    });
});
