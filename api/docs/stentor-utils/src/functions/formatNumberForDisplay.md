[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / formatNumberForDisplay

# Function: formatNumberForDisplay()

> **formatNumberForDisplay**(`number`, `format`): `string`

Defined in: [packages/stentor-utils/src/number.ts:157](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/number.ts#L157)

Format numbers for display.  This is a thin wrapper around http://numeraljs.com/

Default format is "0,0" which turns 1000 to 1,000.  More
formats can be found [http://numeraljs.com/#format](http://numeraljs.com/#format)

## Parameters

### number

Number to be formatted for display.

`string` | `number`

### format

`string` = `"0,0"`

Defaults to "0,0"

## Returns

`string`

Number in string form, properly formatted for display
