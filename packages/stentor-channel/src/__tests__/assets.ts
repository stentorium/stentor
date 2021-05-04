/*! Copyright (c) 2021, XAPPmedia */
import { Device, LaunchRequest } from "stentor-models"

export const LAUNCH_REQUEST: LaunchRequest = {
    type: "LAUNCH_REQUEST",
    sessionId: "stentor-widget-session-bead5033-ae42-65c8-a4e5-3528f7c98feb",
    userId: "stentor-widget-user-876fcc46-71c0-65c2-9d57-d9f3bbe756ce",
    isNewSession: true,
    intentId: "LaunchRequest",
    platform: "stentor-platform",
    channel: "widget"
};

export const ALEXA_DEVICE: Device = {
    channel: "stentor-platform",
    audioSupported: true,
    canPlayVideo: false,
    videoSupported: false,
    canPlayAudio: true,
    canSpeak: true,
    canThrowCard: true,
    hasScreen: true,
    canTransferCall: false,
    hasWebBrowser: true
};