/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { getSlotNames } from "../getSlotNames";

describe("#getSlotNames()", () => {
    describe("when passed invalid arguments", () => {
        it("returns an empty array", () => {
            expect(getSlotNames(undefined)).to.deep.equal([]);
            expect(getSlotNames(1 as any)).to.deep.equal([]);
            expect(getSlotNames(true as any)).to.deep.equal([]);
        });
    });
    describe("when passed a string with a slot", () => {
        it("returns the correct result", () => {
            expect(getSlotNames("hello ${name}")).to.deep.equal(["name"]);
            expect(getSlotNames("hello ${name} how are you")).to.deep.equal(["name"]);
            expect(getSlotNames("hello {-|name}")).to.deep.equal(["name"]);
            expect(getSlotNames("${name}")).to.deep.equal(["name"]);
        });
    });
    describe("when passed a string with multiple slots", () => {
        it("returns the correct result", () => {
            expect(getSlotNames("${foo} hello ${name}")).to.deep.equal(["foo", "name"]);
            expect(getSlotNames("hello ${name} how are you ${bar}")).to.deep.equal(["name", "bar"]);
            expect(getSlotNames("hello {-|name}  ${baz}")).to.deep.equal(["name", "baz"]);
            expect(getSlotNames("${name} ${baz} ${bar}")).to.deep.equal(["name", "baz", "bar"]);
        });
    });
    describe("when passed a pattern with possible dupes", () => {
        it("does not return the duplicates", () => {
            expect(
                getSlotNames(
                    "{${negative_modifier} |${yes_no} |}{${negative_modifier} |${yes_no} |}try{ phrase|} {${brand}|${query}}"
                )
            ).to.deep.equal(["negative_modifier", "yes_no", "brand", "query"]);
        });
    });
});
