/*! Copyright (c) 2019, XAPPmedia */
/**
 * Dialogflow follows the language tag specifications here:
 *
 * https://tools.ietf.org/html/rfc2616#section-3.10
 *
 * Alexa does not specify a specification it falls under, but so far,
 * all locales fit the same pattern.
 *
 * And while the specification says that it can be only ALPHA characters, there is at least
 * one language tag in Google that does not follow this pattern (es-419).  So we must include
 * numbers as well for any subtag.
 */
export const LOCALE_REGEX = /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/;
export const LANGUAGE_REGEX = /^[a-zA-Z]{1,8}$/;
export const DIALECT_REGEX = /^[a-zA-Z]{1,8}-[a-zA-Z0-9]{1,8}(-[a-zA-Z0-9]{1,8})*$/;
