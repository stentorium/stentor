/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Entity, SlotType } from "stentor-models";
import { isEntity, isSlotType } from "../Guards";

const ENTITY: Entity = {
    appId: "appId",
    entityId: "entityId",
    displayName: "Entity ID",
    values: []
};

const SLOT_TYPE: SlotType = {
    name: "slotType"
};

describe("#isEntity()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isEntity(undefined)).to.be.false;
        });
    });
    describe("when pass an entity", () => {
        it("returns true", () => {
            expect(isEntity(ENTITY)).to.be.true;
        });
    });
    describe("when pass a slot type", () => {
        it("returns false", () => {
            expect(isEntity(SLOT_TYPE)).to.be.false;
        });
    });
});

describe("#isSlotType()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isSlotType(undefined)).to.be.false;
        });
    });
    describe("when pass an entity", () => {
        it("returns false", () => {
            expect(isSlotType(ENTITY)).to.be.false;
        });
    });
    describe("when pass a slot type", () => {
        it("returns true", () => {
            expect(isSlotType(SLOT_TYPE)).to.be.true;
        });
    });
});
