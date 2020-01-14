/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { ConversationHandler } from "@xapp/stentor-handler";
import { Content, Context, Data, HandlerDelegates, Request } from "stentor-models";
import { isDelegatingHandlersMap, isHandlersArray, isHandlersKeyValue } from "../Guards";

const DELEGATES: HandlerDelegates = {
    async handleRequest(request: Request, context: Context, content: Content, data: Data) {}
};

describe("#isDelegatingHandlersMap()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isDelegatingHandlersMap(undefined)).to.be.false;
        });
    });
    describe("when passed bad input", () => {
        it("returns false", () => {
            expect(isDelegatingHandlersMap({})).to.be.false;
            expect(isDelegatingHandlersMap([])).to.be.false;
            expect(isDelegatingHandlersMap({ foo: 1 } as any)).to.be.false;
        });
    });
    describe("when passed a handlers array", () => {
        it("returns false", () => {
            expect(isDelegatingHandlersMap([ConversationHandler])).to.be.false;
        });
    });
    describe("when passed a handler key value", () => {
        it("returns false", () => {
            expect(isDelegatingHandlersMap({ ConversationHandler })).to.be.false;
        });
    });
    describe("when passed a map of handler delegates", () => {
        it("returns true", () => {
            expect(isDelegatingHandlersMap({ foo: DELEGATES })).to.be.true;
        });
    });
});

describe("#isHandlersKeyValue()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isHandlersKeyValue(undefined)).to.be.false;
        });
    });
    describe("when passed bad input", () => {
        it("returns false", () => {
            expect(isHandlersKeyValue({})).to.be.false;
            expect(isHandlersKeyValue([])).to.be.false;
            expect(isHandlersKeyValue({ foo: 1 } as any)).to.be.false;
        });
    });
    describe("when passed a handlers array", () => {
        it("returns false", () => {
            expect(isHandlersKeyValue([ConversationHandler])).to.be.false;
        });
    });
    describe("when passed a handler key value", () => {
        it("returns true", () => {
            expect(isHandlersKeyValue({ ConversationHandler })).to.be.true;
        });
    });
    describe("when passed a map of handler delegates", () => {
        it("returns false", () => {
            expect(isHandlersKeyValue({ foo: DELEGATES })).to.be.false;
        });
    });
});

describe("#isHandlersArray()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isHandlersArray(undefined)).to.be.false;
        });
    });
    describe("when passed bad input", () => {
        it("returns false", () => {
            expect(isHandlersArray({})).to.be.false;
            expect(isHandlersArray({ foo: 1 } as any)).to.be.false;
        });
    });
    describe("when passed a handlers array", () => {
        it("returns true", () => {
            expect(isHandlersArray([ConversationHandler])).to.be.true;
        });
    });
    describe("when passed a handler key value", () => {
        it("returns false", () => {
            expect(isHandlersArray({ ConversationHandler })).to.be.false;
        });
    });
    describe("when passed a map of handler delegates", () => {
        it("returns false", () => {
            expect(isHandlersArray({ foo: DELEGATES })).to.be.false;
        });
    });
});
