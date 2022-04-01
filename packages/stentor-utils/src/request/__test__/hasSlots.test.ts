/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { IntentRequest, LaunchRequest, RequestSlotMap } from "stentor-models";
import { IntentRequestBuilder, LaunchRequestBuilder } from "stentor-request";
import { hasSlots } from "../hasSlots";

describe("#hasSlots()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(hasSlots(undefined)).to.be.false;
        });
    });
    describe("for an IntentRequest", () => {
        let request: IntentRequest;
        let slots: RequestSlotMap;
        describe("with slots", () => {
            describe("that have values", () => {
                beforeEach(() => {
                    slots = {
                        ["hello"]: {
                            name: "hello",
                            value: "world"
                        }
                    };
                    request = new IntentRequestBuilder().withSlots(slots).build();
                });
                it("returns true", () => {
                    expect(hasSlots(request)).to.be.true;
                });
            });
            describe("that is empty", () => {
                beforeEach(() => {
                    slots = {};
                    request = new IntentRequestBuilder().withSlots(slots).build();
                });
                it("returns false", () => {
                    expect(hasSlots(request)).to.be.false;
                });
            });
        });
        describe("without slots", () => {
            beforeEach(() => {
                request = new IntentRequestBuilder().build();
            });
            it("returns false", () => {
                expect(hasSlots(request)).to.be.false;
            });
        });
    });
    describe("for a LaunchRequest", () => {
        let request: LaunchRequest;
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
        });
        it("returns false", () => {
            expect(hasSlots(request)).to.be.false;
        });
    });
});
