/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { RequestSlot, RequestSlotMap, SlotDependent } from "stentor-models";
import { findSlotDependentMatch } from "../findSlotDependentMatch";

const slot1: RequestSlot = {
    name: "slot1",
    value: "1"
};

const slot2: RequestSlot = {
    name: "slot2",
    value: "slot2"
};

const slots1: RequestSlotMap = { ["slot1"]: slot1 };
const slots2: RequestSlotMap = { ["slot2"]: slot2 };

const path1: SlotDependent = {
    slotMatch: {
        name: "slot1",
        value: "1",
        operation: "==="
    }
};

const path2: SlotDependent = {
    slotMatch: {
        name: "slot2",
        value: 2,
        operation: "==="
    }
};

const path1WithArray: SlotDependent = {
    slotMatch: {
        name: "slot1",
        /* tslint:disable:no-magic-numbers */
        value: [1, "2", 4],
        /* tslint:enable:no-magic-numbers */
        operation: "=="
    }
};

describe("#findSlotDependentMatch()", () => {
    describe("when passed undefined paths", () => {
        it("returns undefined", () => {
            expect(findSlotDependentMatch(undefined, slots1)).to.be.undefined;
        });
    });
    describe("when passed undefined request", () => {
        it("returns undefined", () => {
            expect(findSlotDependentMatch([path1], undefined)).to.be.undefined;
        });
    });
    describe("when passed paths without a match", () => {
        it("returns undefined", () => {
            expect(findSlotDependentMatch([path1], slots2)).to.be.undefined;
            expect(findSlotDependentMatch([path2], slots2)).to.be.undefined;
        });
    });
    describe("when passed paths with a match", () => {
        it("returns the match", () => {
            expect(findSlotDependentMatch([path1], slots1)).to.equal(path1);
        });
    });
    describe("when passed a path that has an array of values", () => {
        it("returns the match", () => {
            expect(findSlotDependentMatch([path1WithArray], slots1)).to.equal(path1WithArray);
        });
    });
});
