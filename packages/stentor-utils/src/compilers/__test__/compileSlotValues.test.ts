/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { RequestSlotMap } from "stentor-models";

import { compileSlotValues } from "../compileSlotValues";

const slots: RequestSlotMap = {
    ["date"]: {
        name: "date",
        value: {
            date: "2019-09-11"
        }
    },
    ["name"]: {
        name: "name",
        value: "bob"
    }
}

describe(`#${compileSlotValues.name}()`, () => {
    describe("when passed a string", () => {
        it("compiles the value", () => {
            const compiled = compileSlotValues("Hi ${name}!", slots);
            expect(compiled).to.equal("Hi bob!");
        });
    });
    describe("when passed a response output", () => {
        it("compiles the value", () => {
            const compiled = compileSlotValues({
                ssml: "<speak>Hi ${name}!",
                displayText: "Hi ${name}!"
            }, slots);
            expect(compiled).to.deep.equal({
                ssml: "<speak>Hi bob!",
                displayText: "Hi bob!"
            });
        });
    });
    describe("when the slot value doesn't exist", () => {
        describe("when replaceWhenUndefined is true", () => {
            it("compiles the value", () => {
                const compiled = compileSlotValues({
                    ssml: "<speak>Hi ${first_name}!",
                    displayText: "Hi ${first_name}!"
                }, slots, true);
                expect(compiled).to.deep.equal({
                    ssml: "<speak>Hi undefined!",
                    displayText: "Hi undefined!"
                });
            });
        });
        describe("when replaceWhenUndefined is false", () => {
            it("compiles the value", () => {
                const compiled = compileSlotValues({
                    ssml: "<speak>Hi ${first_name}!",
                    displayText: "Hi ${first_name}!"
                }, slots, false);
                expect(compiled).to.deep.equal({
                    ssml: "<speak>Hi ${first_name}!",
                    displayText: "Hi ${first_name}!"
                });
            });
        });
        describe('when replaceWhenUndefined is not set', () => {
            it("compiles the value", () => {
                const compiled = compileSlotValues({
                    ssml: "<speak>Hi ${first_name}!",
                    displayText: "Hi ${first_name}!"
                }, slots);
                expect(compiled).to.deep.equal({
                    ssml: "<speak>Hi ${first_name}!",
                    displayText: "Hi ${first_name}!"
                });
            });
        });
    });
});