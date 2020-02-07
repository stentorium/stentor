/*! Copyright (c) 2019, XAPPmedia */
import { LanguageTag, Locale, LocaleObject, Localizable } from "stentor-models";
import { uniq } from "stentor-utils";
import { getLanguageTags } from "./getLanguageTags";

/**
 * This will return all the locales that are currently defined in the object including those
 * in the default that are also found in the passed in supported locales.
 *
 * For example, the supported locales are "en-US", "es-ES", & "en-CA" and the localized object has
 * a defaultLocale of "es" and support for "en-US" on the locales.  You will then get an array
 * of "es-ES" (from the defaultLocale) and "en-US" (from the locale object).
 *
 * NOTE: If a defaultLocale is not defined on the object, "en" is used.
 *
 * @export
 * @param {(Pick<App, "defaultLocale" | "locales">)} app
 * @returns {Locale[]}
 */
export function getLanguageTagsFromLocalizable<O extends LocaleObject>(obj: Localizable<O>, supported: LanguageTag[]) {
    if (typeof obj !== "object") {
        return [];
    }

    const locales = getLanguageTags(obj.defaultLocale || "en", supported);
    for (const appLocale of Object.keys(obj.locales || {})) {
        locales.push(...getLanguageTags(appLocale as Locale, supported));
    }
    return uniq(locales);
}
