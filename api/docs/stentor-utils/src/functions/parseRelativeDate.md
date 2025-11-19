[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / parseRelativeDate

# Function: parseRelativeDate()

> **parseRelativeDate**(`relative`, `now`): [`DateTimeRange`](../../../stentor/src/interfaces/DateTimeRange.md) \| [`DateTime`](../../../stentor/src/interfaces/DateTime.md)

Defined in: [packages/stentor-utils/src/dateTime.ts:276](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/dateTime.ts#L276)

Parses the relative date string and returns a date time.

Support is currently limited, see possible RelativeDateType & RelativeDateRangeType for current
supported values.

## Parameters

### relative

`string`

The relative date

### now

`Date` = `...`

Optional date to use to calculate date off of

## Returns

[`DateTimeRange`](../../../stentor/src/interfaces/DateTimeRange.md) \| [`DateTime`](../../../stentor/src/interfaces/DateTime.md)

- Computed relative data time
