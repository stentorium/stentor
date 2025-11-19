[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / TestSlot

# Interface: TestSlot\<T\>

Defined in: [packages/stentor-models/src/UtteranceTest.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UtteranceTest.ts#L9)

Extends a RequestSlot by adding the RelativeDateTime as a possible value.

## Extends

- `Omit`\<[`RequestSlot`](RequestSlot.md), `"value"`\>

## Type Parameters

### T

`T` = [`RequestSlotValues`](../type-aliases/RequestSlotValues.md) \| [`RelativeDateTime`](RelativeDateTime.md)

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L38)

The name of the slot, also used as the key in the RequestSlotMap.

For example, "FIRST_TEAM" or "Podcast", this is typically user defined.

#### Inherited from

`Omit.name`

***

### original?

> `optional` **original**: `any`

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:51](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L51)

The original value provided by the NLU before normalization.

#### Inherited from

`Omit.original`

***

### rawValue?

> `optional` **rawValue**: `string`

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:57](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L57)

The raw spoken value.

For example, "cavaliers" or "red"

#### Inherited from

`Omit.rawValue`

***

### id?

> `optional` **id**: `string`

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:63](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L63)

ID of the slot, if applicable.

For example, "UVA"

#### Inherited from

`Omit.id`

***

### matchConfidence?

> `optional` **matchConfidence**: `number`

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:67](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L67)

Confidence on the slot match.  Range is between 0 - 1 where 1 is the highest confidence.

#### Inherited from

`Omit.matchConfidence`

***

### successfulMatch?

> `optional` **successfulMatch**: `boolean`

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:73](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L73)

If the entity resolution was successful or not.

See [https://developer.amazon.com/docs/custom-skills/define-synonyms-and-ids-for-slot-type-values-entity-resolution.html#er-built-in-types](https://developer.amazon.com/docs/custom-skills/define-synonyms-and-ids-for-slot-type-values-entity-resolution.html#er-built-in-types)

#### Inherited from

`Omit.successfulMatch`

***

### value

> **value**: `T`

Defined in: [packages/stentor-models/src/UtteranceTest.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UtteranceTest.ts#L10)
