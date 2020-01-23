/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { truncate } from "../truncate";

// We are going to have some magic here
/*tslint:disable:no-magic-numbers */

describe("#truncate()", () => {
    describe("when passed a long string with multiple sentences", () => {
        describe("that is under length", () => {
            it("leaves it unmodified", () => {
                expect(truncate("Hi!  My name is Foo.", 200)).to.equal("Hi!  My name is Foo.");
            });
        });
        describe("that is over length", () => {
            it("truncates it", () => {
                expect(truncate("Hi!  My name is Foo.  What is your name?", 26)).to.equal("Hi! My name is Foo.");
            });
        });
    });
    describe("when passed a long string with one sentence", () => {
        describe("that is under length", () => {
            it("leaves it unmodified", () => {
                expect(truncate("My name is Foo.", 20)).to.equal("My name is Foo.");
            });
        });
        describe("that is over length", () => {
            it("truncates it", () => {
                // My name is F ...
                expect(truncate("My name is Foo.", 12)).to.equal("My name i...");
            });
        });
    });
});
