[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / uuid

# Function: uuid()

> **uuid**(): `string`

Defined in: [packages/stentor-utils/src/uuid.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/uuid.ts#L13)

Generate a quick, but not perfect, UUID

## Returns

`string`

UUID string

## Remarks

This method optimizes quickness as opposed to absolute collisionless UUIDs
This is also a week UUID since it relies on Math.random()
