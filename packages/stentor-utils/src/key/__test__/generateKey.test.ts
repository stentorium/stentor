/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { generateKey } from "../generateKey";

describe("#generateKey()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(generateKey(undefined)).to.be.undefined;
        });
    });
    describe("when passed just an intentId", () => {
        it("returns the correct key", () => {
            expect(
                generateKey({
                    intentId: "intentId"
                })
            ).to.equal("intentId");
            expect(
                generateKey({
                    intentId: "intentId",
                    catchAll: false
                })
            ).to.equal("intentId");
            expect(
                generateKey({
                    intentId: "intentId",
                    includedIntentIds: ["intentId"]
                })
            ).to.equal("intentId");
            expect(
                generateKey({
                    includedIntentIds: ["intentId"]
                })
            ).to.equal("intentId");
        });
    });
    describe("when passed include array", () => {
        it("returns the correct key", () => {
            expect(
                generateKey({
                    includedIntentIds: ["StopIntent", "CancelIntent", "DoneIntent"]
                })
            ).to.equal("^StopIntent$|^CancelIntent$|^DoneIntent$");
        });
    });
    describe("when passed catchAll", () => {
        it("returns the correct key", () => {
            expect(
                generateKey({
                    catchAll: true
                })
            ).to.equal("^.*$");
        });
    });
    describe("when passed a catchAll with exclusion array", () => {
        it("returns the correct key", () => {
            const key0 = generateKey({
                catchAll: true,
                excludedIntentIds: ["StopIntent", "HelpIntent", "CancelIntent"]
            });
            expect(RegExp(key0).exec("StopIntent")).to.be.null;
            expect(RegExp(key0).exec("FooIntent")).to.exist;
            expect(key0).to.equal("^(?!(^StopIntent$|^HelpIntent$|^CancelIntent$)).*$");

            const key1 = generateKey({
                catchAll: true,
                excludedIntentIds: ["StopIntent"]
            });
            expect(RegExp(key1).exec("StopIntent")).to.be.null;
            expect(RegExp(key1).exec("FooIntent")).to.exist;
            expect(key1).to.equal("^(?!(^StopIntent$)).*$");
        });
    });
    describe("when passed a bad description", () => {
        it("returns the correct key", () => {
            expect(
                generateKey({
                    catchAll: true,
                    includedIntentIds: ["StopIntent", "CancelIntent", "DoneIntent"]
                })
            ).to.be.undefined;
            expect(
                generateKey({
                    catchAll: true,
                    intentId: "intentId"
                })
            ).to.be.undefined;
        });
    });
});
