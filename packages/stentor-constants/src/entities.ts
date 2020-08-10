/*! Copyright (c) 2020, XAPPmedia */

/**
 * Provides US style phone numbers.
 * 
 * en-US locale support only.
 *
 * Translated to:
 *   @sys.phone-number on Dialogflow
 *   AMAZON.PhoneNumber on Alexa & LEX
 *   phonenumber on LUIS
 * 
 * @public
 * @beta Due to AMAZON.PhoneNumber being in beta
 */
export const ENTITY_PHONE_NUMBER = "STENTOR.PHONE_NUMBER";
/**
 * Converts numeric words to digits.
 *
 * Translated to:
 *   @sys.cardinal on Dialogflow
 *   AMAZON.NUMBER on Alexa & LEX
 *   number on LUIS
 *
 * Note, we are not leveraging Dialogflow @sys.number because
 * it contains both cardinal and ordinal number.  AMAZON.Number
 * contains only cardinal numbers (according to the docs.)
 * 
 * @public
 */
export const ENTITY_NUMBER = "STENTOR.NUMBER";
/**
 * Converts numeric words like 1st and tenth to numbers.
 *
 * Translated to:
 *   @sys.ordinal
 *   AMAZON.Ordinal (in public beta) on Amazon & LEX
 *   ordinal on LUIS, not ordinalV2 since it adds relative references like "next"
 * 
 * @public
 * @beta Due to Amazon.Ordinal being in public beta
 */
export const ENTITY_ORDINAL = "STENTOR.ORDINAL";
/**
 * Popular colors
 *
 * Translated to:
 *   @sys.color on Dialogflow
 *   AMAZON.Color on Alexa
 * 
 * Not supported on LEX, or LUIS
 * 
 * @public
 */
export const ENTITY_COLOR = "STENTOR.COLOR";
/**
 * Popular foods
 *
 * Translated to:
 *   AMAZON.Food on Alexa
 * 
 * Not supported on LEX, Dialogflow or LUIS
 * 
 * @public
 * @beta
 */
export const ENTITY_FOOD = "STENTOR.FOOD";
/**
 * Passes through the raw text.
 *
 * Translated to:
 *   @sys.any on Dialogflow
 *   AMAZON.Literal on Alexa
 *   Pattern.any on LUIS
 *
 * Not supported on LEX
 * 
 * @deprecated Use ENTITY_SEARCH_QUERY
 * @public
 */
export const ENTITY_LITERAL = "STENTOR.LITERAL";
/**
 * Passes through the raw text for search queries.
 *
 * Translated to:
 *   @sys.any on Dialogflow
 *   AMAZON.SearchQuery on Alexa
 *   Pattern.any on LUIS
 * 
 * Not supported on LEX
 * 
 * @public
 */
export const ENTITY_SEARCH_QUERY = "STENTOR.SEARCH_QUERY";
/**
 * Dates
 *
 * Translated to:
 *   @sys.date & @sys.date-period on Dialogflow
 *   AMAZON.DATE on Alexa & LEX
 * 
 * Not supported on LUIS
 * 
 * @public
 * @beta
 */
export const ENTITY_DATE = "STENTOR.DATE";
/**
 * Time
 *
 * Translated to:
 *   @sys.time & @sys.time-period on Dialogflow
 *   AMAZON.TIME on Alexa & LEX
 * 
 * Not supported on LUIS
 * 
 * @public
 * @beta
 */
export const ENTITY_TIME = "STENTOR.TIME";
/**
 * Date & Time
 *
 * Translated to:
 *   @sys.date-time on Dialogflow
 *   AMAZON.DATE & AMAZON.TIME on Alexa & LEX
 *   datetimeV2 on LUIS
 * 
 * @beta
 * @public
 */
export const ENTITY_DATE_TIME = "STENTOR.DATE_TIME";
/**
 * Duration
 *
 * Translated to:
 *   @sys.duration on Dialogflow
 *   AMAZON.DURATION on Alexa & LEX
 *   
 * Not supported on LUIS
 * 
 * @public
 * @beta
 */
export const ENTITY_DURATION = "STENTOR.DURATION";
/**
 * Units of weight, both imperial and metric, such as kilogram and pounds.
 * 
 * Supports text user interfaces.
 * 
 * Translated to:
 *   @sys.unit-weight-name on Dialogflow
 *   AMAZON.WeightUnit on LEX
 *   
 * Not supported by Alexa or LUIS
 * 
 * @public
 * @beta
 */
export const ENTITY_WEIGHT_UNIT = "STENTOR.WEIGHT_UNIT";
/**
 * Units of speed, both imperial and metric, such as KPH and miles per hour.
 * 
 * Supports text user interfaces.
 * 
 * Translated to:
 *   @sys.unit-speed-name on Dialogflow
 *   AMAZON.SpeedUnit on LEX
 * 
 * Not supported by Alexa or LUIS
 * 
 * @public
 * @beta
 */
export const ENTITY_SPEED_UNIT = "STENTOR.SPEED_UNIT";
/**
 * Number and percent sign, supports 50% and 50 percent.
 * 
 * Supports text user interfaces
 * 
 * Translated to:
 *   @sys.percentage on Dialogflow
 *   AMAZON.Percentage on LEX
 *   percentage on LUIS
 * 
 * Not supported on Alexa
 * 
 * @public
 * @beta
 */
export const ENTITY_PERCENTAGE = "STENTOR.PERCENTAGE";
/**
 * Email address
 * 
 * Supports text user interface
 * 
 * Translated to:
 *   @sys.email on Dialogflow
 *   AMAZON.EmailAddress on LEX
 *   email on LUIS
 * 
 * Not supported on Alexa
 */
export const ENTITY_EMAIL_ADDRESS = "STENTOR.EMAIL_ADDRESS";

/**
 * People
 * 
 * Names of people, both fictional and non
 * 
 * Translated to:
 *   @sys.person on Dialogflow
 *   AMAZON.Person on Amazon Alexa & AWS LEX
 *   PersonName on Luis
 * 
 */
export const ENTITY_PERSON = "STENTOR.PERSON";

