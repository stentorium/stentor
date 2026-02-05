/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import * as AWSLambda from "aws-lambda";
import { Handler, HandlerService, UserStorageService } from "stentor-models";
import { Assistant } from "../Assistant";

import { Test } from "./TestChannel";
import { IntentRequestBuilder } from "stentor-request";

chai.use(sinonChai);
chai.use(chaiAsPromised);
const expect = chai.expect;

class MockHandlerService implements HandlerService {
    public async get(id: string): Promise<Handler> {
        return new Promise((resolve) => {
            const help: Handler = {
                appId: "appId",
                organizationId: "organizationId",
                type: "ConversationHandler",
                intentId: "HelpIntent",
                content: {
                    "HelpIntent": [{
                        outputSpeech: "Help"
                    }
                    ]
                }
            }

            if (id === "HelpIntent") {
                return resolve(help);
            } else {
                return resolve({} as any as Handler);
            }
        });
    }

    public async getMany(intentIds: string[]): Promise<Handler[]> {
        const results = await Promise.all(intentIds.map(id => this.get(id)));
        return results.filter(h => h !== undefined) as Handler[];
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


const MockLambdaEvent: AWSLambda.LexEvent = {
    currentIntent: {
        name: "OCYes",
        slots: {},
        slotDetails: {},
        confirmationStatus: "Confirmed"
    },
    bot: {
        name: "Bot",
        alias: "latest",
        version: "1"
    },
    userId: "userId",
    inputTranscript: "yeah, sure",
    invocationSource: "FulfillmentCodeHook",
    outputDialogMode: "Voice",
    messageVersion: "1.0",
    sessionAttributes: {},
    requestAttributes: {}
}

const MockLambdaContext: AWSLambda.Context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: "name",
    functionVersion: "version",
    invokedFunctionArn: "arn",
    memoryLimitInMB: "1024",
    awsRequestId: "requestId",
    logGroupName: "log-group",
    logStreamName: "log-stream",
    getRemainingTimeInMillis: () => {
        return 4000;
    },
    done: () => {
        return;
    },
    fail: () => {
        return;
    },
    succeed: () => {
        return;
    }
}

describe("Assistant", () => {
    let assistant: Assistant;
    describe("#lambda()", () => {
        describe("when called", () => {
            let callback: sinon.SinonStub;

            beforeEach(() => {
                assistant = new Assistant()
                    .withUserStorage(new MockUserStorageService())
                    .withHandlerService(new MockHandlerService());
                callback = sinon.stub();
            });
            it("returns the expected result", async () => {
                const request = new IntentRequestBuilder().withIntentId("HelpIntent").build();
                const handler = assistant.withChannels([Test({ passThrough: true, validateRequest: true })]).lambda();
                await handler(
                    {
                        path: "/",
                        requestContext: {},
                        body: JSON.stringify(request),
                        headers: {}
                    },
                    MockLambdaContext,
                    callback
                );

                expect(callback).to.have.been.calledOnce;
                expect(callback).to.have.been.calledWith(null, {
                    statusCode: 200,
                    headers: { "Access-Control-Allow-Origin": "*" },
                    body: '{"outputSpeech":{"ssml":"<speak>Help</speak>","displayText":"Help"}}'
                });
            });
        });
        describe("without environment variables", () => {

            before(() => {
                // make sure they are all gone
                delete process.env.STUDIO_TOKEN;
                delete process.env.STUDIO_APP_ID;
                delete process.env.OVAI_TOKEN;
                delete process.env.OVAI_APP_ID;
            });
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
                    let callback: sinon.SinonStub;

                    beforeEach(() => {
                        assistant = new Assistant().withHandlerService(new MockHandlerService());
                        callback = sinon.stub();
                    });
                    it("throws an error", async () => {
                        const handler = assistant.lambda();

                        await handler({
                            path: "/",
                            requestContext: {},
                            body: JSON.stringify({}),
                            headers: {}
                        }, MockLambdaContext, callback);

                        expect(callback).to.have.been.calledOnce;
                        expect(callback).to.have.been.calledWith(null, {
                            statusCode: 500,
                            headers: { "Access-Control-Allow-Origin": "*" },
                            body:
                                "TypeError: A user storage service is required."
                        });
                    });
                    describe('on Lambda', () => {
                        it('returns the error', async () => {
                            const handler = assistant.lambda();

                            await handler(MockLambdaEvent, MockLambdaContext, callback);

                            expect(callback).to.have.been.calledOnce;
                            expect(callback).to.have.been.calledWith(null, "TypeError: A user storage service is required.");
                        })
                    })
                });
            });
            describe("without handler service", () => {
                let callback: sinon.SinonStub;

                beforeEach(() => {
                    assistant = new Assistant();
                    callback = sinon.stub();
                });
                it("throws an error", async () => {
                    const handler = assistant.lambda();

                    await handler({
                        path: "/",
                        requestContext: {},
                        body: JSON.stringify({}),
                        headers: {}
                    }, MockLambdaContext, callback);

                    expect(callback).to.have.been.calledOnce;
                    expect(callback).to.have.been.calledWith(null, {
                        statusCode: 500,
                        headers: { "Access-Control-Allow-Origin": "*" },
                        body:
                            "Error: HandlerService or STUDIO_TOKEN was not provided, unable to create the Assistant."
                    });
                });
            });
        });
        describe("with environment variables", () => {
            beforeEach(() => {
                process.env.STUDIO_TOKEN = "token";
                process.env.STUDIO_APP_ID = "appId";
                assistant = new Assistant().withUserStorage(new MockUserStorageService());
            });
            afterEach(() => {
                delete process.env.STUDIO_TOKEN;
                delete process.env.STUDIO_APP_ID;
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
                    MockLambdaContext,
                    callback
                );

                expect(callback).to.have.been.calledOnce;
                expect(callback).to.have.been.calledWith(null, {
                    statusCode: 500,
                    headers: { "Access-Control-Allow-Origin": "*" },
                    body:
                        "Error: Runtime Error"
                });
            });
        });
    });
});
