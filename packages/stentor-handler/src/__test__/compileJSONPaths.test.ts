/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { compileJSONPaths } from "../compileJSONPaths";

describe("#compileJSONPaths()", () => {
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
});
