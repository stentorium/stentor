[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / getDurationFrom

# Function: getDurationFrom()

> **getDurationFrom**(`iso8601Duration`, `groupBy`): `Duration`

Defined in: [packages/stentor-utils/src/date-time/getDurationFrom.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/date-time/getDurationFrom.ts#L23)

Parses the string, if in the ISO-8601 duration format, and returns
a stentor-models#Duration object.  If the provided string is not a duration 
string, it returns undefined.

[https://stackoverflow.com/a/29153059/1349766](https://stackoverflow.com/a/29153059/1349766)

## Parameters

### iso8601Duration

`string`

### groupBy

[`GetDurationGroupBy`](../enumerations/GetDurationGroupBy.md) = `GetDurationGroupBy.Largest`

If there are multiple duration formats specified, you can combine them by either the largest or smallest, defaults to largest.

## Returns

`Duration`

A duration object or undefined if the string is not of expected format.
