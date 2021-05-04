/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { isDeviceable } from "../Guards";

describe(`#${isDeviceable.name}()`, () => {
    it("returns the correct value", () => {
        expect(isDeviceable(null)).to.be.false;
        // @ts-expect-error Bad value for testing
        expect(isDeviceable(true)).to.be.false;
        expect(isDeviceable({})).to.be.false;
        expect(isDeviceable({ device: { canSpeak: true } })).to.be.true;
    });
});