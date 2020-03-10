/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { SlotDependent, RequestSlotMap } from "stentor-models";
import { SlotConditionalCheck } from "../SlotConditionalCheck";


const obj: SlotDependent = {
    slotMatch: {
        name: "foo",
        value: "bar"
    }
};

const slotsWithFooAsBar: RequestSlotMap = {
    foo: {
        name: "foo",
        value: "bar"
    },
    baz: {
        name: "baz",
        value: ""
    }
};

describe(`${SlotConditionalCheck.name}`, () => {
    describe(`test`, () => {
        it("returns the correct result", () => {
            expect(SlotConditionalCheck(slotsWithFooAsBar).test(undefined)).to.be.false;
            expect(SlotConditionalCheck(slotsWithFooAsBar).test(obj)).to.be.true;
        });
    });
    describe('check', () => {
        it("returns the correct result", () => {
            expect(SlotConditionalCheck(slotsWithFooAsBar).check(obj)).to.be.true;
        });
    });
    describe(`functions`, () => {
        it('returns the correct result', () => {
            // 0th is hasSlot
            const hasSlot = SlotConditionalCheck(slotsWithFooAsBar).functions[0];
            expect(hasSlot("foo")).to.be.true;
            expect(hasSlot("bar")).to.be.false;
            expect(hasSlot("baz")).to.be.false;
            // 1th is slotDoesNotExist
            const slotDoesNotExist = SlotConditionalCheck(slotsWithFooAsBar).functions[1];
            expect(slotDoesNotExist("foo")).to.be.false;
            expect(slotDoesNotExist("bar")).to.be.true;
            expect(slotDoesNotExist("baz")).to.be.true;
            // Slot Equals
            const slotEquals = SlotConditionalCheck(slotsWithFooAsBar).functions[2];
            expect(slotEquals("foo", "bar")).to.be.true;
            expect(slotEquals("baz", "")).to.be.true;
            expect(slotEquals("bar", "bar")).to.be.false;
            // Slot exists
            const slotExists = SlotConditionalCheck(slotsWithFooAsBar).functions[3];
            expect(slotExists("foo")).to.be.true;

        });
    });
});