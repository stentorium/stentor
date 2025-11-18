[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / maskPhoneNumbers

# Function: maskPhoneNumbers()

> **maskPhoneNumbers**(`str`, `partial`): `string`

Defined in: [packages/stentor-utils/src/number.ts:108](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/number.ts#L108)

Detects the phone numbers within a string and masks the numbers
with #s, preserving the formatting.

## Parameters

### str

`string`

The string containing phone numbers.

### partial

`boolean` = `false`

Defaults to false. When true it keeps the last four digits of the number

## Returns

`string`

String with phone numbers masked.
