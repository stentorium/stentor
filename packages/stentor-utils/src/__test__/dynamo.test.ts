/*! Copyright (c) 2026, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import { estimateSize } from "../dynamo";

/**
 * DynamoDB item size, by the published rules: attribute names count their UTF-8 bytes, strings
 * their UTF-8 bytes, numbers one byte per two significant digits plus one, booleans and null one
 * byte, binary its raw length, and a list or map three bytes plus its contents.
 */
describe("#estimateSize()", () => {
    it("counts attribute names and string bytes", () => {
        expect(estimateSize({ a: "b" })).to.equal(2);
        expect(estimateSize({ name: "Crème" })).to.equal(4 + 6);
        expect(estimateSize({})).to.equal(0);
    });
    it("counts numbers by significant digits", () => {
        expect(estimateSize({ n: 1234 })).to.equal(1 + 3);
        expect(estimateSize({ n: 1 })).to.equal(1 + 2);
        expect(estimateSize({ n: 0 })).to.equal(1 + 1);
        expect(estimateSize({ n: -1.50 })).to.equal(1 + 2);
        expect(estimateSize({ n: 1e21 })).to.equal(1 + 2);
    });
    it("counts booleans, null and binary", () => {
        expect(estimateSize({ t: true, f: false, z: null })).to.equal(3 + 3);
        expect(estimateSize({ b: Buffer.from("abcd") })).to.equal(1 + 4);
    });
    it("adds three bytes for each list or map, plus their contents", () => {
        expect(estimateSize({ l: [] })).to.equal(1 + 3);
        expect(estimateSize({ l: ["ab", 1] })).to.equal(1 + 3 + 2 + 2);
        expect(estimateSize({ m: { a: "b" } })).to.equal(1 + 3 + 2);
        expect(estimateSize({ m: { l: [{ k: "v" }] } })).to.equal(1 + 3 + 1 + 3 + 3 + 2);
    });
    it("ignores undefined, which DynamoDB never stores", () => {
        expect(estimateSize({ u: undefined })).to.equal(0);
    });
});
