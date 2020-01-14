/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { IntentRequestBuilder } from "../Builders";

describe(`${IntentRequestBuilder.name}`, () => {
    describe(`#${IntentRequestBuilder.prototype.build.name}()`, () => {
        describe('when using the defaults', () => {
            it('returns the default values', () => {
                expect(new IntentRequestBuilder().build()).to.deep.equal({
                    type: "INTENT_REQUEST",
                    intentId: "intentId",
                    deviceId: "deviceId",
                    userId: "userId",
                    sessionId: "sessionId",
                    locale: "en-US",
                    isNewSession: false
                });
            });
        });
    });
    describe(`#${IntentRequestBuilder.prototype.withDeviceId.name}()`, () => {
        it('sets the deviceId', () => {
            expect(new IntentRequestBuilder().withDeviceId('1234').build()).to.contain({ deviceId: "1234" });
        });
    });
    describe(`#${IntentRequestBuilder.prototype.onPlatform.name}()`, () => {
        it('sets the deviceId', () => {
            expect(new IntentRequestBuilder().onPlatform('foo').build()).to.contain({ platform: "foo" });
        });
    });
    describe(`#${IntentRequestBuilder.prototype.withAPIAccess.name}()`, () => {
        it('sets apiAccess data', () => {
            const request = new IntentRequestBuilder().withAPIAccess({
                apiAuthToken: "token",
                apiBaseUrl: "https://some.url"
            }).build();
            expect(request.apiAccess).to.exist;
            expect(request.apiAccess).to.include({
                apiAuthToken: "token",
                apiBaseUrl: "https://some.url"
            });
        });
    });
});