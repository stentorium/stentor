[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-time/src](../README.md) / findSchedulableMatch

# Function: findSchedulableMatch()

> **findSchedulableMatch**\<`T`\>(`schedules`, `baseNowInput`): `Scheduled`\<`T`\>

Defined in: [packages/stentor-time/src/findSchedulableMatch.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-time/src/findSchedulableMatch.ts#L39)

Within a list of Schedulables, find a match for the provided time
or current time if no time is provided.

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### schedules

(`T` \| `Scheduled`\<`T`\>)[]

### baseNowInput

`DateTime` = `...`

## Returns

`Scheduled`\<`T`\>
