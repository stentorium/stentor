[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / maskNumber

# Function: maskNumber()

> **maskNumber**(`phoneNumber`): `string`

Defined in: [packages/stentor-utils/src/number.ts:69](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/number.ts#L69)

Takes a string with a phone number, sanitizes and masks it while leaving
the last four digits legible.

For example:
  888-8888 -> XXX-8888
  (704) 444 1234 -> XXX-XXX-1234

## Parameters

### phoneNumber

`string`

Number to be masked

## Returns

`string`

The masked number, leaving the last four digits
