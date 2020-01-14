/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { IntentRequest, LaunchRequest, RequestDependent, SessionEndedRequest } from "stentor-models";
import { IntentRequestBuilder, LaunchRequestBuilder, SessionEndedRequestBuilder } from "../Builders";
import { findRequestDependentMatch } from "../findRequestDependentMatch";

const zero: RequestDependent = {
    requestMatch: {
        name: "isNewSession",
        value: true
    }
};

const one: RequestDependent = {
    requestMatch: {
        name: "isNewSession",
        value: false
    }
};

const two: RequestDependent = {
    requestMatch: {
        name: "isNewSession",
        value: false,
        operation: "!=="
    }
};

const three: RequestDependent = {
    requestMatch: {
        name: "type",
        value: ["INTENT_REQUEST", "LAUNCH_REQUEST"]
    }
};

const intentRequest: IntentRequest = new IntentRequestBuilder().build();
const launchRequest: LaunchRequest = new LaunchRequestBuilder().build();
const sessionEndedRequest: SessionEndedRequest = new SessionEndedRequestBuilder().build();

describe("#findRequestDependentMatch()", () => {
    describe("when passed undefined", () => {
        it("returns undefined potential matches", () => {
            expect(findRequestDependentMatch(undefined, undefined)).to.be.undefined;
            expect(findRequestDependentMatch([undefined], undefined)).to.be.undefined;
            expect(
                findRequestDependentMatch(
                    [
                        {
                            requestMatch: undefined
                        }
                    ],
                    launchRequest
                )
            ).to.be.undefined;
            expect(findRequestDependentMatch([zero, one], undefined)).to.be.undefined;
        });
    });
    describe("when passed objects without a match", () => {
        it("returns undefined", () => {
            expect(findRequestDependentMatch([zero], intentRequest)).to.be.undefined;
            expect(findRequestDependentMatch([one], launchRequest)).to.be.undefined;
            expect(findRequestDependentMatch([two], intentRequest)).to.be.undefined;
            expect(findRequestDependentMatch([three], sessionEndedRequest)).to.be.undefined;
        });
    });
    describe("when passed objects with a match", () => {
        it("returns the correct match", () => {
            expect(findRequestDependentMatch([zero, one], launchRequest)).to.equal(zero);
            expect(findRequestDependentMatch([zero, one], intentRequest)).to.equal(one);
            expect(findRequestDependentMatch([two, one], launchRequest)).to.equal(two);
            expect(findRequestDependentMatch([three, one], launchRequest)).to.be.equal(three);
        });
    });
});
