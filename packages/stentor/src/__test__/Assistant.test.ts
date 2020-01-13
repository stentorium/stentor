/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { HandlerService, UserStorageService } from "stentor-models";
import { Assistant } from "../Assistant";

import { Test } from "./TestChannel";

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
                    assistant = new Assistant().withUserStorage(new MockUserStorageService()).withHandlerService(new MockHandlerService());
                });
                it("doesn't throw an error", () => {
                    expect(() => {
                        assistant.lambda();
                    }).to.not.throw();
                });
                it("returns a function", () => {
                    expect(assistant.lambda()).to.be.a("function");
                });
                describe("without user storage service", () => {
                    beforeEach(() => {
                        assistant = new Assistant().withHandlerService(new MockHandlerService());
                    });
                    it("throws an error", () => {
                        expect(() => {
                            assistant.lambda();
                        }).to.throw('A user storage service is required.');
                    });
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
                assistant = new Assistant().withUserStorage(new MockUserStorageService());
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

            beforeEach(() => {
                assistant = new Assistant()
                    .withUserStorage(new MockUserStorageService())
                    .withHandlerService(new MockHandlerService());
                callback = sinon.stub();

                ciPrevious = process.env.CI;

                delete process.env.CI;
            });
            afterEach(() => {
                process.env.CI = ciPrevious;
            });
            it("returns to proper payload", async () => {
                const request = {};
                const handler = assistant.withChannels([Test({ crash: true })]).lambda();
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
                    statusCode: 500,
                    body:
                        "Error: Runtime Error"
                });
            });
        });
    });
});
