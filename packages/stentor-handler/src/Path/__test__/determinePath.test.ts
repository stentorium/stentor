/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { ContextBuilder } from "stentor-context";
import {
    Context,
    ExecutablePath,
    IntentRequest,
    LaunchRequest,
    PreviousHandlerPath,
    Request,
    RequestSlot,
    SlotDependentPath,
    Storage,
    StorageDependentPath
} from "stentor-models";
import { IntentRequestBuilder, LaunchRequestBuilder } from "stentor-request";
import { determinePath } from "../determinePath";

const simplePath1: ExecutablePath = {
    type: "START",
    intentId: "simplePath1"
};

const slotDependentPath1: SlotDependentPath = {
    type: "START",
    intentId: "slotDependentPath1",
    slotMatch: {
        name: "slot1",
        value: "1",
        operation: "==="
    }
};

const slot1: RequestSlot = {
    name: "slot1",
    value: "1"
};

const storageDependentPath1: StorageDependentPath = {
    type: "START",
    intentId: "slotDependentPath1",
    storageMatch: {
        name: "key1",
        value: "value1",
        operation: "==="
    }
};

const previousHandlerPath: PreviousHandlerPath = {
    previousHandler: true
};

const storage1: Storage = {
    createdTimestamp: 1234,
    key1: "value1"
};

const storageWithPreviousHandler: Storage = {
    createdTimestamp: 1234,
    key2: "value2",
    previousHandler: {
        intentId: "intentId",
        appId: "appId",
        organizationId: "organizationId",
        type: "InSessionIntent",
        content: {},
        forward: {
            ["LaunchRequest"]: [
                {
                    intentId: "externalOne"
                },
                {
                    type: "START",
                    intentId: "externalTwo",
                    storageMatch: {
                        name: "key2",
                        value: "value2"
                    }
                }
            ]
        }
    }
};

const intentRequest1: IntentRequest = new IntentRequestBuilder()
    .withIntentId("intentId")
    .withSlots({ ["slot1"]: slot1 })
    .build();
const launchRequest: LaunchRequest = new LaunchRequestBuilder().build();

const context1: Context = new ContextBuilder().withStorage(storage1).build();

describe("#determinePath()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(determinePath(undefined, undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed an array of one simple path", () => {
        it("returns the path", () => {
            expect(determinePath([simplePath1], undefined, undefined)).to.equal(simplePath1);
        });
    });
    describe("when passed an array of simple paths and a matching slot dependent path", () => {
        it("returns the slot dependent path", () => {
            expect(determinePath([simplePath1, slotDependentPath1], intentRequest1, context1)).to.equal(
                slotDependentPath1
            );
        });
    });
    describe("when passed an array of simple paths and a matching storage dependent path", () => {
        it("returns the slot dependent path", () => {
            expect(determinePath([simplePath1, storageDependentPath1], intentRequest1, context1)).to.equal(
                storageDependentPath1
            );
        });
    });
    describe("when passed an array with previous path", () => {
        let request: Request;
        let context: Context;
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            context = new ContextBuilder().withStorage(storageWithPreviousHandler).build();
        });
        it("returns the correct path", () => {
            expect(determinePath([previousHandlerPath], intentRequest1, context)).to.be.undefined;
            expect(determinePath([previousHandlerPath], request, context)).to.deep.equal({
                type: "START",
                intentId: "externalTwo",
                storageMatch: {
                    name: "key2",
                    value: "value2"
                }
            });
        });
    });
    describe("when passed an array of paths without matches", () => {
        it("returns undefined", () => {
            expect(determinePath([slotDependentPath1], launchRequest, context1)).to.be.undefined;
        });
    });
});
