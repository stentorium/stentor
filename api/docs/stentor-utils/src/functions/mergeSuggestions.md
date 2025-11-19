[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / mergeSuggestions

# Function: mergeSuggestions()

> **mergeSuggestions**(`existing`, `incoming?`): `SuggestionTypes`[]

Defined in: [packages/stentor-utils/src/response.ts:219](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/response.ts#L219)

Merges new suggestions onto existing suggestions.

It will look for duplicates on the existing from the incoming.

If it finds one, it will replace the existing with the incoming while keeping the index.

## Parameters

### existing

`SuggestionTypes`[]

### incoming?

`SuggestionTypes`[]

## Returns

`SuggestionTypes`[]
