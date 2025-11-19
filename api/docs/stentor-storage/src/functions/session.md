[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-storage/src](../README.md) / session

# Function: session()

> **session**(`sessionStorage`, `key`): `string`

Defined in: [packages/stentor-storage/src/findStorageDependentMatch.ts:90](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-storage/src/findStorageDependentMatch.ts#L90)

Returns the value at the provided key from the session storage, converted to a string.

If the value doesn't exist, an empty string is returned.

Note: This is primarily used by StorageDependentCheck within conditionals.

## Parameters

### sessionStorage

`SessionStore`

### key

`string`

## Returns

`string`
