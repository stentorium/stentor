/*! Copyright (c) 2021, XAPPmedia */
import { expect } from "chai";

import { getSlotValue, slot } from "../getSlotValue";

describe(`#${getSlotValue.name}()`, () => {
    describe("when it exists", () => {
        it("returns the value", () => {
            expect(getSlotValue({
                bar: {
                    name: "bar",
                    value: "bar"
                }
            }, "bar")).to.equal("bar");
        });
    });
    describe("when it doesn't exist", () => {
        it("returns undefined", () => {
            expect(getSlotValue({}, "foo")).to.be.undefined;
            expect(getSlotValue({
                bar: {
                    name: "bar",
                    value: "bar"
                }
            }, "foo")).to.be.undefined;
        });
    });
});

describe(`#${slot.name}()`, () => {
    describe("when value exists", () => {
        it("returns the value", () => {
            expect(slot({
                bar: {
                    name: "bar",
                    value: "bar"
                }
            }, "bar")).to.equal("bar");
        });
    });
    describe("when value doesn't exist", () => {
        it("returns an empty string", () => {
            expect(slot({
                bar: {
                    name: "bar",
                    value: "bar"
                }
            }, "foo")).to.equal("");
        });
    });
})
