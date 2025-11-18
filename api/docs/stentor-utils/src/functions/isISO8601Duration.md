[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / isISO8601Duration

# Function: isISO8601Duration()

> **isISO8601Duration**(`potential`): `boolean`

Defined in: [packages/stentor-utils/src/date-time/isISO8601Duration.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/date-time/isISO8601Duration.ts#L18)

Determine if the string is a proper ISO-8601 duration format.

[https://stackoverflow.com/questions/32044846/regex-for-iso-8601-durations](https://stackoverflow.com/questions/32044846/regex-for-iso-8601-durations)
[https://en.wikipedia.org/wiki/ISO\_8601#Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations)

## Parameters

### potential

`string`

Potential ISO-8601 duration string to test

## Returns

`boolean`

- True if the provided string is a ISO-8601 duration formatted string.
