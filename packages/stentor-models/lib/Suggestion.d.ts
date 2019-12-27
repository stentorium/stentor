/*! Copyright (c) 2019, XAPPmedia */
export declare type SuggestionTypes = SimpleSuggestion | SuggestionObjectTypes;
export declare type SuggestionObjectTypes = Suggestion | LinkOutSuggestion;
export declare type SimpleSuggestion = string;
/**
 * Suggested responses that a user can tap.
 *
 * The title has a limit of 25 characters.
 *
 * Only Google Assistant at the moment.
 *
 * @export
 * @interface Suggestion
 */
export interface Suggestion {
    title: string;
}
/**
 * Suggestion chip that links out to an App or Website.  Ownership of the
 * URL must be validated in the Actions on Google developer console or the suggestion will not
 * be shown.
 *
 * The title has a limit of 20 characters, note this is different from when
 * it is a normal suggestion
 *
 * Only Google Assistant at the moment.
 *
 * @export
 * @interface LinkOutSuggestion
 * @extends {Suggestion}
 */
export interface LinkOutSuggestion extends Suggestion {
    url: string;
}
