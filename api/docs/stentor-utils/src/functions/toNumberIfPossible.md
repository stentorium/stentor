[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / toNumberIfPossible

# Function: toNumberIfPossible()

> **toNumberIfPossible**\<`T`\>(`potentialNumber`): `number` \| `T`

Defined in: [packages/stentor-utils/src/string/toNumberIfPossible.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/string/toNumberIfPossible.ts#L12)

Converts to a number if possible otherwise it passes it through.

This preserves Dates and booleans.  If true is passed in, true is passed out.
Additionally, if an empty string is passed, it passes it through instead of
turning it into a number.

## Type Parameters

### T

`T`

## Parameters

### potentialNumber

`T`

## Returns

`number` \| `T`
