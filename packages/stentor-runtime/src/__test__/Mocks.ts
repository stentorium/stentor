/*! Copyright (c) 2019, XAPPmedia */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Translator } from "@xapp/patterns";
import {
    Channel,
    ChannelHooks,
    Device,
    HandlerService,
    KnowledgeBaseResult,
    KnowledgeBaseService,
    NLUQueryResponse,
    NLUService,
    Pii,
    PIIService,
    Request,
    RequestResponse,
    Response,
    UserDataValue,
    UserStorageService,
} from "stentor-models";

export class MockNLUService implements NLUService {
    public async query(): Promise<NLUQueryResponse> {
        return {} as any;
    }

    public async setContext(): Promise<void> {
        return;
    }
}

export class MockKnowledgeBaseService implements KnowledgeBaseService {
    public async query(): Promise<KnowledgeBaseResult> {
        return {
            faqs: [
                {
                    question: "What is your favorite scary movie?",
                    document: "Scream 2"
                }
            ]
        };
    }
}

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
            hasScreen: true,
            hasWebBrowser: false
        }
    }
}

export interface PassThroughChannelOptions {
    device?: Device;
    response?: Translator<RequestResponse, Response>;
    nlu?: NLUService;
    hooks?: ChannelHooks;
    test?(body: object): boolean;
}

export class PassThroughRequestTranslator extends Translator<Request, Request> {
    public translate(request: Request): Request {
        return request;
    }
}

export class PassThroughResponseTranslator extends Translator<RequestResponse, Response> {
    public translate(response: RequestResponse): Response {
        return response.response;
    }
}

export function passThroughChannel(options?: PassThroughChannelOptions): Channel {

    const device: Device = {
        canPlayAudio: true,
        canPlayVideo: true,
        canSpeak: true,
        audioSupported: true,
        videoSupported: true,
        canThrowCard: true,
        canTransferCall: false,
        channel: "MOCK",
        hasScreen: true,
        hasWebBrowser: false
    };

    const nlu: NLUService = options ? options.nlu : undefined;

    return {
        name: "MOCK",
        nlu,
        test: (request: object): boolean => {
            if (options && typeof options.test === "function") {
                return options.test(request);
            } else {
                return true;
            }
        },
        hooks: options?.hooks,
        request: new PassThroughRequestTranslator(),
        response: options?.response || new PassThroughResponseTranslator(),
        capabilities: (): Device => {
            if (options && options.device) {
                return options.device;
            } else {
                return device;
            }
        }
    }
}
