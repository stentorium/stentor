[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-interaction-model/src](../README.md) / mergeSlots

# Function: mergeSlots()

> **mergeSlots**(`primary`, `secondary`, `results`): `Slot`[]

Defined in: [packages/stentor-interaction-model/src/Slot/merge.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Slot/merge.ts#L21)

Merge two arrays of slots together.

A slot in the secondary array is ignored if one in the primary
with the same name is found.

## Parameters

### primary

`Slot`[]

### secondary

`Slot`[]

### results

[`MergeSlotsResult`](../interfaces/MergeSlotsResult.md) = `{}`

## Returns

`Slot`[]
