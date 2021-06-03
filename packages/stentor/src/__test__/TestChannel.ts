/*! Copyright (c) 2020, XAPPmedia */
import { Translator } from "@xapp/patterns";
import {
    Channel,
    IntentRequest,
    Request,
    RequestResponse,
    Response,
    RuntimeCallback,
    RuntimeContext,
    Device
} from "stentor-models";

export class PassThroughRequestTranslator extends Translator<Request, Request> {
    public translate(request: Request): Request {
        return request;
    }
}

export class PassThroughResponseTranslator extends Translator<RequestResponse, Response> {
    public translate(requestResponse: RequestResponse): Response {
        return requestResponse.response;
    }
}

export class TestRequestTranslator extends Translator<object, Request> {
    public translate(): Request {
        return {} as any;
    }
}

export class TestResponseTranslator extends Translator<RequestResponse, object> {
    public translate(): object {
        return {};
    }
}

export interface TestChannelOptions {
    /**
     * Forces a crash
     */
    crash?: boolean;
    /**
     * Passes through the request and response straight through
     */
    passThrough?: boolean;
    /**
     * Validate the request has an intentId
     */
    validateRequest?: boolean
}

export function Test(options: TestChannelOptions = {}): Channel {

    const TestChannel: Channel = {
        name: "test",
        test(body: object): boolean {
            if (options.validateRequest) {
                if (body && (body as IntentRequest).intentId) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
        request: options.passThrough ? new PassThroughRequestTranslator() : new TestRequestTranslator(),
        response: options.passThrough ? new PassThroughResponseTranslator() : new TestResponseTranslator(),
        capabilities(): Device {
            return {
                canPlayAudio: true,
                canPlayVideo: false,
                canSpeak: true,
                canThrowCard: true,
                canTransferCall: false,
                audioSupported: true,
                videoSupported: true,
                hasScreen: true,
                hasWebBrowser: false,
                channel: "test"
            }
        },
        hooks: {
            preExecution: async (event: object, context: RuntimeContext, callback: RuntimeCallback): Promise<{ event: object; context: RuntimeContext; callback: RuntimeCallback }> => {
                if (options.crash) {
                    throw new Error("Runtime Error");
                }

                return { event, context, callback };
            }
        }
    }

    return TestChannel;
}



