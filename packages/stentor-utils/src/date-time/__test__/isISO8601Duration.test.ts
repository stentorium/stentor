/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { isISO8601Duration } from "../isISO8601Duration";

describe(`#${isISO8601Duration.name}()`, () => {
    it("returns the correct result", () => {
        expect(isISO8601Duration(undefined)).to.be.false;
        expect(isISO8601Duration('foo')).to.be.false;
        expect(isISO8601Duration("P")).to.be.false;
        expect(isISO8601Duration("PT")).to.be.false;
        expect(isISO8601Duration("P3MT")).to.be.false;
        expect(isISO8601Duration("P2MT30M")).to.be.true;
        expect(isISO8601Duration("P1Y")).to.be.true;
    });
});