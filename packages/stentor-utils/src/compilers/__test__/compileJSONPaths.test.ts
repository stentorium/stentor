/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { compileJSONPaths } from "../compileJSONPaths";

describe(`#${compileJSONPaths}()`, () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(compileJSONPaths(undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed context", () => {
        it("compiles the response", () => {
            const comp = compileJSONPaths({ displayText: "${FOO}", ssml: "hello" }, { FOO: "foo" });
            expect(comp).to.be.a("object");
            if (typeof comp === "object") {
                expect(comp.displayText).to.equal("foo");
                expect(comp.ssml).to.equal("hello");
            }
        });
    });
    describe("when passed template without a valid path", () => {
        describe("when replaceWhenUndefined is true", () => {
            it("compiles the value", () => {
                const compiled = compileJSONPaths({
                    ssml: "<speak>Hi ${first_name}!",
                    displayText: "Hi ${first_name}!"
                }, {}, true);
                expect(compiled).to.deep.equal({
                    ssml: "<speak>Hi undefined!",
                    displayText: "Hi undefined!"
                });
            });
        });
        describe("when replaceWhenUndefined is false", () => {
            it("compiles the value", () => {
                const compiled = compileJSONPaths({
                    ssml: "<speak>Hi ${first_name}!",
                    displayText: "Hi ${first_name}!"
                }, {}, false);
                expect(compiled).to.deep.equal({
                    ssml: "<speak>Hi ${first_name}!",
                    displayText: "Hi ${first_name}!"
                });
            });
        });
        describe('when replaceWhenUndefined is not set', () => {
            it("compiles the value", () => {
                const compiled = compileJSONPaths({
                    ssml: "<speak>Hi ${first_name}!",
                    displayText: "Hi ${first_name}!"
                }, {});
                expect(compiled).to.deep.equal({
                    ssml: "<speak>Hi ${first_name}!",
                    displayText: "Hi ${first_name}!"
                });
            });
        });
    });
});
