/*! Copyright (c) 2019, XAPPmedia */
import { Language, Locale } from "stentor-models";
import { LOCALE_REGEX } from "./Constants";

/**
 * Returns the language (primary tag) for a specific locale (language) code.
 *
 * @param {Locale} locale
 */
export function getLanguageOfLocale(locale: Locale): Language {
    return LOCALE_REGEX.test(locale) ? (locale.slice(0, 2) as Language) : undefined;
}
