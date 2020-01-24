/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { isHandler, isIntent } from "../Guards";

const appId = "appId";
const intentId = "intentId";
const organizationId = "organizationId";

describe(`#${isIntent.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isIntent(undefined)).to.be.false;
        });
    });
    it("returns the correct result", () => {
        // tslint:disable-next-line:no-null-keyword
        expect(isIntent({ appId, intentId, organizationId, utterancePatterns: null })).to.be.true;
        expect(isIntent({ appId, intentId, organizationId, utterancePatterns: ["foo"] })).to.be.true;
        expect(isIntent({ appId, intentId, organizationId, utterancePatterns: ["foo"], type: "bar" })).to.be.true;
        expect(isIntent({ appId, intentId, organizationId, utterancePatterns: [] })).to.be.true;
    });
});

describe(`#${isHandler.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isHandler(undefined)).to.be.false;
        });
    });
    it("returns the correct result", () => {
        // tslint:disable-next-line:no-null-keyword
        expect(isHandler({ appId, intentId, organizationId, utterancePatterns: ["foo"], type: null })).to.be.false;
        expect(isHandler({ appId, intentId, organizationId, utterancePatterns: ["foo"], type: undefined })).to.be.false;
        expect(isHandler({ appId, intentId, organizationId, utterancePatterns: ["foo"] })).to.be.false;
        expect(isHandler({ appId, intentId, organizationId, utterancePatterns: ["foo"], type: "bar" })).to.be.true;
    });
});
