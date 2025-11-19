[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / StorageAction

# Interface: StorageAction

Defined in: [packages/stentor-models/src/Storage/StorageAction.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/StorageAction.ts#L7)

## Extends

- [`KeyValue`](KeyValue.md)

## Properties

### key

> **key**: `string`

Defined in: [packages/stentor-models/src/Storage/KeyValueStore.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/KeyValueStore.ts#L9)

Key on the storage that the action will be
taken on.

#### Inherited from

[`KeyValue`](KeyValue.md).[`key`](KeyValue.md#key)

***

### value?

> `optional` **value**: [`ValueTypes`](../type-aliases/ValueTypes.md)

Defined in: [packages/stentor-models/src/Storage/KeyValueStore.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/KeyValueStore.ts#L15)

The value to be set or appended.

Not always required when deleting a key.

#### Inherited from

[`KeyValue`](KeyValue.md).[`value`](KeyValue.md#value)

***

### type

> **type**: [`StorageActionType`](../type-aliases/StorageActionType.md)

Defined in: [packages/stentor-models/src/Storage/StorageAction.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/StorageAction.ts#L11)

The type of action to be performed on the storage.

***

### store

> **store**: [`StorageType`](../type-aliases/StorageType.md)

Defined in: [packages/stentor-models/src/Storage/StorageAction.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/StorageAction.ts#L15)

Which storage to perform the action on.
