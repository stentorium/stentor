/*! Copyright (c) 2019, XAPPmedia */
import { BuiltInIntents } from "stentor-models";

/**
 * Used to fill in the utterances for built-in intents
 * that are available on some platforms but not all.
 */
export interface Polyfill {
    intentId: BuiltInIntents;
    name: string;
    utterancePatterns: string[];
}
