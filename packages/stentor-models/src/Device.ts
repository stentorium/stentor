/*! Copyright (c) 2019, XAPPmedia */

export interface MediaPlayerStatus {
    type?: "AUDIO" | "VIDEO";
    token?: string;
    offsetInMilliseconds?: number;
    status: "IDLE" | "PAUSED" | "PLAYING" | "STOPPED" | "FINISHED" | "BUFFER_UNDERRUN";
}

/**
 * The hardware type (screen) if we have it
 */
export type DisplayShape = "RECTANGLE" | "ROUND";

/**
 * Describes the capability of the device where the
 * request originated.
 *
 * It also provides insight to how you can respond to the
 * current request as it isn't always possible to return
 * speech.
 */
export interface Device {
    /**
     * The channel the user is on.
     */
    channel: string;
    /**
     * If the device is capable of playing audio.
     */
    audioSupported: boolean;
    /**
     * If the current request can be responded to with audio.
     */
    canPlayAudio: boolean;
    /**
     * If the device is capable of playing video.
     */
    videoSupported: boolean;
    /**
     * If the current request can be responded to with video.
     */
    canPlayVideo: boolean;
    /**
     * If the device (and current request) can be responded to
     * with speech
     */
    canSpeak: boolean;
    /**
     * If the device (and current request) can throw a card
     */
    canThrowCard: boolean;
    /**
     * If the device is capable to transfer calls (usually to an live agent).
     *
     * Telephony channels typically can perform this.
     */
    canTransferCall: boolean;
    /**
     * If the device has a screen.
     *
     * Used to determine if we can link accounts on Google
     * or return display interfaces on Alexa.
     */
    hasScreen: boolean;
    /**
     * If the device has web browser capability
     *
     * Google assistant app has it, hub doesn't
     */
    hasWebBrowser: boolean;
    /**
     * Display data
     *
     * Used to tell a little bit more about the display type if data is available
     */
    displayData?: DisplayData;
    /**
     * Some channels and devices also support media playback
     */
    mediaPlayerStatus?: MediaPlayerStatus;
}

export interface DisplayData {
    /**
     * Display type
     *
     * Used to tell the display type if available to tweak visuals if needed. This is just guessing.
     */
    shape?: DisplayShape;

    // If round/oval these are the measurements across - so circle device, like the spot is 480x480 with 160dpi
    pixelHeight?: number;

    pixelWidth?: number;

    dpi?: number;

    // TODO: Touch?
    // touch?: TouchType;
}
