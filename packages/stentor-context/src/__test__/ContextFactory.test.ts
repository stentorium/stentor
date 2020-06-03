/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import {
    Channel,
    Pii,
    PIIService,
    Request,
    Storage,
    UserDataValue,
    UserStorageService
} from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";

import { ContextFactory } from "../ContextFactory";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const alexaCancel = require("./assets/alexa-cancel-intent.json");

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
    public get(): Promise<Storage | undefined> {
        return undefined;
    }

    public create(): Promise<Storage> {
        return undefined;
    }

    public update(): Promise<Storage> {
        return undefined;
    }
}

class TestPIIService implements PIIService {
    public pii: Pii;
    public loadPii(): Promise<Pii> {
        return undefined;
    }
    public savePii(): Promise<void> {
        return undefined;
    }
    public updatePii(): Promise<void> {
        return undefined;
    }
    public getPiiForField(): Promise<Pii[]> {
        return undefined;
    }
    public removePii(): Promise<void> {
        return undefined;
    }
    public redeem(): Promise<UserDataValue> {
        return undefined;
    }
}

describe("ContextFactory", () => {
    let requestBody: object;
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
            requestBody = alexaCancel;
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
        // Disabling until we update the Alexa channel, it will fail
        xdescribe("for an Alexa request", () => {
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
                expect(context.device.mediaPlayerStatus).to.exist;
                expect(context.device.mediaPlayerStatus.token).to.equal("token");
                expect(context.device.mediaPlayerStatus.status).to.equal("STOPPED");
                expect(context.device.mediaPlayerStatus.offsetInMilliseconds).to.equal(29204);
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
