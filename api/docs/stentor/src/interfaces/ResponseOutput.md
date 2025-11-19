[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / ResponseOutput

# Interface: ResponseOutput

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:12

A response object which contains all the necessary information to communicate
a particular response for multiple surfaces.

Note: We may want to change this to SimpleResponse and then have multiple levels
of this object to also account for cards, lists, etc.

## Extends

- `Localizable`\<`LocaleSpecificResponseOutput`\>

## Extended by

- [`TemplatedResponseOutput`](../../../stentor-response/src/interfaces/TemplatedResponseOutput.md)

## Properties

### ssml?

> `optional` **ssml**: `string`

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:16

The SSML

***

### ~~textToSpeech?~~

> `optional` **textToSpeech**: `string`

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:22

Text to speech

#### Deprecated

Do not use, instead use both ssml and displayText

***

### displayText?

> `optional` **displayText**: `string`

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:26

Used only display/chat capable surfaces

***

### html?

> `optional` **html**: `string`

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:34

**`Beta`**

Sanitized HTML, suitable for displaying within a web environment.

This is typically generated from the displayText based on markdown found within.

***

### suggestions?

> `optional` **suggestions**: `SuggestionTypes`[]

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:40

Used where suggestions can be displayed to the user.

Note: These only apply to prompts, not reprompts.

***

### defaultLocale?

> `optional` **defaultLocale**: [`Locale`](../../../stentor-locales/src/type-aliases/Locale.md)

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:44

The locale for the response, defaults to "en"

#### Overrides

`Localizable.defaultLocale`

***

### locales?

> `optional` **locales**: `Partial`\<`Record`\<[`Locale`](../../../stentor-locales/src/type-aliases/Locale.md), `LocaleSpecificResponseOutput`\>\>

Defined in: packages/stentor-models/lib/Response/ResponseOutput.d.ts:48

The language code for the response output.

#### Overrides

`Localizable.locales`
