[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / findValueForKey

# Function: findValueForKey()

> **findValueForKey**\<`V`\>(`key`, `obj`): `V`

Defined in: [packages/stentor-utils/src/object/findValueForKey.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/object/findValueForKey.ts#L17)

Searches the provided object for the provided key.

Smarter than a normal obj[key] as key can also be a regex.

In the cases where a regex is broad (".*") but there is also an exact match,
the exact match is preferred.

## Type Parameters

### V

`V`

## Parameters

### key

`string`

### obj

[`ObjectWithKeys`](../interfaces/ObjectWithKeys.md)\<`V`\>

## Returns

`V`
