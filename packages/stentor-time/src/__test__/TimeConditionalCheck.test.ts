/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";
import * as moment from "moment";

import { TimeConditionalCheck } from "../TimeConditionalCheck";


const lastActiveFourMonthsAgo: number = moment()
    .subtract(4, "months")
    .valueOf();

describe(`${TimeConditionalCheck.name}`, () => {
    describe('functions', () => {
        it('returns the correct result', () => {
            const func0 = TimeConditionalCheck({ lastActiveTimestamp: Date.now() }).functions[0];
            expect(func0).to.exist;
            expect(func0(5, "days")).to.be.true;
            const func1 = TimeConditionalCheck({ lastActiveTimestamp: lastActiveFourMonthsAgo }).functions[0];
            expect(func1).to.exist;
            expect(func1(5, "days")).to.be.false;
        });
    });
});