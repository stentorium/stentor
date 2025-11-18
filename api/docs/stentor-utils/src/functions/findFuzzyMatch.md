[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / findFuzzyMatch

# Function: findFuzzyMatch()

> **findFuzzyMatch**\<`T`\>(`find`, `from`, `options`): `T`[]

Defined in: [packages/stentor-utils/src/matcher.ts:127](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/matcher.ts#L127)

From the provided string, find the closest match from the items provided.

This is a simple wrapper around [Fuse.js](https://fusejs.io)

## Type Parameters

### T

`T` = `string` \| `Record`\<`string`, `unknown`\>

## Parameters

### find

`string`

The query to find a match from

### from

`T`[]

### options

[`FuzzyMatchOptions`](../interfaces/FuzzyMatchOptions.md) = `{}`

## Returns

`T`[]
