/*! Copyright (c) 2019, XAPPmedia */
/* eslint-disable no-console */
import {
    ErrorEvent,
    ErrorService,
    Event,
    EventStream,
    EventType,
    LambdaFinishEvent,
    MessageEvent,
    Request,
    Response,
    RuntimeCallback
} from "stentor-models";
import { log } from "stentor-logger";
import {
    isAudioPlayerRequest,
    isInputUnknownRequest,
    isIntentRequest,
    isPlaybackControlRequest,
    isSessionEndedRequest
} from "stentor-guards";
import { parse } from "stacktrace-parser";
import { AbstractEventStream } from "./AbstractEventStream";
import { ConsoleStream } from "./ConsoleStream";
import {
    ANALYTICS_EVENT_TYPE,
    ERROR_EVENT_TYPE,
    LAMBDA_FAILURE_EVENT_TYPE,
    LAMBDA_SUCCESS_EVENT_TYPE,
    MESSAGE_EVENT_TYPE,
    REQUEST_EVENT_TYPE
} from "./Constants";
import { isPrefixFunction } from "./Guards";

export type PrefixType = string | boolean | number | object;
export type PrefixFunction = () => PrefixType;
export type Prefix = PrefixType | PrefixFunction;

export interface EventPrefix {
    [key: string]: Prefix;
}

interface PrefixObject {
    [key: string]: PrefixType;
}

function getPrefix(prefix: EventPrefix): PrefixObject {
    return Object.keys(prefix).reduce((last: PrefixObject, key: string): PrefixObject => {
        const value = prefix[key];
        last[key] = isPrefixFunction(value) ? value() : value;
        return last;
    }, {});
}

function containsSameKeys(obj1: object = {}, obj2: object = {}): boolean {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    for (const key of obj1Keys) {
        if (obj2Keys.indexOf(key) >= 0) {
            return true;
        }
    }
    return false;
}


export interface EventServiceProps {
    /**
     * Streams that are to be included with the EventService
     */
    streams?: EventStream | EventStream[];
    /**
     * Items that are to be appended with each event before they are sent to the stream.
     */
    prefix?: EventPrefix;
}

export class EventService implements ErrorService {
    private readonly streams: EventStream[];
    private prefix: EventPrefix = {
        // default values
        platform: "unknown",
        isoTime: () => {
            return new Date().toISOString();
        }
    };

    public constructor(stream: AbstractEventStream | EventStream[] | EventServiceProps = [], prefix: EventPrefix = {}) {
        const initialStreams: EventStream[] = [];
        if (Array.isArray(stream)) {
            initialStreams.push(...stream);
        } else if (stream instanceof AbstractEventStream) {
            initialStreams.push(stream);
        } else {
            if (Array.isArray(stream.streams)) {
                initialStreams.push(...stream.streams);
            } else if (stream.streams instanceof AbstractEventStream) {
                initialStreams.push(stream.streams);
            }
        }

        this.streams = [new ConsoleStream(), ...initialStreams];
        this.addPrefix = this.addPrefix.bind(this);
        this.addStream = this.addStream.bind(this);
        this.message = this.message.bind(this);
        this.event = this.event.bind(this);
        this.flush = this.flush.bind(this);
        this.prefix = { ...this.prefix, ...(stream as EventServiceProps).prefix, ...prefix };
    }

    /**
     * Add a new stream to send the events to
     * @param newStream 
     */
    public addStream(newStream: EventStream): void {
        this.streams.push(newStream);
    }

    /**
     * Adds an object that is appended every event that is sent.
     * All previous events added will not contain this prefix.
     * If the key already exists in the prefix, then it will be replaced.
     * @param prefix - The object that is appended to each event flushed.
     */
    public addPrefix(prefix: EventPrefix): void {
        this.prefix = { ...this.prefix, ...prefix };
    }

    /**
     * Logs a Request object.
     * @param request The request to log.
     */
    public request(request: Request): Event {
        // Pick out the necessary payload
        // by default it is just the request
        let payload: any = {
            request
        }
        // depending on the request
        if (isInputUnknownRequest(request)) {
            payload = {
                intent: request.intentId
            };
        } else if (isIntentRequest(request)) {
            // Intent requests use the intentId
            // like HelpIntent or WeatherIntent
            payload = {
                intent: request.intentId
            };
            if (request.slots) {
                payload.slots = request.slots;
            }
            if (request.matchConfidence) {
                payload.matchConfidence = request.matchConfidence;
            }
        } else if (isAudioPlayerRequest(request)) {
            payload = {
                event: request.event,
                token: request.token
            };

            if (request.errorType) {
                payload.errorType = request.errorType;
            }

            if (request.errorMessage) {
                payload.errorMessage = request.errorMessage;
            }
        } else if (isPlaybackControlRequest(request)) {
            payload = {
                event: request.event
            };
        } else if (isSessionEndedRequest(request)) {
            payload = {
                reason: request.reason,
                errorType: request.errorType,
                errorMessage: request.errorMessage
            };
        }

        if (typeof request.rawQuery === "string") {
            if (!payload) {
                payload = {};
            }
            payload.rawQuery = request.rawQuery;
        }

        return this.event(REQUEST_EVENT_TYPE, request.type, payload);
    }

