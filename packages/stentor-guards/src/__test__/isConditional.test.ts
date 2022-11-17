/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { isConditional } from "../isConditional";

describe(`#${isConditional.name}()`, () => {
    it('returns the correct result', () => {
        expect(isConditional(undefined)).to.be.false;
        expect(isConditional({ conditions: "true" })).to.be.true;
        expect(isConditional({ conditions: { should: [], must: [] } })).to.be.true;
    });
});