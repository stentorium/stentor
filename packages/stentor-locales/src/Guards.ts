/*! Copyright (c) 2019, XAPPmedia */
import { Language, LanguageTag, Locale } from "stentor-models";
import { DIALECT_REGEX, LANGUAGE_REGEX } from "./Constants";

/**
 * Type guard to determine if the locale is a language.
 *
 * @param {Locale} locale
 * @returns {locale is Language}
 */
export function isLanguage(locale: Locale): locale is Language {
    return LANGUAGE_REGEX.test(locale);
}

/**
 * Type guard to determine if the locale is a language.
 *
 * @param {Locale} locale
 * @returns {locale is Dialect}
 */
export function isLanguageTag(locale: Locale): locale is LanguageTag {
    return DIALECT_REGEX.test(locale);
}
