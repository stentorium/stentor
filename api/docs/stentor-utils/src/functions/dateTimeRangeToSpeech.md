[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / dateTimeRangeToSpeech

# Function: dateTimeRangeToSpeech()

> **dateTimeRangeToSpeech**(`value`, `type`): `string`

Defined in: [packages/stentor-utils/src/response.ts:99](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/response.ts#L99)

Converts a date time range to speech to be added to a response.

In the case where the date is the same for the start and the end, the date
will only be mentioned once.  For example "on July 4th 2019 from 1:00 PM to 2:00PM"

## Parameters

### value

[`DateTimeRange`](../../../stentor/src/interfaces/DateTimeRange.md)

DateTimeRange slot value

### type

Optional type, defaults to "ssml".

`"displayText"` | `"ssml"`

## Returns

`string`
