/*! Copyright (c) 2019, XAPPmedia */
import { Locale, Localizable } from "../Locale";
import { Slot, SlotTypeMap } from "../Slot";
import { LangCode } from "./Types";

export type LocaleSpecificIntent = Partial<Pick<Intent, "slots" | "utterancePatterns" | "substitutions">>;

/**
 * These are coordinates for the placement of the intent when
 * placed in a graph with other intents.
 */
export interface GraphCoords {
    x?: number;
    y?: number;
}

/**
 * Intents represent the request of a user.
 *
 * @public
 */
export interface Intent extends Localizable<LocaleSpecificIntent> {
    /**
     * The organization ID for the app of which this intent belongs.
     */
    organizationId: string;
    /**
     * The ID for the app the intent belongs to.
     */
    appId: string;
    /**
     * The ID of the intent, typically a combination of the name
     * and a random string.
     */
    intentId: string;
    /**
     * Dialogflow keeps track of individual intents by a unique ID.
     * 
     * @deprecated This field is being phased out. 
     */
    dialogflowId?: string;
    /**
     * The human readable name of the intent.
     */
    name?: string;
    /**
     * ISO-8601 string of when the intent was created.
     */
    createdAt?: string;
    /**
     * The slots defined within the utterance patterns
     * and their Entity types.
     */
    slots?: Slot[];
    /**
     * A map of the slot type definition.
     *
     * @deprecated Use Entities
     */
    slotTypes?: SlotTypeMap;
    /**
     * Substitutions can be used to clean up your utterance pattern to make it more readable.
     *
     * For example, you may often have a lot of slots at the beginning of every pattern:
     *
     * `\{$\{acknowledge\}|$\{yes_no\}|\}$\{prefix\} the rest of the utterance`
     *
     * This then moves the actual meat of the pattern to the right when really you don't care about the
     * above except that it is there.
     *
     * Substitutions will allow you to replace these, just at the local intent level, to make it easier to read.
     *
     * \{ ["_PREFIX_"]\}: "\{$\{acknowledge\}|$\{yes_no\}|\}$\{prefix\}" \}
     *
     * So it then becomes:
     *
     * `$\{_PREFIX_\} the rest of the utterance`
     *
     * It also allows you to change the substitution value and have it updated across all
     * the utterance patterns where the substitution exists.
     *
     * When compiling the patterns, the substitution is applied first before expanding.
     */
    substitutions?: { [pattern: string]: string };
    /**
     * An array of utterance patterns.
     *
     * For more information on syntax see {@link https://github.com/alexa-js/alexa-utterances}
     */
    utterancePatterns?: string[];
    /**
     * The language code.  Defaults to "en-US".
     *
     * @defaultValue "en-US"
     * @deprecated This is no longer in use (it was in fact, never used).  Favor {@link Intent.defaultLocale} and {@link Intent.locales} instead.
     */
    langCode?: LangCode;
    /**
     * UI position coordinates for graphing.
     *
     */
    graphCoords?: GraphCoords;
    /**
     * This is the locale in which the app is primarily focused on. The intent will publish to this locale with the
     * data provided. Items which can be overwritten can be placed in the "locale" section with the locale necessary.
     *
     * @defaultValue "en"
     */
    defaultLocale?: Locale;
    /**
     * Contexts the must be active to have this intent be weighted more heavily or selected.
     * 
     * For Amazon Lex, the contexts are required to be selected.  
     * 
     * {@link https://docs.aws.amazon.com/lex/latest/dg/API_PutIntent.html#lex-PutIntent-request-inputContexts}
     * 
     * For Dialogflow ES, these are more heavily weighted towards matching.
     * 
     * {@link https://cloud.google.com/dialogflow/es/docs/contexts-input-output#input_contexts}
     * {@link https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/projects.agent.intents#Intent}
     */
    contexts?: { name: string }[];
    /**
     * NLU specific metadata used when translating the intentId to a NLU specific type.
     * 
     * Use to override the type for a specific NLU. 
     * 
     * Additional metadata can be appended that can be used for translating the type.
     */
    nlu?: { [nlu: string]: { type: string, [key: string]: any } };
    /**
     * This is a series of locales that the apps supports.  These can override the
     * items that are in the original Intent.  The items in the main intent are used as defaults if they
     * are not provided by this locale.
     *
     * Locales are hierarchical. Languages will override the default attributes. Dialects will override the
     * languages.
     */
    locales?: Partial<Record<Locale, LocaleSpecificIntent>>;
}
