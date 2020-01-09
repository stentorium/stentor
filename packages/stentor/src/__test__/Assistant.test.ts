/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { Alexa, AlexaRequestBuilder } from "@xapp/stentor-alexa";
import { HandlerService, UserStorageService } from "stentor-models";
import { Assistant } from "../Assistant";

chai.use(sinonChai);
const expect = chai.expect;

class MockHandlerService implements HandlerService {
    public get() {
        return {} as any;
    }
}

class MockUserStorageService implements UserStorageService {
    public get() {
        return {} as any;
    }
    public create() {
        return {} as any;
    }
    public update() {
        return {} as any;
    }
}

describe("Assistant", () => {
    let assistant: Assistant;
    describe("#lambda()", () => {
        describe("without environment variables", () => {
            describe("with handler service", () => {
                beforeEach(() => {
                    assistant = new Assistant().withHandlerService(new MockHandlerService());
                });
                it("doesn't throw an error", () => {
                    expect(assistant.lambda.bind(assistant)).to.not.throw();
                });
                it("returns a function", () => {
                    expect(assistant.lambda()).to.be.a("function");
                });
            });
            describe("without handler service", () => {
                beforeEach(() => {
                    assistant = new Assistant();
                });
                it("throws an error", () => {
                    expect(assistant.lambda.bind(assistant)).to.throw("HandlerService or OVAI_TOKEN was not provided.");
                });
            });
        });
        describe("with environment variables", () => {
            beforeEach(() => {
                process.env.OVAI_TOKEN = "token";
                process.env.OVAI_APP_ID = "appId";
                assistant = new Assistant();
            });
            afterEach(() => {
                delete process.env.OVAI_TOKEN;
                delete process.env.OVAI_APP_ID;
            });
            it("doesn't throw an error", () => {
                expect(assistant.lambda.bind(assistant)).to.not.throw();
            });
            it("returns a function", () => {
                expect(assistant.lambda()).to.be.a("function");
            });
        });
        describe("when runtime crashes", () => {
            let callback: sinon.SinonStub;

            let ciPrevious: string | undefined;
            let ovaiPrevious: string | undefined;

            beforeEach(() => {
                assistant = new Assistant()
                    .withUserStorage(new MockUserStorageService())
                    .withHandlerService(new MockHandlerService());
                callback = sinon.stub();

                ciPrevious = process.env.CI;
                ovaiPrevious = process.env.OVAI_ALEXA_NO_VERIFY;

                delete process.env.CI;
                delete process.env.OVAI_ALEXA_NO_VERIFY;
            });
            afterEach(() => {
                process.env.CI = ciPrevious;
                process.env.OVAI_ALEXA_NO_VERIFY = ovaiPrevious;
            });
            it("returns to proper payload", async () => {
                const request = new AlexaRequestBuilder()
                    .withSkillId("appId")
                    .isALaunchRequest()
                    .build();
                const handler = assistant.withChannels([Alexa("appId")]).lambda();
                await handler(
                    {
                        path: "/",
                        requestContext: {},
                        body: JSON.stringify(request),
                        headers: {}
                    },
                    {} as any,
                    callback
                );

                expect(callback).to.have.been.calledOnce;
                expect(callback).to.have.been.calledWith(null, {
                    statusCode: 400,
                    body:
                        "Error: Could not verify the payload was from Alexa: missing certificate url.  If this is on a development environment, set environment variable OVAI_ALEXA_NO_VERIFY to true to disable verification."
                });
            });
        });
    });
});
