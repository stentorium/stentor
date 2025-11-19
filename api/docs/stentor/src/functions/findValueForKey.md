[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / findValueForKey

# Function: findValueForKey()

> **findValueForKey**\<`V`\>(`key`, `obj`): `V`

Defined in: packages/stentor-utils/lib/object/findValueForKey.d.ts:14

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

`ObjectWithKeys`\<`V`\>

## Returns

`V`
