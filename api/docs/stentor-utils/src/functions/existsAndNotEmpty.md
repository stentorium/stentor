[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / existsAndNotEmpty

# Function: existsAndNotEmpty()

> **existsAndNotEmpty**\<`T`\>(`items`): `boolean`

Defined in: [packages/stentor-utils/src/array.ts:70](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/array.ts#L70)

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
