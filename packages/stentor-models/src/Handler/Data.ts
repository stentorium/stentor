/*! Copyright (c) 2019, XAPPmedia */
import { SuggestionTypes } from "../Suggestion";
import { InputUnknownStrategyGlobal, InputUnknownStrategyGoogle, InputUnknownStrategyReprompt } from "./Types";

/**
 * Base data object for all the handlers
 */
export interface Data {
    /**
     * Fields for modifying all responses
     */
    chat?: {
        /**
         * Chips to use when generating the default responses.  They will be added to all responses.
         */
        suggestionChips?: SuggestionTypes[];
    }
    /**
     * Strategy to use when the handler receives an InputUnknown request.
     *
     * Global requests the global InputUnknownHandler
     * Google's recommended pattern as outlined here: https://designguidelines.withgoogle.com/conversation/conversational-components/errors.html
     * Reprompt uses the reprompt from the previous response.
     */
    inputUnknownStrategy?: InputUnknownStrategyGlobal | InputUnknownStrategyGoogle | InputUnknownStrategyReprompt;
    /**
     * Is the handler available externally through discovery.
     *
     * On Google it means this accessible through Discovery (see {@link https://developers.google.com/actions/sdk/invocation-and-discovery#discovery})
     * and on Alexa CanfulfillIntentRequest (see {@link https://developer.amazon.com/docs/custom-skills/understand-name-free-interaction-for-custom-skills.html})
     */
    accessibleThroughDiscovery?: boolean;
}
