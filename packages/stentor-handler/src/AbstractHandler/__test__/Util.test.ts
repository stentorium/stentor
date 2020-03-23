/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { RequestSlotMap, Slot, SlotTypeMap } from "stentor-models";
import { IntentRequestBuilder, LaunchRequestBuilder } from "stentor-request";
import { getSlotType, getMatchedSlotData } from "../Util";

describe("#getSlotType()", () => {
    const slots = [{ name: "SLOT", type: "TYPE" }, { name: "SLOT0", type: "TYPE0" }];
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(getSlotType(undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed a slots with a potential match", () => {
        it("returns the slot", () => {
            expect(getSlotType("SLOT0", slots)).to.equal("TYPE0");
        });
    });
    describe("when passed slots without a match", () => {
        it("returns undefined", () => {
            expect(getSlotType("SLOT1", slots)).to.be.undefined;
        });
    });
});

describe("#getMatchedSlotData()", () => {
    const slotName = "SLOT";
    const slotType = "TYPE";
    const slots: Slot[] = [{ name: slotName, type: slotType }, { name: "SLOT0", type: "TYPE0" }];
    const slotTypeMap: SlotTypeMap<string> = {
        [slotType]: {
            name: slotType,
            values: [
                {
                    name: "utterance",
                    data: "data"
                },
                {
                    name: "synonym",
                    data: "synonym"
                },
                {
                    name: "another utterance",
                    data: "another data"
                }
            ]
        }
    };
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(getMatchedSlotData(undefined, undefined, undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed a LaunchRequest", () => {
        it("returns undefined", () => {
            const request = new LaunchRequestBuilder().build();
            expect(getMatchedSlotData(request, slotName, slots, slotTypeMap)).to.be.undefined;
        });
    });
    describe("when passed an IntentRequest", () => {
        describe("without slots", () => {
            it("returns undefined", () => {
                const request = new IntentRequestBuilder().build();
                expect(getMatchedSlotData(request, slotName, slots, slotTypeMap)).to.be.undefined;
            });
        });
        describe("without slot id or value", () => {
            it("returns undefined", () => {
                const requestSlots: RequestSlotMap = {};
                requestSlots[slotName] = {
                    name: slotName,
                    value: undefined
                };
                const request = new IntentRequestBuilder().withSlots(requestSlots).build();
                expect(getMatchedSlotData(request, slotName, slots, slotTypeMap)).to.be.undefined;
            });
        });
        describe("without matchable slot type", () => {
            it("returns undefined", () => {
                const requestSlots: RequestSlotMap = {};
                const UNMATCHED = "UNMATCHED_TYPE";
                requestSlots[UNMATCHED] = {
                    name: UNMATCHED,
                    value: "unknown"
                };
                const request = new IntentRequestBuilder().withSlots(requestSlots).build();
                expect(getMatchedSlotData(request, slotName, slots, slotTypeMap)).to.be.undefined;
            });
        });
        describe("without matchable slot utterance", () => {
            it("returns undefined", () => {
                const requestSlots: RequestSlotMap = {};
                requestSlots[slotName] = {
                    name: slotName,
                    value: "unknown"
                };
                const request = new IntentRequestBuilder().withSlots(requestSlots).build();
                expect(getMatchedSlotData(request, slotName, slots, slotTypeMap)).to.be.undefined;
            });
        });
        describe("with matchable slot", () => {
            it("returns the data", () => {
                const requestSlots: RequestSlotMap = {};
                requestSlots[slotName] = {
                    name: slotName,
                    value: "utterance"
                };
                const request = new IntentRequestBuilder().withSlots(requestSlots).build();
                expect(getMatchedSlotData(request, slotName, slots, slotTypeMap)).to.equal("data");
            });
        });
        describe("with matchable slot raw value", () => {
            it("returns the data for the id", () => {
                const requestSlots: RequestSlotMap = {};
                requestSlots[slotName] = {
                    name: slotName,
                    value: "unmatched",
                    rawValue: "synonym"
                };
                const request = new IntentRequestBuilder().withSlots(requestSlots).build();
                expect(getMatchedSlotData(request, slotName, slots, slotTypeMap)).to.equal("synonym");
            });
        });
        describe("with matchable value and raw value", () => {
            it("returns the data for the id", () => {
                const requestSlots: RequestSlotMap = {};
                requestSlots[slotName] = {
                    name: slotName,
                    value: "utterance",
                    rawValue: "synonym"
                };
                const request = new IntentRequestBuilder().withSlots(requestSlots).build();
                expect(getMatchedSlotData(request, slotName, slots, slotTypeMap)).to.equal("data");
            });
        });
        describe("with un-matchable raw value but matchable value", () => {
            it("returns the data for the value", () => {
                const requestSlots: RequestSlotMap = {};
                requestSlots[slotName] = {
                    name: slotName,
                    value: "utterance",
                    rawValue: "unmatched"
                };
                const request = new IntentRequestBuilder().withSlots(requestSlots).build();
                expect(getMatchedSlotData(request, slotName, slots, slotTypeMap)).to.equal("data");
            });
        });
    });
});