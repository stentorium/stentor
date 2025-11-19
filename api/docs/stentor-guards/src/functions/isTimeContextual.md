[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-guards/src](../README.md) / isTimeContextual

# Function: isTimeContextual()

> **isTimeContextual**\<`T`\>(`item`): `item is TimeContextual<T>`

Defined in: [packages/stentor-guards/src/isTimeContextual.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-guards/src/isTimeContextual.ts#L11)

Guard to determine if the object is time contextual; Scheduled, ActiveWithin, FirstTime,
LastActive, or HaveNotSeenWithin.

## Type Parameters

### T

`T`

## Parameters

### item

`object`

## Returns

`item is TimeContextual<T>`
