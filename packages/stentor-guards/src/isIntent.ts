/*! Copyright (c) 2019, XAPPmedia */
import { CANCEL_INTENT, FIRST_INTENT, HELP_INTENT, INPUT_UNKNOWN, LATEST_INTENT, LOOP_OFF_INTENT, LOOP_ON_INTENT, NEXT_INTENT, NO_INTENT, PAUSE_INTENT, PREVIOUS_INTENT, REPEAT_INTENT, RESUME_INTENT, SHUFFLE_OFF_INTENT, SHUFFLE_ON_INTENT, START_OVER_INTENT, STOP_INTENT, YES_INTENT } from "stentor-constants";
import { Intent, Handler } from "stentor-models";
import { isHandler } from "./isHandler";

/**
 * Detect if the intent is a 
 * @param props 
 * @returns 
 */
export function isBuiltInIntent(props: Handler | Intent): boolean {

    const intentId = props.intentId;

    const BUILT_INS: string[] = [
        CANCEL_INTENT,
        FIRST_INTENT,
        HELP_INTENT,
        LATEST_INTENT,
        LOOP_OFF_INTENT,
        LOOP_ON_INTENT,
        NEXT_INTENT,
        NO_INTENT,
        PAUSE_INTENT,
        PREVIOUS_INTENT,
        REPEAT_INTENT,
        RESUME_INTENT,
        SHUFFLE_OFF_INTENT,
        SHUFFLE_ON_INTENT,
        START_OVER_INTENT,
        STOP_INTENT,
        YES_INTENT,
        // This one is a special one
        INPUT_UNKNOWN
    ];

    if (BUILT_INS.includes(intentId)) {
        return true;
    }

    // We also check overrides
    if (!!props.nlu && typeof props.nlu === "object" && Object.keys(props.nlu).length > 0) {

        const lex = props.nlu["lex"] || props.nlu["lex-connect"] || props.nlu["alexa"];

        if (lex?.type?.startsWith("AMAZON.")) {
            return true;
        }


        const dialogflow = props.nlu["dialogflow"];

        if (dialogflow?.type?.startsWith("actions.intent")) {
            return true;
        }
    }

    return false
}

/**
 * Determine if the props are for an Intent
 *
 * @public
 */
export function isIntent(props: Handler | Intent): props is Intent {

    if (!props) {
        return false;
    }

    // if not a handler, return true!
    if (!isHandler(props)) {
        return true;
    }

    // if they have utterance patterns, even an empty array, it is true
    if (Array.isArray((props as Intent).utterancePatterns)) {
        return true;
    }

    // built-ins dont need any utterances 
    if (isBuiltInIntent(props)) {
        return true;
    }

    // if they do any kind of override we are going to trust them
    if (!!props.nlu && typeof props.nlu === "object" && Object.keys(props.nlu).length > 0) {
        return true;
    }

    return false;
}
