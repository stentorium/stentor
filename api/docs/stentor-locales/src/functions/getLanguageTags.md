[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-locales/src](../README.md) / getLanguageTags

# Function: getLanguageTags()

> **getLanguageTags**(`locale`, `supported`): [`LanguageTag`](../type-aliases/LanguageTag.md)[]

Defined in: [packages/stentor-locales/src/getLanguageTags.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-locales/src/getLanguageTags.ts#L16)

From the provided Locale (either "en" or "en-US") and list of support language tags ("en-US"),
this will pull out the language tags.

The supported language tags are for the platform you are trying to build for.

## Parameters

### locale

[`Locale`](../type-aliases/Locale.md)

### supported

[`LanguageTag`](../type-aliases/LanguageTag.md)[]

## Returns

[`LanguageTag`](../type-aliases/LanguageTag.md)[]
