/*! Copyright (c) 2019, XAPPmedia */
import {
    AudioPlayerRequestType,
    IntentRequestType,
    PlaybackControlRequestType,
    RequestSlotMap,
    RequestTypes
} from "../Request";
import { Event } from "./Event";
import { RequestEventType } from "./Types";

export interface RequestEvent<P extends object> extends Event<P> {
    type: RequestEventType;
    name: RequestTypes;
}

export interface IntentRequestPayload {
    intent: string;
    slots?: RequestSlotMap;
    rawQuery?: string;
}

export interface IntentRequestEvent extends RequestEvent<IntentRequestPayload> {
    name: IntentRequestType;
}

export interface PlaybackControlRequestPayload {
    event: string;
}

export interface PlaybackControlRequestEvent extends RequestEvent<PlaybackControlRequestPayload> {
    name: PlaybackControlRequestType;
}

export interface AudioPlayerRequestPayload {
    event: string;
    token: string;
}

export interface AudioPlayerRequestEvent extends RequestEvent<AudioPlayerRequestPayload> {
    name: AudioPlayerRequestType;
}
