[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / SlotTypeValue

# Interface: SlotTypeValue\<T\>

Defined in: [packages/stentor-models/src/Slot/SlotType.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/SlotType.ts#L38)

A single utterance within the slot type and associated data for when that utterance is spoken.

## Type Parameters

### T

`T` = `string` \| `number` \| `object` \| `boolean`

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Slot/SlotType.ts:42](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/SlotType.ts#L42)

The name of the slot, what is spoken by the user.

***

### synonyms?

> `optional` **synonyms**: `string`[]

Defined in: [packages/stentor-models/src/Slot/SlotType.ts:46](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/SlotType.ts#L46)

List of potential synonyms for the slot.

***

### data?

> `optional` **data**: `T`

Defined in: [packages/stentor-models/src/Slot/SlotType.ts:50](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/SlotType.ts#L50)

The data associated with the slot value, used when the slot value is selected.
