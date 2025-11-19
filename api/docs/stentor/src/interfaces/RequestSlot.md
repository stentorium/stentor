[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / RequestSlot

# Interface: RequestSlot\<T\>

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:22

Information for a slot coming in on the request.

## Type Parameters

### T

`T` = `RequestSlotValues`

## Properties

### name

> **name**: `string`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:28

The name of the slot, also used as the key in the RequestSlotMap.

For example, "FIRST_TEAM" or "Podcast", this is typically user defined.

***

### value?

> `optional` **value**: `T`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:37

The slot normalized value.

When leveraging synonyms, this will be the canonical value.  If not then it is
the same as the rawValue.

For example, "University of Virginia" or "Red Wine".

***

### original?

> `optional` **original**: `any`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:41

The original value provided by the NLU before normalization.

***

### rawValue?

> `optional` **rawValue**: `string`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:47

The raw spoken value.

For example, "cavaliers" or "red"

***

### id?

> `optional` **id**: `string`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:53

ID of the slot, if applicable.

For example, "UVA"

***

### matchConfidence?

> `optional` **matchConfidence**: `number`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:57

Confidence on the slot match.  Range is between 0 - 1 where 1 is the highest confidence.

***

### successfulMatch?

> `optional` **successfulMatch**: `boolean`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:63

If the entity resolution was successful or not.

See [https://developer.amazon.com/docs/custom-skills/define-synonyms-and-ids-for-slot-type-values-entity-resolution.html#er-built-in-types](https://developer.amazon.com/docs/custom-skills/define-synonyms-and-ids-for-slot-type-values-entity-resolution.html#er-built-in-types)
