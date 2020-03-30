/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { isDuration } from "../isDuration";

describe(`#${isDuration.name}()`, () => {
    it('returns the correct value', () => {
        expect(isDuration("foo")).to.be.false;
        expect(isDuration(undefined)).to.be.false;
        expect(isDuration({ amount: 4, format: "m" })).to.be.true;
        expect(isDuration(['foo', 'boo'])).to.be.false;
    });
});