/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { set } from "../StorageActionExecutorSet";

describe("#set()", () => {
    describe("when passed undefined storage", () => {
        it("returns the undefined", () => {
            expect(set(undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed undefined key value", () => {
        it("returns the storage", () => {
            expect(set({ key: "value" }, undefined)).to.deep.equal({ key: "value" });
        });
    });
    describe("when passed a storage without the key", () => {
        it("sets the key on the storage", () => {
            expect(set({ one: "one" }, { key: "two", value: 2 })).to.deep.equal({ one: "one", two: 2 });
        });
    });
    describe("when passed a storage with the key", () => {
        it("overrides the key on the storage", () => {
            expect(set({ one: "one", two: "BAD" }, { key: "two", value: 2 })).to.deep.equal({ one: "one", two: 2 });
        });
    });
});
