/*! Copyright (c) 2021, XAPPmedia */
import { expect } from "chai";

import { capabilities } from "../Channel";
import { DEFAULT_DEVICE } from "../Constants";
import { LAUNCH_REQUEST } from "./assets";

describe(`#${capabilities.name}()`, () => {
    it("returns the correct value", () => {
        expect(capabilities({ ...LAUNCH_REQUEST })).to.deep.equal(DEFAULT_DEVICE);
        expect(capabilities({ ...LAUNCH_REQUEST, device: { canSpeak: true } })).to.deep.equal({ canSpeak: true })
    });
});