    /**
     * Logs a request & response event
     * @param request 
     * @param response 
     */
    public requestResponse(request: Request, response: Response): Event<{ request: Request, response: Response, tag?: string }> {
        const payload: { request: Request, response: Response, tag?: string } = {
            request,
            response
        };
        // add tag if it exist
        const keys: Record<string, unknown> = {};
        if (response.tag) {
            keys.tag = response.tag;
        }
        return this.event(ANALYTICS_EVENT_TYPE, "REQUEST_RESPONSE", payload, keys)
    }

    public error(error: Error): ErrorEvent {
        const name = error.name;
        const message = error.message;
        const stack = parse(error.stack);
        return this.event(ERROR_EVENT_TYPE, name, { message, stack }) as ErrorEvent;
    }

    public message(name: string, message?: string): MessageEvent {
        let useName: string;
        if (message) {
            useName = name;
        } else {
            const split = name.split(":");
            useName = split.length < 2 ? "INFO" : split[0];
            message = split[split.length - 1];
        }

        return this.event(MESSAGE_EVENT_TYPE, useName, message.trim()) as MessageEvent;
    }

    /**
     * Add an event that will be sent to all event streams.
     */
    public event(stentorEvent: Event<any>): Event<any>;
    public event(type: EventType, name: string, payload?: string | object, keys?: Record<string, unknown>): Event<any>;
    public event(type: EventType | Event<any>, name?: string, payload?: string | object, keys?: Record<string, unknown>): Event<any> {
        const event: Event<any> = typeof type === "string" ? { name, type, payload } : type;

        if (typeof event.name !== "string") {
            throw new TypeError("Unable to process event, event name was invalid.");
        }
        event.name.trim();

        if (typeof event.type !== "string") {
            throw new TypeError("Unable to process event, event type was invalid.");
        }
        event.type.trim().toUpperCase();

        const prefix = getPrefix(this.prefix);
        if (containsSameKeys(prefix, event)) {
            log().warn(
                "The event contains matching keys to the event prefix. This may be an error. Please check that they do not match."
            );
        }
        let everything = { ...prefix, ...event };

        if (keys && typeof keys === "object") {
            if (containsSameKeys(everything, keys)) {
                log().warn("The additional keys from the event contains matching keys to the event itself.  This may be an error.  Please check that they do not match")
            }

            everything = { ...everything, ...keys }
        }

        this.streams.forEach(s => s.addEvent(everything));
        return everything;
    }

    public flush(): Promise<void> {
        const flushingPromises = this.streams.map(s => s.flush());
        return Promise.all(flushingPromises).then((): void => { return; });
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getLambdaEvent(error: Error, result: object): LambdaFinishEvent {
    const event: LambdaFinishEvent = {
        name: "Lambda Finished",
        type: error ? LAMBDA_FAILURE_EVENT_TYPE : LAMBDA_SUCCESS_EVENT_TYPE
    };
    if (error) {
        event.payload = error.message;
    }
    return event;
}

/**
 * This function will wrap the callback to allow flushing the events to the streams just before
 * the callback is sent to the real one.
 * 
 * @param event The event service to flush when the callback is called.
 * @param lambdaCallback The original callback to wrap
 * @returns A new Lambda callback that can be used in replace of the original
 */
export function wrapCallback(event: EventService, lambdaCallback: RuntimeCallback): RuntimeCallback {
    return (error: Error, result: object, request: Request, response: Response, ...args: any[]): void => {

        if (request) {
            try {
                event.request(request);
            } catch (e) {
                log().error(`Error adding request event: ${e}`);
            }
        }
        if (error) {
            try {
                event.error(error);
            } catch (e) {
                log().error(`Error adding error event: ${e}`);
            }
        }
        const finishEvent: LambdaFinishEvent = getLambdaEvent(error, result);
        // The last event in the stream.
        event.event(finishEvent);

        console.time("callback");
        lambdaCallback(error, result, ...args);
        console.time("flush");
        event
            .flush()
            .catch(e => log().error(e))
            .then(() => console.timeEnd("flush"));

        console.timeEnd("callback");
    };
}

export default EventService;
