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
    SessionStore,
    Storage,
    UserDataValue,
    UserStorageService
} from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";

import { ContextFactory } from "../ContextFactory";
import { createSessionStore } from "stentor-storage";

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
            canTransferCall: false,
            hasWebBrowser: false
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

    const session: SessionStore = createSessionStore(storage);

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
        it("creates context", async () => {
            const context = await ContextFactory.fromRequest(
                request,
                requestBody,
                storage,
                session,
                {
                    piiService,

                },
                TEST_CHANNEL
            );

            expect(context).to.exist;
            expect(context.storage).to.exist;
        })
    });
});
