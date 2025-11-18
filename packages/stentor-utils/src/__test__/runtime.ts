/*! Copyright (c) 2022, XAPP AI */
import { expect } from "chai";
import { isLambda } from "../runtime";

describe(`#${isLambda.name}`, () => {
    it("returns the correct value", () => {
        expect(isLambda()).to.be.false;
    });
});