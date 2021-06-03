/*! Copyright (c) 2019, XAPPmedia */
import { Locale, Localizable } from "stentor-models";
import { getAttributeFromLocale } from "./getAttributeFromLocale";
/**
 * This will return the property at the given attribute based on the locale provided.
 *
 * For example, if locale is undefined, then the default attribute will be returned.
 *
 * If locale is a Language, then the overriding locales will be searched.  If found at that language, it will be returned.
 * If not found at that language, then the default will be returned.
 *
 * If locale is a dialect, then the overriding dialect will be searched. If found at that dialect, it will be returned.
 * If not found at that dialect, then the overriding language of the dialect will be searched. If found at that language, it will be returned.
 * If not found at that language, then the default will be returned.
 *
 * @param {keyof O} attribute
 * @param {LocaleObj<O>} localeObj
 * @returns {Return}
 */
export function getAttribute<L extends Localizable<any>, Return>(
    attribute?: keyof L,
    locale?: Locale,
    localeObj?: L
): Return {
    if (!attribute || !localeObj) {
        return undefined;
    }
    return getAttributeFromLocale(attribute, localeObj, locale, localeObj.locales);
}
