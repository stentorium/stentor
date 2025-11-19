[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / wordToNumber

# Function: wordToNumber()

> **wordToNumber**(`word`): `string` \| `number`

Defined in: [packages/stentor-utils/src/number.ts:170](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/number.ts#L170)

Converts a word like "one hundred" to the number 100.

Words that are not numbers are passed through.

## Parameters

### word

`string`

Word to convert to a number

## Returns

`string` \| `number`

Returns either the original value or the number that was converted.
