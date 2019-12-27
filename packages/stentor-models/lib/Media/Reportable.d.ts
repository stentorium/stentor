/*! Copyright (c) 2019, XAPPmedia */
import { Playable } from "./Playable";
/**
 * A playable whose playback can be reported to
 * a third party.
 *
 * @export
 * @interface Reportable
 * @extends {Playable}
 */
export interface Reportable extends Playable {
    /**
     * An ID representing a playback of the playable.
     *
     * @type {string}
     * @memberof Reportable
     */
    playedId?: string;
}
