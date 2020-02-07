/*! Copyright (c) 2019, XAPPmedia */
import { Polyfill } from "../Polyfill";

export const CANCEL_POLYFILL: Polyfill = {
    intentId: "CancelIntent",
    name: "Cancel Intent",
    utterancePatterns: ["cancel", "cancel please", "please cancel", "cancel now"]
};
