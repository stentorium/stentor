/*! Copyright (c) 2019, XAPPmedia */
import { Locale, Localizable } from "../Locale";
import { Slot, SlotTypeMap } from "../Slot";
import { LangCode } from "./Types";

export type LocaleSpecificIntent = Partial<Pick<Intent, "slots" | "utterancePatterns" | "substitutions">>;

/**
 * These are coordinates for the placement of the intent when
 * placed in a graph with other intents.
 *
 * @export
 * @interface GraphCoords
 */
export interface GraphCoords {
    x?: number;
    y?: number;
}

/**
 * Intents represent the request of a user.
 *
 * @export
 * @interface Intent
 */
export interface Intent extends Localizable<LocaleSpecificIntent> {
    /**
     * The organization ID for the app of which this intent belongs.
     *
     * @type {string}
     * @memberof Intent
     */
    organizationId: string;
    /**
     * The ID for the app the intent belongs to.
     *
     * @type {string}
     * @memberof Intent
     */
    appId: string;
    /**
     * The ID of the intent, typically a combination of the name
     * and a random string.
     *
     * @type {string}
     * @memberof Intent
     */
    intentId: string;
    /**
     * Dialogflow keeps track of individual intents by a unique ID.
     *
     * @type {string}
     * @memberof Intent
     */
    dialogflowId?: string;
    /**
     * The human readable name of the intent.
     *
     * @type {string}
     * @memberof Intent
     */
    name?: string;
    /**
     * ISO-8601 string of when the intent was created.
     *
     * @type {string}
     * @memberof Intent
     */
    createdAt?: string;
    /**
     * The slots defined within the utterance patterns
     * and their Entity types.
     *
     * @type {Slot[]}
     * @memberof Intent
     */
    slots?: Slot[];
    /**
     * A map of the slot type definition.
     *
     * @deprecated Use Entities
     * @type {SlotTypeMap}
     * @memberof Intent
     */
    slotTypes?: SlotTypeMap;
    /**
     * Substitutions can be used to clean up your utterance pattern to make it more readable.
     *
     * For example, you may often have a lot of slots at the beginning of every pattern:
     *
     * `{${acknowledge}|${yes_no}|}${prefix} the rest of the utterance`
     *
     * This then moves the actual meat of the pattern to the right when really you don't care about the
     * above except that it is there.
     *
     * Substitutions will allow you to replace these, just at the local intent level, to make it easier to read.
     *
     * { ["_PREFIX_"]}: "{${acknowledge}|${yes_no}|}${prefix}" }
     *
     * So it then becomes:
     *
     * `${_PREFIX_} the rest of the utterance`
     *
     * It also allows you to change the substitution value and have it updated across all
     * the utterance patterns where the substitution exists.
     *
     * When compiling the patterns, the substitution is applied first before expanding.
     *
     * @type {{[pattern: string]: string}}
     * @memberof Intent
     */
    substitutions?: { [pattern: string]: string };
    /**
     * An array of utterance patterns.
     *
     * For more information on syntax see https://github.com/alexa-js/alexa-utterances
     *
     * @see https://github.com/alexa-js/alexa-utterances
     * @type {string[]}
     * @memberof Intent
     */
    utterancePatterns?: string[];
    /**
     * The language code.  Defaults to "en-US".
     *
     * @type {string}
     * @memberof Intent
     * @deprecated This is no longer in use (it was in fact, never used).  Favor @defaultLocale and @locales instead.
     */
    langCode?: LangCode;
    /**
     * UI position coordinates for graphing.
     *
     * @type {GraphCoords}
     * @memberof Intent
     */
    graphCoords?: GraphCoords;
    /**
     * This is the locale in which the app is primarily focused on. The intent will publish to this locale with the
     * data provided. Items which can be overwritten can be placed in the "locale" section with the locale necessary.
     *
     * Default: "en"
     *
     * @type {Locale}
     * @memberof Intent
     */
    defaultLocale?: Locale;
    /**
     * This is a series of locales that the apps supports.  These can override the
     * items that are in the original Intent.  The items in the main intent are used as defaults if they
     * are not provided by this locale.
     *
     * Locales are hierarchical. Languages will override the default attributes. Dialects will override the
     * languages.
     *
     * @type {Partial<Record<Locale, AppLocale>>}
     * @memberof Intent
     */
    locales?: Partial<Record<Locale, LocaleSpecificIntent>>;
}
