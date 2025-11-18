[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-interaction-model/src](../README.md) / findSlotDependentMatch

# Function: findSlotDependentMatch()

> **findSlotDependentMatch**\<`T`\>(`objects`, `slots`): `SlotDependable`\<`T`\>

Defined in: [packages/stentor-interaction-model/src/Slot/findSlotDependentMatch.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Slot/findSlotDependentMatch.ts#L16)

Based on the request, it finds a slot dependent object that matches.

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### objects

(`T` \| `SlotDependable`\<`T`\>)[]

Objects to look within

### slots

[`RequestSlotMap`](../../../stentor/src/interfaces/RequestSlotMap.md)

## Returns

`SlotDependable`\<`T`\>

- Returns the matched slot dependent object or undefined if not match was found.
