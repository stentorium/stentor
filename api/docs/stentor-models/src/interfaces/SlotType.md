[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / SlotType

# ~~Interface: SlotType\<T\>~~

Defined in: [packages/stentor-models/src/Slot/SlotType.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/SlotType.ts#L14)

The values for the slot type.

## Deprecated

Use Entity instead

## Type Parameters

### T

`T` = `string` \| `number` \| `object` \| `boolean`

## Properties

### ~~name~~

> **name**: `string`

Defined in: [packages/stentor-models/src/Slot/SlotType.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/SlotType.ts#L20)

The name of the slot type.

This is also the key used in the SlotTypeMap.

***

### ~~id?~~

> `optional` **id**: `string`

Defined in: [packages/stentor-models/src/Slot/SlotType.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/SlotType.ts#L24)

Optional ID for the slot type

***

### ~~values?~~

> `optional` **values**: [`SlotTypeValue`](SlotTypeValue.md)\<`T`\>[]

Defined in: [packages/stentor-models/src/Slot/SlotType.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/SlotType.ts#L28)

The values for the slot type.

***

### ~~dialogflowId?~~

> `optional` **dialogflowId**: `string`

Defined in: [packages/stentor-models/src/Slot/SlotType.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/SlotType.ts#L32)

Optional ID if the slot type has a representation in Dialogflow.
