/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { isHandler, } from "../isHandler";

const appId = "appId";
const intentId = "intentId";
const organizationId = "organizationId";

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
