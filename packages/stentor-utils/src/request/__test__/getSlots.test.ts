/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { IntentRequestBuilder } from "stentor-request";
import { getSlots } from "../getSlots";

describe("#getSlots()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(getSlots(undefined)).to.be.undefined;
        });
    });
    describe("when passed a request with slots", () => {
        it("returns the slots", () => {
            it("returns the slots", () => {
                const slots = {
                    ["hello"]: {
                        name: "hello",
                        value: "world"
                    }
                };
                const request = new IntentRequestBuilder().withSlots(slots).build();
                expect(getSlots(request)).to.equal(slots);
            });
        });
    });
    describe("when passed a request without slots", () => {
        it("returns undefined", () => {
            const request = new IntentRequestBuilder().build();
            expect(getSlots(request)).to.equal(undefined);
        });
    });
});
