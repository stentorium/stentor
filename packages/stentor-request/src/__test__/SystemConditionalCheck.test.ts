/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { Context, Storage, SystemDependent } from "stentor-models";
import { createSessionStore } from "stentor-storage";
import { IntentRequestBuilder, LaunchRequestBuilder } from "../Builders";
import { SystemConditionalCheck } from "../SystemConditionalCheck";
import { ResponseBuilder } from "stentor-response";

const launchRequest = new LaunchRequestBuilder().build();

const storage: Storage = {
    createdTimestamp: Date.now(),
    foo: 4,
    bar: "ok",
    baz: false,
    sessionStore: {
        id: "foo",
        data: {
            new_user: true,
            foo: 4,
            bar: "ok",
            baz: false
        }
    }
};

const context: Context = {
    storage,
    session: createSessionStore(storage),
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
    },
    response: {} as ResponseBuilder, // this won't be called for these tests
    services: {}
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
            expect(isNewUser()).to.be.true;
            // 2nd
            const isPlatform = SystemConditionalCheck(new IntentRequestBuilder().onPlatform("foo").build(), context).functions[2];
            expect(isPlatform("FOO")).to.be.true;
            expect(isPlatform("foo")).to.be.true;
            expect(isPlatform("bar")).to.be.false;
            expect(isPlatform(undefined)).to.be.false;
            // 3rd
            const storageEquals = SystemConditionalCheck(new LaunchRequestBuilder().withAccessToken('foo').build(), context).functions[3];
            expect(storageEquals("foo", 4)).to.be.true;
            expect(storageEquals("bar", "ok")).to.be.true;
            expect(storageEquals("baz", false)).to.be.true;
            expect(storageEquals("foo", 5)).to.be.false;
            expect(storageEquals("bar", "no")).to.be.false;
            expect(storageEquals("baz", true)).to.be.false;
            expect(storageEquals("dne", 4)).to.be.false;
            // 4th 
            const sessionStorageEquals = SystemConditionalCheck(new LaunchRequestBuilder().withAccessToken('foo').build(), context).functions[4];
            expect(sessionStorageEquals("new_user", true)).to.be.true;
            expect(sessionStorageEquals("new_user", false)).to.be.false;
            expect(sessionStorageEquals("foo", 4)).to.be.true;
            expect(sessionStorageEquals("bar", "ok")).to.be.true;
            expect(sessionStorageEquals("baz", false)).to.be.true;
            expect(sessionStorageEquals("foo", 5)).to.be.false;
            expect(sessionStorageEquals("bar", "no")).to.be.false;
            expect(sessionStorageEquals("baz", true)).to.be.false;
            expect(sessionStorageEquals("dne", 4)).to.be.false;
        });
    });
});
