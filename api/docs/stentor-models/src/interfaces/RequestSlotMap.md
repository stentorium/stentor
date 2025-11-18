[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / RequestSlotMap

# Interface: RequestSlotMap

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:79](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L79)

Map of slots where the key is the name of the slot.

## Extended by

- [`AddressIntentRequestSlotMap`](AddressIntentRequestSlotMap.md)

## Indexable

\[`slotName`: `string`\]: [`RequestSlot`](RequestSlot.md)\<[`RequestSlotValues`](../type-aliases/RequestSlotValues.md)\>

Each key is the slot name and the corresponding value is the slot.
