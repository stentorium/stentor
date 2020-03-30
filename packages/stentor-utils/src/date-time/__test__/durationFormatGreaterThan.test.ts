/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { durationFormatGreaterThan } from "../durationFormatGreaterThan";

describe(`#${durationFormatGreaterThan.name}()`, () => {
    it("returns the correct result", () => {
        expect(durationFormatGreaterThan(undefined, "m")).to.be.true;
        expect(durationFormatGreaterThan("year", "m")).to.be.true;
        expect(durationFormatGreaterThan("m", "s")).to.be.true;
        expect(durationFormatGreaterThan("M", "m")).to.be.true;
        expect(durationFormatGreaterThan("year", undefined)).to.be.false;
        expect(durationFormatGreaterThan("m", "M")).to.be.false;
        expect(durationFormatGreaterThan("m", "m")).to.be.false;
        expect(durationFormatGreaterThan(undefined, undefined)).to.be.false;
    });
});