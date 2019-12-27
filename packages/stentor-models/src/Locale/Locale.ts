/*! Copyright (c) 2019, XAPPmedia */
export type LanguageTag =
    | "de-DE"
    | "en-AU"
    | "en-CA"
    | "en-GB"
    | "en-IN"
    | "en-US"
    | "es-419"
    | "es-ES"
    | "es-MX"
    | "fr-CA"
    | "fr-FR"
    | "it-IT"
    | "ja-JP"
    | "pt-BR"
    | "zh-CH"
    | "zh-HK"
    | "zh-TW";

export type Language =
    | "da"
    | "de"
    | "en"
    | "es"
    | "fr"
    | "it"
    | "ja"
    | "nl"
    | "no"
    | "pt"
    | "ru"
    | "sv"
    | "th"
    | "tr"
    | "uk"
    | "zh";

/**
 * The different kinds of locales that can be assigned in Stentor.
 */
export type Locale = LanguageTag | Language;
