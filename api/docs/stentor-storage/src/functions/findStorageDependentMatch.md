[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-storage/src](../README.md) / findStorageDependentMatch

# Function: findStorageDependentMatch()

> **findStorageDependentMatch**\<`T`\>(`storageDependents`, `storage`): `StorageDependable`\<`T`\>

Defined in: [packages/stentor-storage/src/findStorageDependentMatch.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-storage/src/findStorageDependentMatch.ts#L15)

Based on the provided storage, it finds the storage dependent object
that is a match.

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### storageDependents

(`T` \| `StorageDependable`\<`T`\>)[]

### storage

[`Storage`](../../../stentor/src/interfaces/Storage.md)

## Returns

`StorageDependable`\<`T`\>
