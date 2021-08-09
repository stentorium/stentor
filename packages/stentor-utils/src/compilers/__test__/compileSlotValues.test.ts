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
        describe("when there is a space around the slot name", () => {
            it("compiles the value", () => {
                const compiled = compileSlotValues({
                    ssml: "<speak>Hi ${ name }!",
                    displayText: "Hi ${ name }!"
                }, slots);
                expect(compiled).to.deep.equal({
                    ssml: "<speak>Hi bob!",
                    displayText: "Hi bob!"
                });
            });
        });
    });
    describe("with a macro", () => {
        it("compiles the value", () => {

            // Simple macro that 
            const foo: (input: string) => string = (input: string) => {
                return `${input} foo`;
            }

            const compiled = compileSlotValues({
                ssml: "<speak>${foo('${date}')} sound good?</speak>",
                displayText: "${date} sound good?"
            }, slots, false, { foo: foo });
            expect(compiled).to.deep.equal({
                ssml: "<speak><say-as interpret-as=\"date\" format=\"ymd\">2019-09-11</say-as> foo sound good?</speak>",
                displayText: "9-11-2019 sound good?"
            });
            /*
            const compiled = compileSlotValues({
                ssml: "<speak>${date('${date}')} sound good?</speak>",
                displayText: "${date} sound good?"
            }, slots, false, );
            expect(compiled).to.deep.equal({
                ssml: "<speak>September 11, 2019 sound good?",
                displayText: "2019-09-11 sound good?"
            });
            */
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