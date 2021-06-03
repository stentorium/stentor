/*! Copyright (c) 2021, XAPPmedia */
import { expect } from "chai";
import { findValuesForKey } from "../findValuesForKey";

describe(`#${findValuesForKey.name}()`, () => {
    describe("when passed undefined object", () => {
        it("returns undefined", () => {
            expect(findValuesForKey("key", undefined)).to.be.undefined;
        });
    });
    describe("when passed undefined key", () => {
        it("returns undefined", () => {
            expect(findValuesForKey(undefined, {})).to.be.undefined;
        });
    });
    describe("when passed object without any matches", () => {
        it("returns undefined", () => {
            const obj = { hello: "no-match", ["d*"]: "numbers" };
            expect(findValuesForKey("key", obj)).to.deep.equal([]);
            // Matches everything except Stop, Cancel, & Help Intents
            const obj1 = { ["^((?!(StopIntent|HelpIntent|CancelIntent)).)*$"]: "match" };
            expect(findValuesForKey("StopIntent", obj1)).to.deep.equal([]);
            expect(findValuesForKey("HelpIntent", obj1)).to.deep.equal([]);
            expect(findValuesForKey("CancelIntent", obj1)).to.deep.equal([]);
        });
    });
    describe("when passed possible regex matches", () => {
        it("finds and returns the regex match", () => {
            const obj = { [".*"]: "match" };
            expect(findValuesForKey("SomeKey", obj)).to.deep.equal(["match"]);
            // Matches everything except Stop, Cancel, & Help Intents
            const obj1 = { ["^((?!(StopIntent|HelpIntent|CancelIntent)).)*$"]: "match" };
            expect(findValuesForKey("AnotherIntent", obj1)).to.deep.equal(["match"]);
            // Matches one or two
            const obj2 = { ["one"]: "one", ["two"]: "two" };
            expect(findValuesForKey("one|three", obj2)[0]).to.deep.equal("one");
        });
    });
    describe("when passed exact matches and regex", () => {
        it("returns the exact match over the regex", () => {
            const obj = { [".*"]: "regex", key: "exact" };
            expect(findValuesForKey("key", obj)[0]).to.deep.equal("regex");
            expect(findValuesForKey("key", obj)[1]).to.deep.equal("exact");
        });
    });
});