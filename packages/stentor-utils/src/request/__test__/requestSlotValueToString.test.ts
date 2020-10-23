/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { requestSlotValueToString } from "../requestSlotValueToString";

describe(`#${requestSlotValueToString.name}()`, () => {
    it('returns the correct value', () => {
        expect(requestSlotValueToString(4)).to.equal("4");
        expect(requestSlotValueToString("foo")).to.equal("foo");
        expect(requestSlotValueToString(["a", "b"])).to.equal("[a,b]");
        expect(requestSlotValueToString({ date: "2019-09-11", time: "18:30:00", tz: "Z" })).to.equal("2019-09-11T18:30:00");
    });
});