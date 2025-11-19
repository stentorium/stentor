[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / getDateTimeFrom

# Function: getDateTimeFrom()

> **getDateTimeFrom**(`date`, `includeOnly?`): [`DateTime`](../../../stentor/src/interfaces/DateTime.md)

Defined in: [packages/stentor-utils/src/dateTime.ts:161](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/dateTime.ts#L161)

From a Dialogflow style ISO-8601 time string: "2019-06-05T12:00:00-04:00",
it pulls out the date and the time.

## Parameters

### date

`string` | `Date`

### includeOnly?

`"time"` | `"date"`

## Returns

[`DateTime`](../../../stentor/src/interfaces/DateTime.md)

A DateTime object based on the provided parameters
