/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { SystemDependent } from "stentor-models";
import { LaunchRequestBuilder } from "../Builders";
import { SystemConditionalCheck } from "../SystemConditionalCheck";

const launchRequest = new LaunchRequestBuilder().build();

const obj: SystemDependent = {
    systemCondition: "ACCOUNT_LINKED"
};

describe(`${SystemConditionalCheck.name}`, () => {
    describe(`test`, () => {
        it("returns the correct result", () => {
            expect(SystemConditionalCheck(launchRequest).test(undefined)).to.be.false;
            expect(SystemConditionalCheck(launchRequest).test(obj)).to.be.true;
        });
    });
    describe('check', () => {
        it("returns the correct result", () => {
            expect(SystemConditionalCheck(launchRequest).check(obj)).to.be.false;
        });
    });
    describe(`functions`, () => {
        it('returns the correct result', () => {
            // 0th 
            const hasAccountLinked = SystemConditionalCheck(new LaunchRequestBuilder().withAccessToken('foo').build()).functions[0];
            expect(hasAccountLinked()).to.be.true;
        });
    });
});