/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { Context, SystemDependent } from "stentor-models";
import { createSessionStore } from "stentor-storage";
import { LaunchRequestBuilder } from "../Builders";
import { SystemConditionalCheck } from "../SystemConditionalCheck";

const launchRequest = new LaunchRequestBuilder().build();

const context: Context = {
    storage: {
        createdTimestamp: Date.now(),
        sessionStore: {
            id: "foo",
            data: {
            new_user: true
            }
        }
    },
    device: {
                channel: "test",
            audioSupported: true,
            canPlayAudio: true,
            videoSupported: true,
            canPlayVideo: true,
            canSpeak: true,
            canThrowCard: true,
            hasScreen: false,
            hasWebBrowser: false,
            canTransferCall: false
    }
};

const obj: SystemDependent = {
    systemCondition: "ACCOUNT_LINKED"
};

describe(`${SystemConditionalCheck.name}`, () => {
    describe(`test`, () => {
        it("returns the correct result", () => {
            expect(SystemConditionalCheck(launchRequest, context).test(undefined)).to.be.false;
            expect(SystemConditionalCheck(launchRequest, context).test(obj)).to.be.true;
        });
    });
    describe('check', () => {
        it("returns the correct result", () => {
            expect(SystemConditionalCheck(launchRequest, context).check(obj)).to.be.false;
        });
    });
    describe(`functions`, () => {
        it('returns the correct result', () => {
            // 0th 
            const hasAccountLinked = SystemConditionalCheck(new LaunchRequestBuilder().withAccessToken('foo').build(), context).functions[0];
            expect(hasAccountLinked()).to.be.true;
            // 1th
            const isNewUser = SystemConditionalCheck(new LaunchRequestBuilder().withAccessToken('foo').build(), context).functions[1];
            expect(isNewUser()).to.be.false;
            // 1th
            const isNewUser_true = SystemConditionalCheck(new LaunchRequestBuilder().withAccessToken('foo').build(), {...context, storage: {

            }}).functions[1];
            expect(isNewUser_true()).to.be.false;
        });
    });
});