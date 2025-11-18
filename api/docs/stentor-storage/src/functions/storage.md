[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-storage/src](../README.md) / storage

# Function: storage()

> **storage**(`storage`, `key`): `string`

Defined in: [packages/stentor-storage/src/findStorageDependentMatch.ts:114](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-storage/src/findStorageDependentMatch.ts#L114)

Returns the value for the provided key from the storage, converted to a string.

If the value doesn't exist, an empty string is returned.

Note: This is primarily used by StorageDependentCheck within conditionals.

## Parameters

### storage

[`Storage`](../../../stentor/src/interfaces/Storage.md)

### key

`string`

## Returns

`string`
