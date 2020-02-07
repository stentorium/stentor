/*! Copyright (c) 2019, XAPPmedia */
import { Slot, SlotTypeMap } from "stentor-models";
import { expect } from "chai";
import { mergeSlots, MergeSlotsResult, mergeSlotTypeMaps } from "../merge";

const slots: Slot[] = [
    {
        name: "One",
        type: "A"
    },
    {
        name: "Two",
        type: "A"
    }
];

const slotsNoOverlap: Slot[] = [
    {
        name: "Three",
        type: "B"
    },
    {
        name: "Four",
        type: "B"
    }
];

const slotsWithOverlap: Slot[] = [
    {
        name: "Two",
        type: "A"
    },
    {
        name: "Five",
        type: "C"
    }
];

describe("#mergeSlots()", () => {
    let mergedSlots: Slot[];
    let results: MergeSlotsResult;
    describe("when passed undefined primary", () => {
        it("returns the secondary", () => {
            mergedSlots = mergeSlots(undefined, slots);
            expect(mergedSlots).to.equal(slots);
        });
    });
    describe("when passed undefined primary and secondary", () => {
        it("returns undefined", () => {
            mergedSlots = mergeSlots(undefined, undefined);
            expect(mergedSlots).to.be.undefined;
        });
    });
    describe("when passed two slots without overlap", () => {
        beforeEach(() => {
            results = {};
            mergedSlots = mergeSlots(slots, slotsNoOverlap, results);
        });
        it("combines them", () => {
            const length = slots.length + slotsNoOverlap.length;
            expect(mergedSlots).to.have.length(length);
        });
        it("sets the results", () => {
            expect(results.totalAddedSlots).to.equal(2);
            expect(results.totalIgnoredSlots).to.equal(0);
        });
    });
    describe("when passed two slots with overlap", () => {
        beforeEach(() => {
            results = {};
            mergedSlots = mergeSlots(slots, slotsWithOverlap, results);
        });
        it("combines them, throwing out the overlapped", () => {
            const length = slots.length + slotsWithOverlap.length - 1; // 1 is overlapped
            expect(mergedSlots).to.have.length(length);
        });
        it("sets the results", () => {
            expect(results.totalAddedSlots).to.equal(1);
            expect(results.totalIgnoredSlots).to.equal(1);
        });
    });
});

const slotTypeMap: SlotTypeMap = {
    ["ONE"]: {
        name: "ONE",
        values: [
            {
                name: "won"
            },
            {
                name: "one"
            }
        ]
    }
};

const slotTypeMapNoOverlap: SlotTypeMap = {
    ["TWO"]: {
        name: "TWO",
        values: [
            {
                name: "two"
            },
            {
                name: "too"
            }
        ]
    }
};

const slotTypeMapWithOverlap: SlotTypeMap = {
    ["ONE"]: {
        name: "ONE",
        values: [
            {
                name: "one"
            },
            {
                name: "wun"
            }
        ]
    }
};

describe("#mergeSlotTypeMap()", () => {
    let mergedMap: SlotTypeMap;
    describe("when passed an undefined primary", () => {
        it("returns the secondary", () => {
            mergedMap = mergeSlotTypeMaps(undefined, slotTypeMap);
            expect(mergedMap).to.equal(slotTypeMap);
        });
    });
    describe("when passed an undefined primary and secondary", () => {
        it("returns undefined", () => {
            mergedMap = mergeSlotTypeMaps(undefined, undefined);
            expect(mergedMap).to.be.undefined;
        });
    });
    describe("when passed two maps that don't overlap", () => {
        it("merges them", () => {
            mergedMap = mergeSlotTypeMaps(slotTypeMap, slotTypeMapNoOverlap);
            expect(Object.keys(mergedMap)).to.have.length(2);
        });
    });
    describe("when passed two maps that overlap", () => {
        it("merges them", () => {
            mergedMap = mergeSlotTypeMaps(slotTypeMap, slotTypeMapWithOverlap);
            expect(Object.keys(mergedMap)).to.have.length(1);
            expect(mergedMap.ONE).to.exist;
            const one = mergedMap.ONE;
            /* tslint:disable:no-magic-numbers */
            expect(one.values).to.have.length(3);
            expect(one.values[0].name).to.equal("won");
            expect(one.values[1].name).to.equal("one");
            expect(one.values[2].name).to.equal("wun");
            /* tslint:enable:no-magic-numbers */
        });
    });
});
