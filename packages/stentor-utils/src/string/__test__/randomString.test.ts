/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import { randomString } from "../randomString";
describe("#randomString()", () => {
    it("returns a string the specified length", () => {
        expect(randomString(10)).to.have.length(10);
    });
    it("it does not return the same string twice", () => {
        const first = randomString(3);
        const second = randomString(3);
        expect(first).to.not.equal(second);
    });
    it("it throws an error for a zero length string", () => {
        expect(randomString.bind(this, -1)).to.throw(Error, "Random string can not have a negative length.");
    });
});
