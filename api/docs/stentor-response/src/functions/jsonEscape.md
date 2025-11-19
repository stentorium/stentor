[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-response/src](../README.md) / jsonEscape

# Function: jsonEscape()

> **jsonEscape**(`json`): `string`

Defined in: [packages/stentor-response/src/compileResponse.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-response/src/compileResponse.ts#L16)

Necessary to JSON.parse strings with newlines that need escaping.  Otherwise JSON.parse fails.

## Parameters

### json

`string`

## Returns

`string`
