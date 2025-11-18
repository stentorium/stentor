[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / ssmlify

# Function: ssmlify()

> **ssmlify**(`str`, `clean`): `string`

Defined in: [packages/stentor-utils/src/ssml.ts:111](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/ssml.ts#L111)

Ensures the speech is properly wrapped by `<speak>` tags.
The method is innocuous if they already exist

## Parameters

### str

`string`

String to surround with `<speak>` tags

### clean

`boolean` = `true`

## Returns

`string`

String surrounded by `<speak>` tags
