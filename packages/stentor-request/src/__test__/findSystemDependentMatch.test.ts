/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Request, SystemDependent } from "stentor-models";
import { LaunchRequestBuilder } from "../Builders";
import { findSystemDependentMatch } from "../findSystemDependentMatch";

const accountLinked: SystemDependent = {
    systemCondition: "ACCOUNT_LINKED"
};

const accountNotLinked: SystemDependent = {
    systemCondition: "!ACCOUNT_LINKED"
};

const healthCheck: SystemDependent = {
    systemCondition: "HEALTH_CHECK"
};

const notHealthCheck: SystemDependent = {
    systemCondition: "!HEALTH_CHECK"
};

const notBargeIn: SystemDependent = {
    systemCondition: "!BARGE_IN"
};

const accountLinkedRequest: Request = new LaunchRequestBuilder().withAccessToken().build();
const accountNotLinkedRequest: Request = new LaunchRequestBuilder().build();

describe("#findSystemDependentMatch()", () => {
    describe("when passed undefined parameters", () => {
        it("returns undefined", () => {
            expect(findSystemDependentMatch(undefined, undefined)).to.be.undefined;
            expect(findSystemDependentMatch([], undefined)).to.be.undefined;
            expect(findSystemDependentMatch([undefined], undefined)).to.be.undefined;
            expect(
                findSystemDependentMatch(
                    [
                        {
                            systemCondition: undefined
                        }
                    ],
                    accountLinkedRequest
                )
            ).to.be.undefined;
        });
    });
    describe("when passed an array with a match", () => {
        it("returns the match", () => {
            expect(findSystemDependentMatch([accountLinked], accountLinkedRequest)).to.equal(accountLinked);
            expect(findSystemDependentMatch([accountNotLinked], accountLinkedRequest)).to.be.undefined;
            expect(findSystemDependentMatch([accountNotLinked], accountNotLinkedRequest)).to.equal(accountNotLinked);
            expect(findSystemDependentMatch([accountNotLinked], accountLinkedRequest)).to.be.undefined;
            expect(findSystemDependentMatch([notHealthCheck], accountLinkedRequest)).to.equal(notHealthCheck);
            expect(findSystemDependentMatch([healthCheck], accountLinkedRequest)).to.be.undefined;
            expect(findSystemDependentMatch([notBargeIn], accountLinkedRequest)).to.equal(notBargeIn);
        });
    });
    describe("when passed bad data", () => {
        it("throws an error", () => {
            expect(
                findSystemDependentMatch.bind(
                    findSystemDependentMatch,
                    [
                        {
                            systemCondition: "FOO"
                        } as any
                    ],
                    accountLinkedRequest
                )
            ).to.throw();
        });
    });
});
