/*! Copyright (c) 2019, XAPPmedia */
import { Locale } from "./Locale";
export declare type LocaleObject = object;
/**
 * An object that has a default locale and separate localalized versions.
 */
export interface Localizable<O extends LocaleObject> {
    defaultLocale?: Locale;
    locales?: Partial<Record<Locale, Partial<O>>>;
}
