/*! Copyright (c) 2019, XAPPmedia */
import { LinkOutSuggestion, SuggestionTypes } from "stentor-models";

/**
 * Determines if the suggestion is a LinkOutSuggestion
 *
 * @export
 * @param {(LinkOutSuggestion | Suggestion)} suggestion
 * @returns {suggestion is LinkOutSuggestion}
 */
export function isLinkoutSuggestion(suggestion: SuggestionTypes): suggestion is LinkOutSuggestion {
    if (!suggestion) {
        return false;
    }

    return (suggestion as LinkOutSuggestion).url !== undefined;
}
