[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / listisize

# Function: listisize()

> **listisize**(`items`, `preferredDelimiter`): `string`

Defined in: [packages/stentor-utils/src/speech.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/speech.ts#L17)

Builds a speakable and readable list from a set of items.

For example, ["one", "two", "three", "four"] will be transformed
to "one, two, three or four".

## Parameters

### items

`string`[]

### preferredDelimiter

[`ListDelimiter`](../enumerations/ListDelimiter.md) = `ListDelimiter.or`

## Returns

`string`
