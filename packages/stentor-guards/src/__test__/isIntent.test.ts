/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { isIntent } from "../isIntent";

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