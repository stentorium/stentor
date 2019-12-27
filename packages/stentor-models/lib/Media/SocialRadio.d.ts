/*! Copyright (c) 2019, XAPPmedia */
import { OnDemand } from "./OnDemand";
import { ReportableAudio, ReportableSong } from "./ReportableAudio";
import { SocialRadioType } from "./Types";
export interface SocialRadio extends OnDemand {
    type: SocialRadioType;
    channel?: string;
}
export declare type SocialRadioAudio = SocialRadioTrack | SocialRadioSong;
/**
 * Tracks in SocialRadio are typically filler audio used
 * for station identification.
 *
 * @export
 * @interface SocialRadioTrack
 * @extends {ReportableAudio}
 */
export interface SocialRadioTrack extends ReportableAudio {
}
/**
 * Just a normal song
 *
 * @export
 * @interface SocialRadioSong
 * @extends {ReportableSong}
 */
export interface SocialRadioSong extends ReportableSong {
}
