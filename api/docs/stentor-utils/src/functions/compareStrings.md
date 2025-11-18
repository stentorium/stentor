[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / compareStrings

# Function: compareStrings()

> **compareStrings**(`one`, `two`): `boolean`

Defined in: [packages/stentor-utils/src/string/compare.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/string/compare.ts#L29)

Compares two strings for loose equality.  

It will clean punctuation, lowercase, and remove all stop words for both the strings and then compare them for equality.

It allows a string like "What is conversational AI" to equal "What are conversational AI?".

## Parameters

### one

`string`

### two

`string`

## Returns

`boolean`

True if the sentences are basically the same.
