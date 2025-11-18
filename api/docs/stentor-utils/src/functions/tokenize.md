[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / tokenize

# Function: tokenize()

> **tokenize**(`message?`, `options?`): `string`[]

Defined in: [packages/stentor-utils/src/string/tokenize.ts:577](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/string/tokenize.ts#L577)

Tokenizes a message into an array of words, optionally removing stop words.

Will lowercase the message, trim whitespace, and remove common punctuation.
Normalizes fancy Mac OS/iOS quotes and apostrophes to standard ASCII equivalents.

## Parameters

### message?

`string`

The message to tokenize.

### options?

[`TokenizeOptions`](../interfaces/TokenizeOptions.md) = `{}`

Options for tokenization.

## Returns

`string`[]

An array of tokens (words).
