/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { findValueForKey } from "../findValueForKey";

describe(`#${findValueForKey.name}()`, () => {
    describe("when passed undefined object", () => {
        it("returns undefined", () => {
            expect(findValueForKey("key", undefined)).to.be.undefined;
        });
    });
    describe("when passed undefined key", () => {
        it("returns undefined", () => {
            expect(findValueForKey(undefined, {})).to.be.undefined;
        });
    });
    describe("when passed object without any matches", () => {
        it("returns undefined", () => {
            const obj = { hello: "no-match", ["d*"]: "numbers" };
            expect(findValueForKey("key", obj)).to.be.undefined;
            // Matches everything except Stop, Cancel, & Help Intents
            const obj1 = { ["^((?!(StopIntent|HelpIntent|CancelIntent)).)*$"]: "match" };
            expect(findValueForKey("StopIntent", obj1)).to.be.undefined;
            expect(findValueForKey("HelpIntent", obj1)).to.be.undefined;
            expect(findValueForKey("CancelIntent", obj1)).to.be.undefined;
        });
    });
    describe("when passed possible regex matches", () => {
        it("finds and returns the regex match", () => {
            const obj = { [".*"]: "match" };
            expect(findValueForKey("SomeKey", obj)).to.equal("match");
            // Matches everything except Stop, Cancel, & Help Intents
            const obj1 = { ["^((?!(StopIntent|HelpIntent|CancelIntent)).)*$"]: "match" };
            expect(findValueForKey("AnotherIntent", obj1)).to.equal("match");
            // Matches one or two
            const obj2 = { ["one"]: "one", ["two"]: "two" };
            expect(findValueForKey("one|three", obj2)).to.equal("one");
        });
    });
    describe("when passed exact matches and regex", () => {
        it("returns the exact match over the regex", () => {
            const obj = { [".*"]: "regex", key: "exact" };
            expect(findValueForKey("key", obj)).to.equal("exact");
        });
    });
});
