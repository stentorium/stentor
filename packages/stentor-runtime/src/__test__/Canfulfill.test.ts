/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { CONVERSATION_HANDLER_TYPE, ConversationHandler } from "@xapp/stentor-handler";
import { HandlerFactory } from "@xapp/stentor-handler-factory";
import { Handler, HandlerService, RuntimeContext, Storage, UserStorageService } from "stentor-models";
import { main } from "../index";
import { DEFAULT_CHANNELS } from "./assets/Constants";
import { MockUserStorageService } from "./Mocks";

const requestBody = require("./assets/ExamplePayloads/can-fulfill-intent-request.json");
const bogusIntentRequest = require("./assets/ExamplePayloads/can-fulfill-bogus-intent-request.json");

chai.use(sinonChai);
const expect = chai.expect;

const noWeCant = {
    canFulfillIntent: {
        canFulfill: "NO",
        slots: {
            foo: {
                canFulfill: "NO",
                canUnderstand: "NO"
            }
        }
    }
};

const yesWeCan = {
    canFulfillIntent: {
        canFulfill: "YES",
        slots: {
            foo: {
                canFulfill: "YES",
                canUnderstand: "YES"
            }
        }
    }
};

class MyHandlerService implements HandlerService {
    get(intentId: string) {
        return { type: "InSessionIntent", intentId } as any;
    }
}

describe("CanFulfill", () => {
    const organizationId = "organizationId";
    const appId = "amzn1.ask.skill.test";
    const intentId = "LaunchRequest";

    const props: Handler = {
        organizationId,
        appId,
        intentId,
        type: CONVERSATION_HANDLER_TYPE,
        name: "Conversation Intent",
        data: {},
        content: {
            ["intentOne"]: [
                {
                    name: "Response One",
                    outputSpeech: "This is the first response"
                }
            ]
        }
    };

    const disabledHandler: ConversationHandler = new ConversationHandler({ ...props });

    const enabledHandler: ConversationHandler = new ConversationHandler({
        ...props,
        data: { accessibleThroughDiscovery: true }
    });

    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - 1);

    const storage: Storage = {
        createdTimestamp: createdDate.getTime(),
        lastActiveTimestamp: createdDate.getTime()
    };
    let callbackSpy: sinon.SinonSpy;
    let fakeContext: RuntimeContext;
    let handlerFactory: HandlerFactory;
    let handlerService: HandlerService;
    let userStorageService: UserStorageService;

    beforeEach(() => {
        callbackSpy = sinon.spy();
        fakeContext = { headers: {} };
        handlerFactory = new HandlerFactory();
        handlerService = new MyHandlerService();
    });
    describe("With disabled canFulfill on Handler", () => {
        beforeEach(() => {
            // reset the spy
            callbackSpy = sinon.spy();

            // Add our HandlerIntent as the currentIntent on the storage
            const updatedStorage = { ...storage, currentHandler: disabledHandler };
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve(updatedStorage),
                update: Promise.resolve(updatedStorage)
            });
        });
        it("with existing intent", async () => {
            await main(requestBody, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });

            const callBackArgs = callbackSpy.args[0];
            const payload = callBackArgs[1];
            expect(payload).to.exist;

            expect(payload.response).to.deep.equal(noWeCant);
        });
        it("with bogus intent", async () => {
            await main(bogusIntentRequest, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });

            const callBackArgs = callbackSpy.args[0];
            const payload = callBackArgs[1];
            expect(payload).to.exist;

            expect(payload.response).to.deep.equal(noWeCant);
        });
    });
    describe("With enabled canFulfill on Handler", () => {
        beforeEach(() => {
            // reset the spy
            callbackSpy = sinon.spy();

            // Add our HandlerIntent as the currentIntent on the storage
            const updatedStorage = { ...storage, currentHandler: enabledHandler };
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve(updatedStorage),
                update: Promise.resolve(updatedStorage)
            });
        });
        it("with existing intent", async () => {
            await main(requestBody, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });

            const callBackArgs = callbackSpy.args[0];
            const payload = callBackArgs[1];
            expect(payload).to.exist;

            expect(payload.response).to.deep.equal(yesWeCan);
        });
        it("with bogus intent", async () => {
            await main(bogusIntentRequest, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });

            const callBackArgs = callbackSpy.args[0];
            const payload = callBackArgs[1];
            expect(payload).to.exist;

            expect(payload.response).to.deep.equal(noWeCant);
        });
    });
});
