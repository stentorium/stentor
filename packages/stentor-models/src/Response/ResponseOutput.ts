/*! Copyright (c) 2019, XAPPmedia */
import { Locale, Localizable } from "../Locale";
import { SuggestionTypes } from "../Suggestion";

export type LocaleSpecificResponseOutput = Partial<
    Pick<ResponseOutput, "displayText" | "ssml" | "textToSpeech" | "suggestions">
>;

/**
 * A response object which contains all the necessary information to communicate
 * a particular response for multiple surfaces.
 *
 * Note: We may want to change this to SimpleResponse and then have multiple levels
 * of this object to also account for cards, lists, etc.
 *
 * @export
 * @interface ResponseOutput
 */
export interface ResponseOutput extends Localizable<LocaleSpecificResponseOutput> {
    /**
     * The SSML
     *
     * @type {string}
     * @memberof ResponseOutput
     */
    ssml?: string;
    /**
     * Text to speech
     *
     * @deprecated Do not use, instead use both ssml and displayText
     * @type {string}
     * @memberof ResponseOutput
     */
    textToSpeech?: string;
    /**
     * Used only display/chat capable surfaces
     *
     * @type {string}
     * @memberof ResponseOutput
     */
    displayText?: string;
    /**
     * Used where suggestions can be displayed to the user.
     *
     * Note: These only apply to prompts, not reprompts.
     *
     * @type {SuggestionTypes[]}
     * @memberof ResponseOutput
     */
    suggestions?: SuggestionTypes[];
    /**
     * The locale for the response, defaults to "en"
     *
     * @type {Locale}
     * @memberof ResponseOutput
     */
    defaultLocale?: Locale;
    /**
     * The language code for the response output.
     *
     * @type {string}
     * @memberof ResponseOutput
     */
    locales?: Partial<Record<Locale, LocaleSpecificResponseOutput>>;
}
