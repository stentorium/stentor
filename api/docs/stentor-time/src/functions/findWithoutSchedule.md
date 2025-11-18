[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-time/src](../README.md) / findWithoutSchedule

# Function: findWithoutSchedule()

> **findWithoutSchedule**\<`T`\>(`items`): `T`

Defined in: [packages/stentor-time/src/findWithoutSchedule.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-time/src/findWithoutSchedule.ts#L13)

Within a list of objects, some potentially Scheduled, return a random object
that does not have a schedule.

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### items

(`T` \| `Scheduled`\<`T`\>)[]

## Returns

`T`
