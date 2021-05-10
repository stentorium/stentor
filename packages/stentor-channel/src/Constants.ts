/*! Copyright (c) 2019, XAPPmedia */
import { Device } from "stentor-models";
import { StentorPlatform } from "./Types";

export const STENTOR_PLATFORM: StentorPlatform = "stentor-platform";

export const DEFAULT_DEVICE: Device = {
    channel: STENTOR_PLATFORM,
    audioSupported: false,
    canPlayVideo: false,
    videoSupported: false,
    canPlayAudio: false,
    canSpeak: false,
    canThrowCard: true,
    hasScreen: true,
    canTransferCall: false,
    hasWebBrowser: true
};
