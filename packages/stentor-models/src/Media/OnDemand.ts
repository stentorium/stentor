/*! Copyright (c) 2019, XAPPmedia */
import { Audio } from "./Audio";
import { ReportableAudio, ReportableSong } from "./ReportableAudio";
import { Song } from "./Song";
import { OnDemandType } from "./Types";

/*
 * Audio that can be played in a playlist on demand with playback restrictions such as no to limited skipping and no reversing.
 *
 * This typically applies to audio or songs that require playback reporting.
 */
export type OnDemandAudio = ReportableSong | Song | ReportableAudio | Audio;

export interface OnDemand {
    type: OnDemandType;
    apiKey: string;
}
