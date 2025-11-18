[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / AddressIntentRequestSlotMap

# Interface: AddressIntentRequestSlotMap

Defined in: [packages/stentor-models/src/Request/AddressIntentRequest.ts:4](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AddressIntentRequest.ts#L4)

Map of slots where the key is the name of the slot.

## Extends

- [`RequestSlotMap`](RequestSlotMap.md)

## Indexable

\[`slotName`: `string`\]: [`RequestSlot`](RequestSlot.md)\<[`RequestSlotValues`](../type-aliases/RequestSlotValues.md)\>

Each key is the slot name and the corresponding value is the slot.

## Properties

### address?

> `optional` **address**: [`RequestSlot`](RequestSlot.md)\<`string`\>

Defined in: [packages/stentor-models/src/Request/AddressIntentRequest.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AddressIntentRequest.ts#L10)

Fully formed address with street number, street name, quadrant, city, state, and zip code.

On chat, this can sometimes be derived from the NLU's entity extraction.

***

### city?

> `optional` **city**: [`RequestSlot`](RequestSlot.md)\<`string`\>

Defined in: [packages/stentor-models/src/Request/AddressIntentRequest.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AddressIntentRequest.ts#L14)

City name.

***

### state?

> `optional` **state**: [`RequestSlot`](RequestSlot.md)\<`string`\>

Defined in: [packages/stentor-models/src/Request/AddressIntentRequest.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AddressIntentRequest.ts#L18)

State or Province.  Can be a two letter abbreviation or full name.

***

### zip?

> `optional` **zip**: [`RequestSlot`](RequestSlot.md)\<`string`\>

Defined in: [packages/stentor-models/src/Request/AddressIntentRequest.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AddressIntentRequest.ts#L22)

Zip code.

***

### street?

> `optional` **street**: [`RequestSlot`](RequestSlot.md)\<`string`\>

Defined in: [packages/stentor-models/src/Request/AddressIntentRequest.ts:26](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AddressIntentRequest.ts#L26)

Street name and number.

***

### street\_name?

> `optional` **street\_name**: [`RequestSlot`](RequestSlot.md)\<`string`\>

Defined in: [packages/stentor-models/src/Request/AddressIntentRequest.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AddressIntentRequest.ts#L30)

Street name.

***

### street\_number?

> `optional` **street\_number**: [`RequestSlot`](RequestSlot.md)\<`string`\>

Defined in: [packages/stentor-models/src/Request/AddressIntentRequest.ts:34](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AddressIntentRequest.ts#L34)

Street number, only

***

### quadrant?

> `optional` **quadrant**: [`RequestSlot`](RequestSlot.md)\<`string`\>

Defined in: [packages/stentor-models/src/Request/AddressIntentRequest.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AddressIntentRequest.ts#L38)

Quadrant, if applicable.
