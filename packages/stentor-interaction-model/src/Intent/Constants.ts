/*! Copyright (c) 2019, XAPPmedia */

import {
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
    YES_INTENT
} from "stentor-constants";

import { Polyfill } from "./Polyfill";
import {
    CANCEL_POLYFILL,
    HELP_POLYFILL,
    LOOP_OFF_POLYFILL,
    LOOP_ON_POLYFILL,
    NEXT_POLYFILL,
    NO_POLYFILL,
    PAUSE_POLYFILL,
    PREVIOUS_POLYFILL,
    REPEAT_POLYFILL,
    RESUME_POLYFILL,
    SHUFFLE_OFF_POLYFILL,
    SHUFFLE_ON_POLYFILL,
    START_OVER_POLYFILL,
    STOP_POLYFILL,
    YES_POLYFILL
} from "./polyfills";

// Export to prevent API from breaking
export {
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
    YES_INTENT
}

export const BUILT_IN_INTENT_POLYFILLS: Polyfill[] = [
    CANCEL_POLYFILL,
    HELP_POLYFILL,
    LOOP_OFF_POLYFILL,
    LOOP_ON_POLYFILL,
    NEXT_POLYFILL,
    NO_POLYFILL,
    PAUSE_POLYFILL,
    PREVIOUS_POLYFILL,
    REPEAT_POLYFILL,
    RESUME_POLYFILL,
    SHUFFLE_OFF_POLYFILL,
    SHUFFLE_ON_POLYFILL,
    START_OVER_POLYFILL,
    STOP_POLYFILL,
    YES_POLYFILL
];
