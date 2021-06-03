/*! Copyright (c) 2019, XAPPmedia */
import { Language, LanguageTag, Locale } from "stentor-models";

/**
 * Updates a language code to the recommended case, lower case language codes and upper case country codes.
 *
 * NOTE! Only tags that consist of language-CountryCode are supported, others will be passed through.
 *
 * @see https://tools.ietf.org/html/rfc1766
 *
 * @param {string} dirty
 * @returns {StentorLocale}
 */
export function updateToRecommendedCase(dirty: string): Locale | undefined {
    if (typeof dirty !== "string") {
        return dirty;
    }

    // First split
    const split = dirty.split("-");

    if (split.length === 1) {
        return dirty as Language;
    } else if (split.length === 2) {
        return `${split[0].toLowerCase()}-${split[1].toUpperCase()}` as LanguageTag;
    } else {
        // Something we don't know what it is like zh-Hant-HK
        // best to leave it alone
        return dirty as any;
    }
}
