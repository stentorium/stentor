/*! Copyright (c) 2019, XAPPmedia */
/**
 * The hardware type (screen) if we have it
 */
export declare type DisplayShape = "RECTANGLE" | "ROUND";
/**
 * Describes the capability of the device where the
 * request originated.
 *
 * It also provides insight to how you can respond to the
 * current request as it isn't always possible to return
 * speech.
 *
 * @export
 * @interface Device
 */
export interface Device {
    /**
     * The channel the user is on.
     */
    channel: string;
    /**
     * If the device is capable of playing audio.
     *
     * @type {boolean}
     * @memberof Device
     */
    audioSupported: boolean;
    /**
     * If the current request can be responded to with audio.
     *
     * @type {boolean}
     * @memberof Device
     */
    canPlayAudio: boolean;
    /**
     * If the device is capable of playing video.
     *
     * @type {boolean}
     * @memberof Device
     */
    videoSupported: boolean;
    /**
     * If the current request can be responded to with video.
     *
     * @type {boolean}
     * @memberof Device
     */
    canPlayVideo: boolean;
    /**
     * If the device (and current request) can be responded to
     * with speech
     *
     * @type {boolean}
     * @memberof Device
     */
    canSpeak: boolean;
    /**
     * If the device (and current request) can throw a card
     *
     * @type {boolean}
     * @memberof Device
     */
    canThrowCard: boolean;
    /**
     * If the device has a screen.
     *
     * Used to determine if we can link accounts on Google
     * or return display interfaces on Alexa.
     *
     * @type {boolean}
     * @memberof Device
     */
    hasScreen: boolean;
    /**
     * Display data
     *
     * Used to tell a little bit more about the display type if data is available
     *
     * @type {DisplayData}
     * @memberof Device
     */
    displayData?: DisplayData;
}
export interface DisplayData {
    /**
     * Display type
     *
     * Used to tell the display type if available to tweak visuals if needed. This is just guessing.
     *
     * @type {DisplayType}
     * @memberof DisplayData
     */
    shape?: DisplayShape;
    pixelHeight?: number;
    pixelWidth?: number;
    dpi?: number;
}
