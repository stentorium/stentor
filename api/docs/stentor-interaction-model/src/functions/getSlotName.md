[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-interaction-model/src](../README.md) / getSlotName

# Function: getSlotName()

> **getSlotName**(`slot`): `string`

Defined in: [packages/stentor-interaction-model/src/getSlotName.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/getSlotName.ts#L12)

From a string, it returns the slot name.

It will take fields such as ${foo}, {foo}, or {-|foo} and return foo.

## Parameters

### slot

`string`

## Returns

`string`
