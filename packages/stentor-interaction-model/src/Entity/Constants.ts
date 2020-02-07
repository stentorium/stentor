/*! Copyright (c) 2019, XAPPmedia */
/*
 * Provides US style phone numbers.
 *
 * Translated to:
 *   @sys.phone-number on Dialogflow
 *   AMAZON.PhoneNumber on Alexa
 */
export const ENTITY_PHONE_NUMBER = "STENTOR.PHONE_NUMBER";
/*
 * Converts numeric words to digits.
 *
 * Translated to:
 *   @sys.cardinal on Dialogflow
 *   AMAZON.Number on Alexa
 *
 * Note, we are not leveraging Dialogflow @sys.number because
 * it contains both cardinal and ordinal number.  AMAZON.Number
 * contains only cardinal numbers (according to the docs.)
 */
export const ENTITY_NUMBER = "STENTOR.NUMBER";
/**
 * Converts numeric words like 1st and tenth to numbers.
 *
 * Translated to:
 *   @sys.ordinal
 *   AMAZON.Ordinal (in public beta)
 */
export const ENTITY_ORDINAL = "STENTOR.ORDINAL";
/*
 * Popular colors
 *
 * Translated to:
 *   @sys.color on Dialogflow
 *   AMAZON.Color on Alexa
 */
export const ENTITY_COLOR = "STENTOR.COLOR";

/*
 * Popular foods
 *
 * Translated to:
 *
 *   AMAZON.Food on Alexa
 */
export const ENTITY_FOOD = "STENTOR.FOOD";
/*
 * Passes through the raw text.
 *
 * Translated to:
 *   @sys.any on Dialogflow
 *   AMAZON.Literal on Alexa
 *
 * @deprecated Use ENTITY_SEARCH_QUERY
 */
export const ENTITY_LITERAL = "STENTOR.LITERAL";
/*
 * Passes through the raw text for search queries.
 *
 * Translated to:
 *   @sys.any on Dialogflow
 *   AMAZON.SearchQuery on Alexa
 */
export const ENTITY_SEARCH_QUERY = "STENTOR.SEARCH_QUERY";
/**
 * Dates
 *
 * Translated to:
 *   @sys.date & @sys.date-period on Dialogflow
 *   AMAZON.DATE on Alexa
 */
export const ENTITY_DATE = "STENTOR.DATE";
/**
 * Time
 *
 * Translated to:
 *   @sys.time & @sys.time-period on Dialogflow
 *   AMAZON.TIME on Alexa
 */
export const ENTITY_TIME = "STENTOR.TIME";
/**
 * Date & Time
 *
 * Translated to:
 *   @sys.date-time on Dialogflow
 *   AMAZON.DATE & AMAZON.TIME on Alexa
 */
export const ENTITY_DATE_TIME = "STENTOR.DATE_TIME";
/**
 * Duration
 *
 * Translated to:
 *   @sys.duration on Dialogflow
 *   AMAZON.Duration on Alexa
 */
export const ENTITY_DURATION = "STENTOR.DURATION";

/**
 * Current list of supported built-in entities.
 */
export const BUILT_IN: string[] = [
    ENTITY_COLOR,
    ENTITY_DATE,
    ENTITY_DATE_TIME,
    ENTITY_DURATION,
    ENTITY_NUMBER,
    ENTITY_ORDINAL,
    ENTITY_PHONE_NUMBER,
    ENTITY_SEARCH_QUERY,
    ENTITY_TIME
];

/**
 * Current list of supported extensible built-in entities
 */
export const EXTENSIBLE_BUILT_IN: string[] = [ENTITY_COLOR];
