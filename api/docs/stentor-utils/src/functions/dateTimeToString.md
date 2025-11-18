[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / dateTimeToString

# Function: dateTimeToString()

> **dateTimeToString**(`dateTime`): `string`

Defined in: [packages/stentor-utils/src/dateTime.ts:58](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/dateTime.ts#L58)

Converts a date time object to a string.

Either a single date (2020-07-19T23:59:59) or a range (2019-07-19T00:00:00 --> 2020-07-19T23:59:59).

## Parameters

### dateTime

Either DateTime or DateTimeRange to convert to a string

[`DateTimeRange`](../../../stentor/src/interfaces/DateTimeRange.md) | [`DateTime`](../../../stentor/src/interfaces/DateTime.md)

## Returns

`string`
