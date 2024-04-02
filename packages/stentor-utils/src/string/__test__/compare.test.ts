/*! Copyright (c) 2023, XAPP AI */
import { expect } from "chai";

import { compareStrings } from "../compare";

describe(`#${compareStrings.name}()`, () => {
    it("compares correctly", () => {
        expect(compareStrings('what is a conversational ai platform', 'What is a conversational AI platform?')).to.be.true;
        expect(compareStrings("what is your name", "what height are you")).to.be.false;
    });
});