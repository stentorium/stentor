/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { isLambdaError } from "../Guards";
import { LambdaError } from "../LambdaError";

describe("isLambdaError()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isLambdaError(undefined)).to.be.false;
        });
    });
    describe("when passed a LambdaError", () => {
        it("returns true", () => {
            expect(isLambdaError(new LambdaError("Foo"))).to.be.true;
        });
    });
    describe("when passed an Error", () => {
        it("returns false", () => {
            expect(isLambdaError(new Error("Foo"))).to.be.false;
        });
    });
});
