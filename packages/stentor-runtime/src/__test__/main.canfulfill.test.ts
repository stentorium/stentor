/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { CONVERSATION_HANDLER_TYPE } from "stentor-constants";
import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { Channel, Handler, HandlerService, Request, RuntimeContext, Storage, UserStorageService } from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";
import { main } from "../main";
import { MockUserStorageService, passThroughChannel } from "./Mocks";

const DEFAULT_CHANNELS: Channel[] = [passThroughChannel()];

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
    public get(intentId: string) {
        return { type: "InSessionIntent", intentId } as any;
    }

    public async getMany(intentIds: string[]): Promise<any[]> {
        return intentIds.map(intentId => ({ type: "InSessionIntent", intentId }));
    }
}

describe("#main() with CanFulfill", () => {
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
    let request: Request;

    beforeEach(() => {
        callbackSpy = sinon.spy();
        fakeContext = { headers: {} };
        handlerFactory = new HandlerFactory();
        handlerService = new MyHandlerService();
    });
    describe("with disabled canFulfill on Handler", () => {
        beforeEach(() => {
            request = new IntentRequestBuilder().withIntentId("intentOne").withSlots({
                foo: {
                    name: "foo",
                    value: "bar"
                }
            }).canFulfill().build();
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
            await main(request, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });

            const callBackArgs = callbackSpy.args[0];
            const payload = callBackArgs[1];
            expect(payload).to.exist;
            expect(payload.data.canFulfillIntent).to.deep.equal(noWeCant.canFulfillIntent);
        });
        it("with bogus intent", async () => {
            const bogusIntentRequest = new IntentRequestBuilder().withIntentId("bogus").withSlots({
                foo: {
                    name: "foo",
                    value: "bar"
                }
            }).canFulfill().build();
            await main(bogusIntentRequest, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });

            const callBackArgs = callbackSpy.args[0];
            const payload = callBackArgs[1];
            expect(payload).to.exist;
            expect(payload.data.canFulfillIntent).to.deep.equal(noWeCant.canFulfillIntent);
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
            await main(request, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });

            const callBackArgs = callbackSpy.args[0];
            const payload = callBackArgs[1];
            expect(payload).to.exist;
            expect(payload.data.canFulfillIntent).to.deep.equal(yesWeCan.canFulfillIntent);
        });
        it("with bogus intent", async () => {
            const bogusIntentRequest = new IntentRequestBuilder().withIntentId("bogus").withSlots({
                foo: {
                    name: "foo",
                    value: "bar"
                }
            }).canFulfill().build();
            await main(bogusIntentRequest, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });

            const callBackArgs = callbackSpy.args[0];
            const payload = callBackArgs[1];
            expect(payload).to.exist;

            expect(payload.data.canFulfillIntent).to.deep.equal(noWeCant.canFulfillIntent);
        });
    });
});
