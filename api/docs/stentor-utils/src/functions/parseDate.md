[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / parseDate

# Function: parseDate()

> **parseDate**(`parsable`, `returnOnly?`): [`DateTime`](../../../stentor/src/interfaces/DateTime.md)

Defined in: [packages/stentor-utils/src/dateTime.ts:254](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/dateTime.ts#L254)

Parses the date within the string.  Returns undefined if
it cannot parse one.

It does not handle date periods such as "last week" or "last month".

Note: This is a wrapper around chrono-node parseDate.
See https://github.com/wanasit/chrono for more information.

## Parameters

### parsable

`string`

### returnOnly?

`"time"` | `"date"`

## Returns

[`DateTime`](../../../stentor/src/interfaces/DateTime.md)
