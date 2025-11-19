[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / splitTextIntoSentences

# Function: splitTextIntoSentences()

> **splitTextIntoSentences**(`text`): `string`[]

Defined in: [packages/stentor-utils/src/text.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/text.ts#L12)

Splits a given text into sentences.
A sentence is considered to end with a period, exclamation mark, or question mark followed by a space or end of string.

If no sentences are found, an array with the original text is returned.

## Parameters

### text

`string`

The input text to be split into sentences.

## Returns

`string`[]

An array of sentences.
