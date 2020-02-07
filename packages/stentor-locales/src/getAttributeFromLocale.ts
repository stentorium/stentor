/*! Copyright (c) 2019, XAPPmedia */
import { Locale } from "stentor-models";
import { getLanguageOfLocale } from "./getLanguageOfLocale";

/**
 * Returns the value of the given attribute from the locales object based on the provided locale.
 *
 * If it is not found in the locale object, then it will take it from the default object passed in.
 *
 * @template T
 * @template K
 * @param {K} attribute
 * @param {T} defaultObj
 * @param {Locale} [locale]
 * @param {Partial<Record<StentorLocale, Partial<T>>>} [locales={}]
 * @returns
 */
export function getAttributeFromLocale<T extends object, K extends keyof T>(
    attribute: K,
    defaultObj: T,
    locale?: Locale,
    locales: Partial<Record<Locale, Partial<T>>> = {}
) {
    if (locales[locale] && locales[locale].hasOwnProperty(attribute)) {
        return locales[locale][attribute];
    }

    const language = getLanguageOfLocale(locale);
    if (locales[language] && locales[language].hasOwnProperty(attribute)) {
        return locales[language][attribute];
    }

    return defaultObj[attribute];
}
