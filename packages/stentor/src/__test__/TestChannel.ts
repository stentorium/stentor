/*! Copyright (c) 2020, XAPPmedia */
import { Translator } from "@xapp/patterns";
import { Channel, Request, RequestResponse, RuntimeCallback, RuntimeContext, Device } from "stentor-models";

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
    crash?: boolean;
}

export function Test(options: TestChannelOptions = {}): Channel {

    const TestChannel: Channel = {
        name: "test",
        test(): boolean {
            return true;
        },
        request: new TestRequestTranslator(),
        response: new TestResponseTranslator(),
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



