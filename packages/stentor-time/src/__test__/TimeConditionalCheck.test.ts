/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";
import * as moment from "moment";

import { ActiveWithinable } from "stentor-models";

import { TimeConditionalCheck } from "../TimeConditionalCheck";

const obj: ActiveWithinable = {
    activeWithin: {
        amount: 5,
        format: "days"
    }
}

const lastActiveFourMonthsAgo: number = moment()
    .subtract(4, "months")
    .valueOf();

const YMD_FORMAT = "YYYY-MM-DD";
const yesterday: string = moment().subtract(1, "day").format(YMD_FORMAT);

describe(`${TimeConditionalCheck.name}`, () => {
    describe(`test`, () => {
        it("returns the correct result", () => {
            expect(TimeConditionalCheck({ lastActiveTimestamp: Date.now() }).test(undefined)).to.be.false;
            expect(TimeConditionalCheck({ lastActiveTimestamp: Date.now() }).test(obj)).to.be.true;
        });
    });
    describe('check', () => {
        it("returns the correct result", () => {
            expect(TimeConditionalCheck({ lastActiveTimestamp: Date.now() }).check(obj)).to.be.true;
        });
    });
    describe('functions', () => {
        it('returns the correct result', () => {
            const lastActive0 = TimeConditionalCheck({ lastActiveTimestamp: Date.now() }).functions[0];
            expect(lastActive0).to.exist;
            expect(lastActive0(5, "days")).to.be.true;
            const lastActive1 = TimeConditionalCheck({ lastActiveTimestamp: lastActiveFourMonthsAgo }).functions[0];
            expect(lastActive1).to.exist;
            expect(lastActive1(5, "days")).to.be.false;
            const fitsSchedule = TimeConditionalCheck({ lastActiveTimestamp: Date.now() }).functions[1];
            expect(fitsSchedule).to.exist;
            expect(fitsSchedule(yesterday, YMD_FORMAT, 4, "days")).to.be.true;

        });
    });
});