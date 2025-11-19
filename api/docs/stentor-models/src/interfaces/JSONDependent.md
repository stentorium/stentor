[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / JSONDependent

# Interface: JSONDependent

Defined in: [packages/stentor-models/src/JSONDependent.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/JSONDependent.ts#L12)

Path based on evaluating a JSON path to determine the value
that will be matched.

For example:
name: $.request.slots.slot2.value will evaluate the slot with name slot2
name: $.context.storage.key1 will evaluate key1 on the user's storage

## Properties

### JSONPathMatch

> **JSONPathMatch**: [`Match`](Match.md)

Defined in: [packages/stentor-models/src/JSONDependent.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/JSONDependent.ts#L18)

Match data for the JSON path.

'name' on Match is the JSON path
