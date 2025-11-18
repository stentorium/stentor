[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ResponseOutput

# Interface: ResponseOutput

Defined in: [packages/stentor-models/src/Response/ResponseOutput.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/ResponseOutput.ts#L16)

A response object which contains all the necessary information to communicate
a particular response for multiple surfaces.

Note: We may want to change this to SimpleResponse and then have multiple levels
of this object to also account for cards, lists, etc.

## Extends

- [`Localizable`](Localizable.md)\<[`LocaleSpecificResponseOutput`](../type-aliases/LocaleSpecificResponseOutput.md)\>

## Properties

### ssml?

> `optional` **ssml**: `string`

Defined in: [packages/stentor-models/src/Response/ResponseOutput.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/ResponseOutput.ts#L20)

The SSML

***

### ~~textToSpeech?~~

> `optional` **textToSpeech**: `string`

Defined in: [packages/stentor-models/src/Response/ResponseOutput.ts:26](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/ResponseOutput.ts#L26)

Text to speech

#### Deprecated

Do not use, instead use both ssml and displayText

***

### displayText?

> `optional` **displayText**: `string`

Defined in: [packages/stentor-models/src/Response/ResponseOutput.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/ResponseOutput.ts#L30)

Used only display/chat capable surfaces

***

### html?

> `optional` **html**: `string`

Defined in: [packages/stentor-models/src/Response/ResponseOutput.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/ResponseOutput.ts#L38)

**`Beta`**

Sanitized HTML, suitable for displaying within a web environment.

This is typically generated from the displayText based on markdown found within.

***

### suggestions?

> `optional` **suggestions**: [`SuggestionTypes`](../type-aliases/SuggestionTypes.md)[]

Defined in: [packages/stentor-models/src/Response/ResponseOutput.ts:44](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/ResponseOutput.ts#L44)

Used where suggestions can be displayed to the user.

Note: These only apply to prompts, not reprompts.

***

### defaultLocale?

> `optional` **defaultLocale**: [`Locale`](../type-aliases/Locale.md)

Defined in: [packages/stentor-models/src/Response/ResponseOutput.ts:48](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/ResponseOutput.ts#L48)

The locale for the response, defaults to "en"

#### Overrides

[`Localizable`](Localizable.md).[`defaultLocale`](Localizable.md#defaultlocale)

***

### locales?

> `optional` **locales**: `Partial`\<`Record`\<[`Locale`](../type-aliases/Locale.md), [`LocaleSpecificResponseOutput`](../type-aliases/LocaleSpecificResponseOutput.md)\>\>

Defined in: [packages/stentor-models/src/Response/ResponseOutput.ts:52](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/ResponseOutput.ts#L52)

The language code for the response output.

#### Overrides

[`Localizable`](Localizable.md).[`locales`](Localizable.md#locales)
