/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { getSlotName } from "../getSlotName";

describe(`#${getSlotName.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(getSlotName(undefined)).to.be.undefined;
        });
    });
    describe("when passed strings", () => {
        it("returns the correct value", () => {
            expect(getSlotName("foo")).to.be.undefined;
            expect(getSlotName("${foo}")).to.equal("foo");
            expect(getSlotName("{-|foo}")).to.equal("foo");
            expect(getSlotName("{foo}")).to.equal("foo");
        });
    });
});
