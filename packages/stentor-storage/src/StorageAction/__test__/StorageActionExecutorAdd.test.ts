/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { add } from "../StorageActionExecutorAdd";

describe("#set()", () => {
    describe("when passed undefined storage", () => {
        it("returns the undefined", () => {
            expect(add(undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed undefined key value", () => {
        it("returns the storage", () => {
            expect(add({ key: "value" }, undefined)).to.deep.equal({ key: "value" });
        });
    });
    describe("when passed a value with unexpected type", () => {
        it("returns the storage", () => {
            expect(add({ key: "value" }, { key: "foo", value: "bar" })).to.deep.equal({ key: "value" });
            expect(add({ key: "value" }, { key: "foo", value: false })).to.deep.equal({ key: "value" });
            expect(add({ key: "value" }, { key: "foo", value: {} })).to.deep.equal({ key: "value" });
        });
    });
    describe("when passed a storage without the key", () => {
        it("sets the value on the storage for the key", () => {
            expect(add({ one: "one" }, { key: "two", value: 2 })).to.deep.equal({ one: "one", two: 2 });
        });
    });
    describe("when passed a storage with the key", () => {
        it("adds the value to the key on the storage", () => {
            expect(add({ one: "one", two: 1 }, { key: "two", value: 2 })).to.deep.equal({ one: "one", two: 3 });
            expect(add({ one: "one", two: 0 }, { key: "two", value: 2 })).to.deep.equal({ one: "one", two: 2 });
        });
    });
});
