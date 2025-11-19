[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-address/src](../README.md) / getAddressComponents

# Function: getAddressComponents()

> **getAddressComponents**(`input`): [`ParsedAddress`](../interfaces/ParsedAddress.md)

Defined in: [packages/stentor-address/src/address.ts:242](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-address/src/address.ts#L242)

Takes an input and attempts to parse out all the components

It can be passed a partial address object and will attempt to fill in the missing components if a fullAddress is provided

## Parameters

### input

`string` | `Partial`\<[`ParsedAddress`](../interfaces/ParsedAddress.md)\>

## Returns

[`ParsedAddress`](../interfaces/ParsedAddress.md)
