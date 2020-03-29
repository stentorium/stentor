/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { getDurationFrom } from "../getDurationFrom";

describe(`#${getDurationFrom.name}()`, () => {
    describe("when passed a string that is not a ISO-8601 duration", () => {
        it("returns undefined", () => {
            expect(getDurationFrom(undefined)).to.be.undefined;
            expect(getDurationFrom("foo")).to.be.undefined;
        });
    });
    describe("when passed a proper duration string", () => {
        it("converts it to a duration", () => {
            expect(getDurationFrom("PT1M30S")).to.deep.equal({
                amount: 1.5,
                format: "minutes"
            });
            expect(getDurationFrom("P2Y")).to.deep.equal({
                amount: 2,
                format: "years"
            });
            expect(getDurationFrom("P4Y6M")).to.deep.equal({
                amount: 4.5,
                format: "years"
            });
        });
    });
});