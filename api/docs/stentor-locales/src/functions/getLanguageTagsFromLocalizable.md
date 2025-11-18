[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-locales/src](../README.md) / getLanguageTagsFromLocalizable

# Function: getLanguageTagsFromLocalizable()

> **getLanguageTagsFromLocalizable**\<`O`\>(`obj`, `supported`): [`LanguageTag`](../type-aliases/LanguageTag.md)[]

Defined in: [packages/stentor-locales/src/getLanguageTagsFromLocalizable.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-locales/src/getLanguageTagsFromLocalizable.ts#L16)

This will return all the locales that are currently defined in the object including those
in the default that are also found in the passed in supported locales.

For example, the supported locales are "en-US", "es-ES", & "en-CA" and the localized object has
a defaultLocale of "es" and support for "en-US" on the locales.  You will then get an array
of "es-ES" (from the defaultLocale) and "en-US" (from the locale object).

NOTE: If a defaultLocale is not defined on the object, "en" is used.

## Type Parameters

### O

`O` *extends* `object`

## Parameters

### obj

`Localizable`\<`O`\>

### supported

[`LanguageTag`](../type-aliases/LanguageTag.md)[]

## Returns

[`LanguageTag`](../type-aliases/LanguageTag.md)[]
