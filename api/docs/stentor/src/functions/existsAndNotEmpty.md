[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / existsAndNotEmpty

# Function: existsAndNotEmpty()

> **existsAndNotEmpty**\<`T`\>(`items`): `boolean`

Defined in: packages/stentor-utils/lib/array.d.ts:42

Quick function to see if the array exists and has a length
greater than 0.

You would use this instead of writing `myArray && myArray.length > 0`,
which increases your cyclomatic complexity.

## Type Parameters

### T

`T`

## Parameters

### items

`T`[]

## Returns

`boolean`
