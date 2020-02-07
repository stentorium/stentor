/*! Copyright (c) 2019, XAPPmedia */
import { LanguageTag, Locale } from "stentor-models";
import { existsAndNotEmpty, uniq } from "stentor-utils";
import { getLanguageOfLocale } from "./getLanguageOfLocale";
import { isLanguage, isLanguageTag } from "./Guards";

/**
 * From the provided Locale (either "en" or "en-US") and list of support language tags ("en-US"),
 * this will pull out the language tags.
 *
 * The supported language tags are for the platform you are trying to build for.
 *
 * @param locale
 * @param supported
 */
export function getLanguageTags(locale: Locale, supported: LanguageTag[]): LanguageTag[] {
    const languageTags: LanguageTag[] = [];

    if (isLanguage(locale)) {
        // Pull out the language tags from the subset
        if (existsAndNotEmpty(supported)) {
            supported.forEach(tag => {
                const language = getLanguageOfLocale(tag);
                if (locale === language) {
                    languageTags.push(tag);
                }
            });
        }
    } else if (isLanguageTag(locale)) {
        if (supported.includes(locale)) {
            languageTags.push(locale);
        }
    }

    return uniq(languageTags);
}
