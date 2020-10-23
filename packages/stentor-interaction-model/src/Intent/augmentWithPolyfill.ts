/*! Copyright (c) 2019, XAPPmedia */
import { Intent } from "stentor-models";
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
    FIRST_POLYFILL,
    HELP_POLYFILL,
    LATEST_POLYFILL,
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

/**
 * Polyfills the built-in intents with missing utterance patterns.
 *
 * @export
 * @param {Intent} intent
 * @returns {Intent | undefined}
 */
export function augmentWithPolyfill(intent: Intent): Intent | undefined {
    if (!intent) {
        return undefined;
    }

    const intentCopy: Intent = { ...intent };

    let polyfill: Polyfill;

    switch (intent.intentId) {
        case CANCEL_INTENT:
            polyfill = CANCEL_POLYFILL;
            break;
        case FIRST_INTENT:
            polyfill = FIRST_POLYFILL;
            break;
        case HELP_INTENT:
            polyfill = HELP_POLYFILL;
            break;
        case LATEST_INTENT:
            polyfill = LATEST_POLYFILL;
            break;
        case LOOP_OFF_INTENT:
            polyfill = LOOP_OFF_POLYFILL;
            break;
        case LOOP_ON_INTENT:
            polyfill = LOOP_ON_POLYFILL;
            break;
        case NEXT_INTENT:
            polyfill = NEXT_POLYFILL;
            break;
        case NO_INTENT:
            polyfill = NO_POLYFILL;
            break;
        case PAUSE_INTENT:
            polyfill = PAUSE_POLYFILL;
            break;
        case PREVIOUS_INTENT:
            polyfill = PREVIOUS_POLYFILL;
            break;
        case REPEAT_INTENT:
            polyfill = REPEAT_POLYFILL;
            break;
        case RESUME_INTENT:
            polyfill = RESUME_POLYFILL;
            break;
        case SHUFFLE_OFF_INTENT:
            polyfill = SHUFFLE_OFF_POLYFILL;
            break;
        case SHUFFLE_ON_INTENT:
            polyfill = SHUFFLE_ON_POLYFILL;
            break;
        case STOP_INTENT:
            polyfill = STOP_POLYFILL;
            break;
        case YES_INTENT:
            polyfill = YES_POLYFILL;
            break;
        case START_OVER_INTENT:
            polyfill = START_OVER_POLYFILL;
            break;
        default:
            polyfill = undefined;
            break;
    }

    if (polyfill) {
        // Pull in the name if it doesn't exist
        if (!intentCopy.name) {
            intentCopy.name = polyfill.name;
        }
        // And add the utterance patterns.
        const existingUtterancePatterns: string[] = Array.isArray(intentCopy.utterancePatterns)
            ? intentCopy.utterancePatterns
            : [];
        intentCopy.utterancePatterns = existingUtterancePatterns.concat(polyfill.utterancePatterns);
    }

    return intentCopy;
}
