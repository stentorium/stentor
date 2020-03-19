/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { describeKey } from "../describeKey";

describe("#describeKey()", () => {
    describe("when passed undefined", () => {
        it("returns an empty object", () => {
            expect(describeKey(undefined)).to.deep.equal({ indescribable: true });
        });
    });
    describe("when passed an intent ID", () => {
        it("returns the correct description", () => {
            expect(describeKey("intentId")).to.deep.equal({
                intentId: "intentId",
                includedIntentIds: ["intentId"],
                catchAll: false
            });
        });
    });
    describe("when passed an catch-all with exclusion key", () => {
        it("returns the correct analysis", () => {
            expect(describeKey("^(?!(FooIntent|HelpIntent|CancelIntent)).*$")).to.deep.equal({
                catchAll: true,
                excludedIntentIds: ["FooIntent", "HelpIntent", "CancelIntent"]
            });
            expect(describeKey("^(?!(^BarIntent$|^HelpIntent$|^CancelIntent$)).*$")).to.deep.equal({
                catchAll: true,
                excludedIntentIds: ["BarIntent", "HelpIntent", "CancelIntent"]
            });
            expect(describeKey("(?!(^BazIntent$|^HelpIntent$|^CancelIntent$)).*")).to.deep.equal({
                catchAll: true,
                excludedIntentIds: ["BazIntent", "HelpIntent", "CancelIntent"]
            });
        });
    });
    describe("when passed a include only key", () => {
        it("returns the correct description", () => {
            expect(describeKey("CancelIntent|RepeatIntent|StopIntent|DoneIntent")).to.deep.equal({
                catchAll: false,
                includedIntentIds: ["CancelIntent", "RepeatIntent", "StopIntent", "DoneIntent"]
            });
            expect(describeKey("^CancelIntent$|^RepeatIntent$|^StopIntent$|^DoneIntent$")).to.deep.equal({
                catchAll: false,
                includedIntentIds: ["CancelIntent", "RepeatIntent", "StopIntent", "DoneIntent"]
            });
        });
    });
    describe("when passed a catch-all key", () => {
        it("returns the correct description", () => {
            expect(describeKey("^.*$")).to.deep.equal({
                catchAll: true
            });
            expect(describeKey(".*")).to.deep.equal({
                catchAll: true
            });
        });
    });
    describe("when passed a key that does not have a known description", () => {
        it("returns the correct description", () => {
            expect(describeKey("^REPEAT_(.+)$")).to.deep.equal({
                indescribable: true
            });
            expect(describeKey("^REPEAT_(.*)$")).to.deep.equal({
                indescribable: true
            });
            expect(describeKey("^REPEAT_.*$")).to.deep.equal({
                indescribable: true
            });
        });
    });
});
