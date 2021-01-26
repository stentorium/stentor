/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { IntentRequest, SlotDependent, RequestSlotMap } from "stentor-models";
import { hasSlot, SlotConditionalCheck, slotDoesNotExist, slotExists, slotEquals } from "../SlotConditionalCheck";

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

const request: IntentRequest = {
    intentId: "intentId",
    type: "INTENT_REQUEST",
    slots: slotsWithFooAsBar,
    sessionId: "sessionId",
    userId: "userId"
}

describe(`#${hasSlot.name}()`, () => {
    it('returns the correct result', () => {
        expect(hasSlot(undefined, "foo")).to.be.false;
        expect(hasSlot(slotsWithFooAsBar, "baz")).to.be.false;
        expect(hasSlot(slotsWithFooAsBar, "foo")).to.be.true;
        expect(hasSlot(slotsWithFooAsBar, "bar")).to.be.false;
    });
});

describe(`#${slotExists.name}()`, () => {
    it('returns the correct result', () => {
        expect(slotExists(undefined, "foo")).to.be.false;
        expect(slotExists(slotsWithFooAsBar, "baz")).to.be.false;
        expect(slotExists(slotsWithFooAsBar, "foo")).to.be.true;
        expect(slotExists(slotsWithFooAsBar, "bar")).to.be.false;
    });
});

describe(`#${slotDoesNotExist.name}()`, () => {
    it('returns the correct result', () => {
        expect(slotDoesNotExist(undefined, "foo")).to.be.true;
        expect(slotDoesNotExist(slotsWithFooAsBar, "baz")).to.be.true;
        expect(slotDoesNotExist(slotsWithFooAsBar, "foo")).to.be.false;
        expect(slotDoesNotExist(slotsWithFooAsBar, "bar")).to.be.true;
    });
});

describe(`#${slotEquals.name}()`, () => {
    it('returns the correct result', () => {
        expect(slotEquals(undefined, "foo", "bar")).to.be.false;
        expect(slotEquals(slotsWithFooAsBar, "baz", "bar")).to.be.false;
        expect(slotEquals(slotsWithFooAsBar, "foo", "bar")).to.be.true;
        expect(slotEquals(slotsWithFooAsBar, "bar", "foo")).to.be.false;
    });
});

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
    describe('when passed a request', () => {
        it('returns the correct result', () => {
            const hasSlot = SlotConditionalCheck(request).functions[0];
            expect(hasSlot("foo")).to.be.true;
            expect(hasSlot("bar")).to.be.false;
            expect(hasSlot("baz")).to.be.false;
        });
    });
});