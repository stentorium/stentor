[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-response/src](../README.md) / TemplatedResponseOutput

# Interface: TemplatedResponseOutput\<T\>

Defined in: [packages/stentor-response/src/TemplatedResponseOutput.ts:6](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-response/src/TemplatedResponseOutput.ts#L6)

A response object which contains all the necessary information to communicate
a particular response for multiple surfaces.

Note: We may want to change this to SimpleResponse and then have multiple levels
of this object to also account for cards, lists, etc.

## Extends

- [`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

## Type Parameters

### T

`T`

## Properties

### ssml?

> `optional` **ssml**: `string`

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:16

The SSML

#### Inherited from

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md).[`ssml`](../../../stentor/src/interfaces/ResponseOutput.md#ssml)

***

### ~~textToSpeech?~~

> `optional` **textToSpeech**: `string`

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:22

Text to speech

#### Deprecated

Do not use, instead use both ssml and displayText

#### Inherited from

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md).[`textToSpeech`](../../../stentor/src/interfaces/ResponseOutput.md#texttospeech)

***

### displayText?

> `optional` **displayText**: `string`

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:26

Used only display/chat capable surfaces

#### Inherited from

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md).[`displayText`](../../../stentor/src/interfaces/ResponseOutput.md#displaytext)

***

### html?

> `optional` **html**: `string`

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:34

**`Beta`**

Sanitized HTML, suitable for displaying within a web environment.

This is typically generated from the displayText based on markdown found within.

#### Inherited from

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md).[`html`](../../../stentor/src/interfaces/ResponseOutput.md#html)

***

### suggestions?

> `optional` **suggestions**: `SuggestionTypes`[]

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:40

Used where suggestions can be displayed to the user.

Note: These only apply to prompts, not reprompts.

#### Inherited from

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md).[`suggestions`](../../../stentor/src/interfaces/ResponseOutput.md#suggestions)

***

### defaultLocale?

> `optional` **defaultLocale**: [`Locale`](../../../stentor-locales/src/type-aliases/Locale.md)

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:44

The locale for the response, defaults to "en"

#### Inherited from

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md).[`defaultLocale`](../../../stentor/src/interfaces/ResponseOutput.md#defaultlocale)

***

### locales?

> `optional` **locales**: `Partial`\<`Record`\<[`Locale`](../../../stentor-locales/src/type-aliases/Locale.md), `LocaleSpecificResponseOutput`\>\>

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:48

The language code for the response output.

#### Inherited from

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md).[`locales`](../../../stentor/src/interfaces/ResponseOutput.md#locales)

***

### data?

> `optional` **data**: `T`

Defined in: [packages/stentor-response/src/TemplatedResponseOutput.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-response/src/TemplatedResponseOutput.ts#L7)
