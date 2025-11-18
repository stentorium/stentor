[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-time/src](../README.md) / findTimeContextualMatch

# Function: findTimeContextualMatch()

> **findTimeContextualMatch**\<`T`\>(`objects`, `context?`): `TimeContextual`\<`T`\>

Defined in: [packages/stentor-time/src/findTimeContextualMatch.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-time/src/findTimeContextualMatch.ts#L14)

Find the best time contextual match from the provided objects.

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### objects

(`T` \| `TimeContextual`\<`T`\>)[]

### context?

#### lastActiveTimestamp

`number`

## Returns

`TimeContextual`\<`T`\>

Returns the best match or undefined if no match is found.
