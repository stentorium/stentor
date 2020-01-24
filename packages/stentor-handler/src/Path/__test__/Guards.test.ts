/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { ExecutablePath, SlotDependentPath } from "stentor-models";
import { isExecutablePath } from "../Guards";

const path1: SlotDependentPath = {
    intentId: "intentId",
    slotMatch: {
        name: "slot1",
        value: 1,
        operation: "==="
    }
};

const path2: ExecutablePath = {
    intentId: "intentId"
};

describe("#isExecutablePath()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isExecutablePath(undefined)).to.be.false;
        });
    });
    describe("when passed a slot dependent path", () => {
        it("returns true", () => {
            expect(isExecutablePath(path1)).to.be.true;
        });
    });
    describe("when passed a simple path", () => {
        it("returns false", () => {
            expect(isExecutablePath(path2)).to.be.true;
        });
    });
});
