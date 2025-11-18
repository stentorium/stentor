[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / formatNumberForDisplay

# Function: formatNumberForDisplay()

> **formatNumberForDisplay**(`number`, `format?`): `string`

Defined in: packages/stentor-utils/lib/number.d.ts:52

Format numbers for display.  This is a thin wrapper around http://numeraljs.com/

Default format is "0,0" which turns 1000 to 1,000.  More
formats can be found [http://numeraljs.com/#format](http://numeraljs.com/#format)

## Parameters

### number

Number to be formatted for display.

`string` | `number`

### format?

`string`

Defaults to "0,0"

## Returns

`string`

Number in string form, properly formatted for display
