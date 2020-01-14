/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { AlexaRequestBuilder } from "@xapp/stentor-alexa";
import {
    Channel,
    CommFieldType,
    Pii,
    PIIService,
    Request,
    Storage,
    UserDataType,
    UserDataValue,
    UserStorageService
} from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";

import { ContextFactory } from "../ContextFactory";

chai.use(sinonChai);
const expect = chai.expect;

const TEST_CHANNEL: Channel = {
    name: "test",
    response: {
        translate: sinon.stub()
    },
    request: {
        translate: sinon.stub()
    },
    test: () => {
        return true;
    },
    capabilities: () => {
        return {
            channel: "unknown",
            audioSupported: true,
            videoSupported: false,
            canPlayAudio: true,
            canPlayVideo: false,
            canSpeak: true,
            canThrowCard: false,
            hasScreen: true,
            canTransferCall: false
        };
    }
};

class TestUserStorageService implements UserStorageService {
    get(id: string): Promise<Storage | undefined> {
        return undefined;
    }

    create(id: string, storage: Storage): Promise<Storage> {
        return undefined;
    }

    update(id: string, storage: Storage): Promise<Storage> {
        return undefined;
    }
}

class TestPIIService implements PIIService {
    pii: Pii;
    loadPii(token: string): Promise<Pii> {
        return undefined;
    }
    savePii(pii: Pii): Promise<void> {
        return undefined;
    }
    updatePii(pii: Pii): Promise<void> {
        return undefined;
    }
    getPiiForField(field: CommFieldType, value: string): Promise<Pii[]> {
        return undefined;
    }
    removePii(token?: string): Promise<void> {
        return undefined;
    }
    redeem(userDataType: UserDataType, accessToken: string): Promise<UserDataValue> {
        return undefined;
    }
}

describe("ContextFactory", () => {
    let requestBody: any;
    let request: Request;
    let piiService: PIIService;
    let userStorageService: UserStorageService;
    let getStorageStub: sinon.SinonStub;
    let createStorageStub: sinon.SinonStub;

    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - 1);

    const storage: Storage = {
        createdTimestamp: createdDate.getTime(),
        lastActiveTimestamp: createdDate.getTime()
    };

    beforeEach(() => {
        userStorageService = new TestUserStorageService();

        piiService = new TestPIIService();

        getStorageStub = sinon.stub(userStorageService, "get").returns(Promise.resolve(storage));
        createStorageStub = sinon.stub(userStorageService, "create").returns(Promise.resolve(storage));
    });
    afterEach(() => {
        getStorageStub.restore();
        createStorageStub.restore();
    });
    describe("#fromRequest()", () => {
        beforeEach(() => {
            request = new IntentRequestBuilder().cancel().build();
            requestBody = new AlexaRequestBuilder()
                .isACancelRequest()
                .withAudioPlayerContext({ token: "token", offsetInMilliseconds: 29204, playerActivity: "STOPPED" })
                .build();
        });
        describe("for a new user", () => {
            beforeEach(() => {
                getStorageStub.restore();
                createStorageStub.restore();
                getStorageStub = sinon.stub(userStorageService, "get").returns(Promise.resolve(undefined));
                createStorageStub = sinon.stub(userStorageService, "create").returns(Promise.resolve(storage));
            });
            it("creates the storage", async () => {
                const context = await ContextFactory.fromRequest(
                    request,
                    requestBody,
                    {
                        userStorageService,
                        piiService
                    },
                    TEST_CHANNEL
                );

                expect(getStorageStub).to.have.been.calledOnce;
                expect(createStorageStub).to.have.been.calledOnce;
                expect(createStorageStub).to.have.been.calledWithMatch(request.userId, {
                    history: {
                        handler: []
                    }
                });

                expect(context).to.exist;
                const storage = context.storage;
                expect(storage).to.exist;
                expect(storage.createdTimestamp).to.be.a("number");
                expect(storage.history).to.exist;
                expect(storage.unknownInputs).to.be.a("number");
                expect(storage.sessionStore).to.exist;
            });
        });
        describe("for an Alexa request", () => {
            it("sets the audioPlayer information", async () => {
                const context = await ContextFactory.fromRequest(
                    request,
                    requestBody,
                    {
                        userStorageService,
                        piiService
                    },
                    TEST_CHANNEL
                );
                expect(context.audioPlayer).to.exist;
                expect(context.audioPlayer.token).to.equal("token");
                expect(context.audioPlayer.status).to.equal("STOPPED");
                expect(context.audioPlayer.offsetInMilliseconds).to.equal(29204);
            });
            it("calls the user storage service", async () => {
                await ContextFactory.fromRequest(
                    request,
                    requestBody,
                    {
                        userStorageService,
                        piiService
                    },
                    TEST_CHANNEL
                );
                expect(getStorageStub).to.have.been.calledOnce;
                expect(getStorageStub).to.have.been.calledWith(request.userId);
                expect(createStorageStub).to.have.not.been.called;
            });
            describe("with unknownInputs on storage", () => {
                let newStorage: Storage;
                beforeEach(() => {
                    newStorage = { ...storage };
                    newStorage.unknownInputs = 2;

                    getStorageStub.restore();
                    getStorageStub = sinon.stub(userStorageService, "get").returns(Promise.resolve(newStorage));
                });
                it("resets the unknownInputs back to zero", async () => {
                    const context = await ContextFactory.fromRequest(
                        request,
                        requestBody,
                        {
                            userStorageService,
                            piiService
                        },
                        TEST_CHANNEL
                    );
                    expect(context).to.exist;
                    expect(context.storage).to.exist;
                    expect(context.storage.unknownInputs).to.equal(0);
                    expect(newStorage.unknownInputs).to.equal(0);
                });
            });
        });
    });
});
