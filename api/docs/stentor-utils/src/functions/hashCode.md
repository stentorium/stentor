[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / hashCode

# Function: hashCode()

> **hashCode**(`str`): `number`

Defined in: [packages/stentor-utils/src/hash.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/hash.ts#L27)

Simple function to convert a string to a simple numeric hash.

This has potential collisions, do not use as a unique key when the population is
large.

## Parameters

### str

`string`

## Returns

`number`

## See

https://stackoverflow.com/a/7616484/1349766
