/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { subtract } from "../StorageActionExecutorSubtract";

describe("#subtract()", () => {
    describe("when passed undefined storage", () => {
        it("returns the undefined", () => {
            expect(subtract(undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed undefined key value", () => {
        it("returns the storage", () => {
            expect(subtract({ key: "value" }, undefined)).to.deep.equal({ key: "value" });
        });
    });
    describe("when passed a value with unexpected type", () => {
        it("returns the storage", () => {
            expect(subtract({ key: "value" }, { key: "foo", value: "bar" })).to.deep.equal({ key: "value" });
            expect(subtract({ key: "value" }, { key: "foo", value: false })).to.deep.equal({ key: "value" });
            expect(subtract({ key: "value" }, { key: "foo", value: {} })).to.deep.equal({ key: "value" });
        });
    });
    describe("when passed a storage without the key", () => {
        it("sets the value on the storage for the key", () => {
            expect(subtract({ one: "one" }, { key: "two", value: 2 })).to.deep.equal({ one: "one", two: -2 });
        });
    });
    describe("when passed a storage with the key", () => {
        it("subtracts the value to the key on the storage", () => {
            expect(subtract({ one: "one", two: 1 }, { key: "two", value: 2 })).to.deep.equal({ one: "one", two: -1 });
            expect(subtract({ one: "one", two: 0 }, { key: "two", value: 2 })).to.deep.equal({ one: "one", two: -2 });
            expect(subtract({ one: "one", two: 3 }, { key: "two", value: 2 })).to.deep.equal({ one: "one", two: 1 });
        });
    });
});
