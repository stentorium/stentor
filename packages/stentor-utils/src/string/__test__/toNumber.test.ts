/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { toNumber } from "../toNumber";

/*tslint:disable:no-magic-numbers*/
describe("#toNumber()", () => {
    describe("when passed a number", () => {
        it("returns the number", () => {
            expect(toNumber(33)).to.equal(33);
            expect(toNumber(44.44)).to.equal(44.44);
        });
    });
    describe("when passed a number as a string", () => {
        it("returns the number", () => {
            expect(toNumber("33")).to.equal(33);
            expect(toNumber("55.05")).to.equal(55.05);
            expect(toNumber("23.020")).to.equal(23.02);
        });
    });
    describe("when passed a string that is not a number", () => {
        it("returns the number", () => {
            expect(toNumber("foo")).to.be.undefined;
            expect(toNumber("55.05bar")).to.be.undefined;
            expect(toNumber("baz")).to.be.undefined;
        });
    });
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(toNumber(undefined)).to.be.undefined;
        });
    });
});
