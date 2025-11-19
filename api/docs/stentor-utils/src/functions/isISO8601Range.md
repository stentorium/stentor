[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / isISO8601Range

# Function: isISO8601Range()

> **isISO8601Range**(`potential`): `boolean`

Defined in: [packages/stentor-utils/src/dateTime.ts:131](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/dateTime.ts#L131)

Determines if the string is an ISO-8601 range style string.

This does not cover the entire 8601 spec, just a version that is
commonly used by NLUs to communicate date & time.

[isISO8601](isISO8601.md)
[https://en.wikipedia.org/wiki/ISO\_8601#Time\_intervals](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals)

## Parameters

### potential

`string`

## Returns

`boolean`

True if the string confirms to ISO-8601 range format
