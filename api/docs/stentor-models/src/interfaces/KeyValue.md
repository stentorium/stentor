[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / KeyValue

# Interface: KeyValue

Defined in: [packages/stentor-models/src/Storage/KeyValueStore.ts:4](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/KeyValueStore.ts#L4)

## Extended by

- [`StorageAction`](StorageAction.md)

## Properties

### key

> **key**: `string`

Defined in: [packages/stentor-models/src/Storage/KeyValueStore.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/KeyValueStore.ts#L9)

Key on the storage that the action will be
taken on.

***

### value?

> `optional` **value**: [`ValueTypes`](../type-aliases/ValueTypes.md)

Defined in: [packages/stentor-models/src/Storage/KeyValueStore.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/KeyValueStore.ts#L15)

The value to be set or appended.

Not always required when deleting a key.
