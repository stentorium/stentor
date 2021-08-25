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
    describe("with a simple macro", () => {
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
        });
        describe('when the macro doesn\'t exist', () => {
            it("leaves the macro untouched", () => {
                const compiled = compileSlotValues({
                    ssml: "<speak>${foo('${date}')} sound good?</speak>",
                    displayText: "${date} sound good?"
                }, slots, false, {});
                expect(compiled).to.deep.equal({
                    ssml: "<speak>${foo('${date}')} sound good?</speak>",
                    displayText: "9-11-2019 sound good?"
                });
            });
        });
    });
    describe("with a response with multiple macros", () => {
        it("compiles the value", () => {

            // Simple macro that 
            const foo: (input: string) => string = (input: string) => {
                return `${input} foo`;
            }

            const bar: (input: string, length: number, capitalize: boolean) => string = (input: string, length: number, capitalize: boolean) => {

                const trimmed = input.substr(0, length);
                if (capitalize) {
                    return trimmed.toUpperCase();
                } else {
                    return trimmed.toLowerCase();
                }
            }
            const compiled = compileSlotValues({
                ssml: "<speak>${foo('${date}')} sound good ${ bar( `${name}`, 2, true) }?</speak>",
                displayText: "${date} sound good ${ name} ?"
            }, slots, false, { foo: foo, bar: bar });
            expect(compiled).to.deep.equal({
                ssml: "<speak><say-as interpret-as=\"date\" format=\"ymd\">2019-09-11</say-as> foo sound good BO?</speak>",
                displayText: "9-11-2019 sound good bob ?"
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