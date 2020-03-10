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

const slot3: RequestSlot = {
    name: "slot3",
    value: ""
};

const slots1: RequestSlotMap = { ["slot1"]: slot1 };
const slots2: RequestSlotMap = { ["slot2"]: slot2 };
const slots3: RequestSlotMap = { ["slot3"]: slot3 };

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

// We want this to be defined or not an empty string
const object3: SlotDependent = {
    slotMatch: {
        name: "slot3",
        operation: "!=",
        value: ""
    }
};

// This one does not exist
// Think of this as being defined
const object4: SlotDependent = {
    slotMatch: {
        name: "slot4",
        value: "undefined"
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

describe(`#${findSlotDependentMatch.name}()`, () => {
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
    describe("when passed a map with empty string value", () => {
        it('returns the match', () => {
            // Object 3 is looking for != empty string
            expect(findSlotDependentMatch([object3], slots3)).to.be.undefined;
        });
    });
    describe('when passed != undefined for a slot that does not exist', () => {
        it('returns the match', () => {
            // Object 4 is looking for != undefined, me
            expect(findSlotDependentMatch([object4], slots3)).to.deep.equal(object4);
        });
    });
});
