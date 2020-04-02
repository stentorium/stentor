/*! Copyright (c) 2019, XAPPmedia */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Translator } from "@xapp/patterns";
import {
    Channel,
    HandlerService,
    Pii,
    PIIService,
    Request,
    RequestResponse,
    UserDataValue,
    UserStorageService
} from "stentor-models";

export class MockHandlerService implements HandlerService {
    public get(): any {
        return {} as any;
    }
}

export class MockUserStorageService implements UserStorageService {
    public get(): any {
        return {} as any;
    }
    public create(): any {
        return {} as any;
    }
    public update(): any {
        return {} as any;
    }
}

export class MockPIIService implements PIIService {
    public pii: Pii;
    public async loadPii(): Promise<Pii> {
        return {} as Pii;
    }
    public async savePii(): Promise<void> {
        return;
    }
    public async updatePii(): Promise<void> {
        return;
    }
    public async getPiiForField(): Promise<Pii[]> {
        return [];
    }
    public async removePii(): Promise<void> {
        return;
    }
    public async redeem(): Promise<UserDataValue> {
        return {} as UserDataValue;
    }
}

export class MockRequestTranslator extends Translator<object, Request> {
    public translate(): Request {
        return {
            intentId: "intentId",
            sessionId: "sessionId",
            isNewSession: true,
            userId: "userId",
            type: "INTENT_REQUEST"
        }
    }
}

export class MockResponseTranslator extends Translator<RequestResponse, object> {
    public translate(response: RequestResponse): object {
        return {
            mock: true,
            request: response.request,
            response: response.response
        };
    }
}


export const MOCK_CHANNEL: Channel = {
    name: "MOCK",
    test: () => {
        return true;
    },
    request: new MockRequestTranslator(),
    response: new MockResponseTranslator(),
    capabilities: () => {
        return {
            canPlayAudio: true,
            canPlayVideo: true,
            canSpeak: true,
            audioSupported: true,
            videoSupported: true,
            canThrowCard: true,
            canTransferCall: false,
            channel: "MOCK",
            hasScreen: true
        }
    }
}
