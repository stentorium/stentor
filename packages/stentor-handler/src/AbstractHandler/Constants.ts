/*! Copyright (c) 2019, XAPPmedia */
import {
    InputUnknownStrategyGlobal,
    InputUnknownStrategyGoogle,
    InputUnknownStrategyReprompt
} from "stentor-models";

import { BaseHandlerType } from "./Types";

/**
 * DO NOT CHANGE THE VALUES OF THE STRING CONSTANTS
 * THINGS WILL BREAK BECAUSE THEY ALIGN TO STRINGS
 * IN THE DATABASE
 */

// Audio Player

// Media

// In Session
export const BASE_HANDLER_TYPE: BaseHandlerType = "HandlerIntent";

// Logic

// Custom

// InputUnknown Strategies

/* Calls the global InputUnknown handler */
export const INPUT_UNKNOWN_STRATEGY_GLOBAL: InputUnknownStrategyGlobal = "GLOBAL";
/* Follows Google's recommended best practice for erroneous inputs */
export const INPUT_UNKNOWN_STRATEGY_GOOGLE: InputUnknownStrategyGoogle = "GOOGLE";
/* Just repeats the reprompt from the previous response */
export const INPUT_UNKNOWN_STRATEGY_REPROMPT: InputUnknownStrategyReprompt = "REPROMPT";

// InputUnknown Responses
export const INPUT_UNKNOWN_RESPONSE: string[] = [
    "I didn't get that. Can you say it again?",
    "I missed what you said. Say it again?",
    "Sorry, could you say that again?",
    "Sorry, can you say that again?",
    "Can you say that again?",
    "Sorry, I didn't get that.",
    "Sorry, what was that?",
    "One more time?",
    "What was that?",
    "Say that again?",
    "I didn't get that.",
    "I missed that."
];
