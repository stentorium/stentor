[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / isISO8601

# Function: isISO8601()

> **isISO8601**(`potential`): `boolean`

Defined in: [packages/stentor-utils/src/dateTime.ts:108](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/dateTime.ts#L108)

Determines if the string is an ISO-8601 style string.

## Parameters

### potential

`string`

Potential ISO-8601 string

## Returns

`boolean`

- True if the string is ISO-8601 Date & Time string

## Remarks

This does not cover the entire 8601 spec, just a version
that is commonly used by NLUs to communicate date & time.
For example, durations (like P1Y2M10D) are not supported.
