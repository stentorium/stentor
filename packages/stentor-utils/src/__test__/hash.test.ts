/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import { hashCode, md5 } from "../hash";

describe("#md5()", () => {
    it("converts a string to a hash string", () => {
        expect(md5("hash")).to.exist;
    });
});

describe("#hashCode()", () => {
    it("converts a string to a number", () => {
        expect(hashCode("hash")).to.equal(3195150);
        expect(hashCode("")).to.equal(0);
        expect(hashCode(undefined)).to.equal(0);
    });
});
