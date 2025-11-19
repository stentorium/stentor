[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ExpectedResult

# Interface: ExpectedResult

Defined in: [packages/stentor-models/src/UtteranceTest.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UtteranceTest.ts#L16)

An expected result from the NLU to determine if the test passed or failed.

## Properties

### intentId

> **intentId**: `string`

Defined in: [packages/stentor-models/src/UtteranceTest.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UtteranceTest.ts#L20)

Expected intent ID.

***

### matchedSlots?

> `optional` **matchedSlots**: [`TestSlot`](TestSlot.md)\<[`RelativeDateTime`](RelativeDateTime.md) \| [`RequestSlotValues`](../type-aliases/RequestSlotValues.md)\>[]

Defined in: [packages/stentor-models/src/UtteranceTest.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UtteranceTest.ts#L24)

Expected slots.
