/*! Copyright (c) 2019, XAPPmedia */
import { Locale, Localizable } from "stentor-models";
import { getAttributeFromLocale } from "./getAttributeFromLocale";

/**
 * Allows one to omit certain keys in the interface.
 *
 * Example:
 *
 * interface First {
 *    param1: string;
 *    param2: string;
 *    param3: string;
 * }
 *
 * type Second = Omit<First, "param2">
 *
 * let second: Second = { param1: "Hello", param3: "World" };
 * second.param2 = "There"; // Compile error.
 *
 */
export type Omit<T extends object, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * This will flatten a LocaleObj and return the object with the overridden attributes.
 *
 * @export
 * @template L
 * @template Return
 */
export function localize<L extends Localizable<any>>(localeObj?: L, locale?: Locale): Omit<L, keyof Localizable<any>> {
    if (!localeObj) {
        return undefined;
    }
    interface ExtendedLocaleObj extends Localizable<ExtendedLocaleObj> {
        [key: string]: any;
    }
    const { locales, defaultLocale, ...remaining } = localeObj as ExtendedLocaleObj;

    for (const attribute of Object.keys(remaining)) {
        remaining[attribute] = getAttributeFromLocale(attribute, remaining, locale, locales);
    }

    return remaining as Omit<L, keyof Localizable<any>>;
}
