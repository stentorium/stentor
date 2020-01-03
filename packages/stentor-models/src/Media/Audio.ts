/*! Copyright (c) 2019, XAPPmedia */
import { PlayableMedia } from "./PlayableMedia";
import { AudioType, GenericAudioType } from "./Types";

/**
 * Playable media designed for hands-free & eyes-free consumption.
 *
 * This interface cannot be implemented directly.
 *
 * @see https://developers.google.com/actions/assistant/responses#media_responses
 * @see https://developers.google.com/actions/reference/rest/Shared.Types/AppResponse#mediaresponse
 * @see https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#play-params
 */
export interface Audio extends PlayableMedia {
    type: AudioType;
    /**
     * Title (or name) of the audio.
     *
     * This is typically the track title
     * or podcast episode name.
     */
    title?: string;
    /**
     * Subtitle for the audio.
     *
     * This is typically the category or
     * artist name.
     */
    subtitle?: string;
    /**
     * Description of the audio
     *
     * Max length is 160 characters, limited by
     * Google.
     */
    description?: string;
    /**
     * Image for the audio, typically the album art.
     *
     * Dimensions must be square, minimum 480 by 480 pixels
     */
    image?: string;
    /**
     * When applicable (Alexa), the background image for display surfaces.
     *
     * Minimum dimensions are 1024 by 640 pixels
     */
    backgroundImage?: string;
}

/**
 * Simple implementation of Audio.
 */
export interface GenericAudio extends Audio {
    type: GenericAudioType;
}
