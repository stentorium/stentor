[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / findValuesForKey

# Function: findValuesForKey()

> **findValuesForKey**\<`V`\>(`key`, `obj`): `V`[]

Defined in: [packages/stentor-utils/src/object/findValuesForKey.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/object/findValuesForKey.ts#L16)

Finds all values that match for the provided key.

Smarter than a normal obj[key] as key can also be a regex.

## Type Parameters

### V

`V`

## Parameters

### key

`string`

### obj

[`ObjectWithKeys`](../interfaces/ObjectWithKeys.md)\<`V`\>

## Returns

`V`[]
