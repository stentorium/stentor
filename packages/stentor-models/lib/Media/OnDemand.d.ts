/*! Copyright (c) 2019, XAPPmedia */
import { Audio } from "./Audio";
import { ReportableAudio, ReportableSong } from "./ReportableAudio";
import { Song } from "./Song";
import { OnDemandType } from "./Types";
export declare type OnDemandAudio = ReportableSong | Song | ReportableAudio | Audio;
export interface OnDemand {
    type: OnDemandType;
    apiKey: string;
}
