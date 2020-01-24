/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { ContextBuilder } from "stentor-context";
import { Context, JSONDependent, Request, RequestDependent, SystemDependent } from "stentor-models";
import { LaunchRequestBuilder } from "stentor-request";
import { determine } from "../determine";

const simple: object = {
    foo: true
};

const requestDependent0: RequestDependent = {
    requestMatch: {
        name: "isNewSession",
        value: true
    }
};

const requestDependent1: RequestDependent = {
    requestMatch: {
        name: "isNewSession",
        value: false
    }
};

const jsonDependent0: JSONDependent = {
    JSONPathMatch: {
        name: "$.context.storage.foo",
        value: "bar"
    }
};

const jsonDependent1: JSONDependent = {
    JSONPathMatch: {
        name: "$.context.storage.foo",
        value: "baz"
    }
};

const systemDependent0: SystemDependent = {
    systemCondition: "ACCOUNT_LINKED"
};

/*
const jsonAndRequestDependent: JSONDependent & RequestDependent = {
    JSONPathMatch: {
        name: "$.context.storage.foo",
        value: "bar"
    },
    requestMatch: {
        name: "newSession",
        value: true
    }
}; */

describe("#determine()", () => {
    let request: Request;
    let context: Context;
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(determine(undefined, undefined, undefined)).to.be.undefined;
            expect(determine([], undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed an array with a match", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            context = new ContextBuilder()
                .withStorage({
                    createdTimestamp: 1234,
                    foo: "bar"
                })
                .build();
        });
        it("returns the match", () => {
            expect(determine([requestDependent0, simple, jsonDependent1], request, context)).to.equal(
                requestDependent0
            );
            expect(determine([jsonDependent0, simple], request, context)).to.equal(jsonDependent0);
        });
    });
    describe("when passed an array without matches but a simple object", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            context = new ContextBuilder().build();
        });
        it("returns the simple object", () => {
            expect(determine([simple, requestDependent1], request, context)).to.equal(simple);
        });
    });
    describe("when passed an array without a match", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            context = new ContextBuilder().build();
        });
        it("returns undefined", () => {
            expect(determine([requestDependent1], request, context)).to.be.undefined;
            expect(determine([systemDependent0], request, context)).to.be.undefined;
        });
    });
    describe("when passed more than one match", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            context = new ContextBuilder()
                .withStorage({
                    createdTimestamp: 1234,
                    foo: "bar"
                })
                .build();
        });
        it("returns the match", () => {
            expect(determine([requestDependent0, jsonDependent0, simple], request, context)).to.equal(
                requestDependent0
            );
        });
    });
    xdescribe("when passed responses with more than one possible context", () => {
        // TODO: We want to support this at some point however we need to figure out
        // how to do ORs and ANDs
    });
});
