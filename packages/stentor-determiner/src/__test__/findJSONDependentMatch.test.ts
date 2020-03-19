/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { ContextBuilder } from "stentor-context";
import { Context, IntentRequest, JSONDependent, RequestSlot, Storage } from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";
import { findJSONDependentMatch } from "../findJSONDependentMatch";

const slot1: RequestSlot = {
    name: "slot1",
    value: "1"
};

const slot2: RequestSlot = {
    name: "slot2",
    value: "2"
};

const storage1: Storage = {
    createdTimestamp: 12345,
    key1: "value1"
};

const storage2: Storage = {
    createdTimestamp: 12345,
    key2: 2
};

const context1: Context = new ContextBuilder().withStorage(storage1).build();
const context2: Context = new ContextBuilder().withStorage(storage2).build();

const intentRequest1: IntentRequest = new IntentRequestBuilder()
    .withIntentId("intentId")
    .withSlots({ ["slot1"]: slot1 })
    .build();
const intentRequest2: IntentRequest = new IntentRequestBuilder()
    .withIntentId("intentId")
    .withSlots({ ["slot2"]: slot2 })
    .build();

const path1: JSONDependent = {
    JSONPathMatch: {
        name: "$.context.storage.key1",
        value: "value1",
        operation: "==="
    }
};

const path2: JSONDependent = {
    JSONPathMatch: {
        name: "$.request.slots.slot2.value",
        value: 2,
        operation: "=="
    }
};

const path3: JSONDependent = {
    JSONPathMatch: {
        name: "$.very.bad.request",
        value: 2,
        operation: "==="
    }
};

describe("#findJSONDependentMath()", () => {
    describe("when passed undefined paths", () => {
        it("returns undefined", () => {
            expect(findJSONDependentMatch(undefined, intentRequest1, context1)).to.be.undefined;
        });
    });
    describe("when passed undefined request", () => {
        it("returns undefined", () => {
            expect(findJSONDependentMatch([path1], undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed paths without a match", () => {
        it("returns undefined", () => {
            expect(findJSONDependentMatch([path1], intentRequest2, context2)).to.be.undefined;
            expect(findJSONDependentMatch([path2], intentRequest1, context1)).to.be.undefined;
            expect(findJSONDependentMatch([path3, path2], intentRequest1, context1)).to.be.undefined;
        });
    });
    describe("when passed paths with a match", () => {
        it("returns the match", () => {
            expect(findJSONDependentMatch([path1], intentRequest1, context1)).to.equal(path1);
            expect(findJSONDependentMatch([path2], intentRequest2, context2)).to.equal(path2);
        });
    });
});
