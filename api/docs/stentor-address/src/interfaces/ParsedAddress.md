[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-address/src](../README.md) / ParsedAddress

# Interface: ParsedAddress

Defined in: [packages/stentor-address/src/address.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-address/src/address.ts#L7)

## Extends

- `Omit`\<`addresser.IParsedAddress`, `"id"` \| `"zipCode"`\>

## Properties

### stateAbbreviation

> **stateAbbreviation**: `string`

Defined in: node\_modules/addresser/index.d.ts:9

#### Inherited from

`Omit.stateAbbreviation`

***

### stateName

> **stateName**: `string`

Defined in: node\_modules/addresser/index.d.ts:10

#### Inherited from

`Omit.stateName`

***

### addressLine1

> **addressLine1**: `string`

Defined in: node\_modules/addresser/index.d.ts:12

#### Inherited from

`Omit.addressLine1`

***

### streetNumber

> **streetNumber**: `string`

Defined in: node\_modules/addresser/index.d.ts:13

#### Inherited from

`Omit.streetNumber`

***

### streetSuffix

> **streetSuffix**: `string`

Defined in: node\_modules/addresser/index.d.ts:14

#### Inherited from

`Omit.streetSuffix`

***

### streetName

> **streetName**: `string`

Defined in: node\_modules/addresser/index.d.ts:15

#### Inherited from

`Omit.streetName`

***

### formattedAddress?

> `optional` **formattedAddress**: `string`

Defined in: [packages/stentor-address/src/address.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-address/src/address.ts#L8)

***

### streetDirection?

> `optional` **streetDirection**: `string`

Defined in: [packages/stentor-address/src/address.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-address/src/address.ts#L12)

Direction such as NW, SE, etc.

***

### zipCode?

> `optional` **zipCode**: `string`

Defined in: [packages/stentor-address/src/address.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-address/src/address.ts#L16)

Zip/Postal Code

***

### placeName

> **placeName**: `string`

Defined in: [packages/stentor-address/src/address.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-address/src/address.ts#L20)

Place name, typically the city or town.

#### Overrides

`Omit.placeName`

***

### id?

> `optional` **id**: `string`

Defined in: [packages/stentor-address/src/address.ts:26](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-address/src/address.ts#L26)

An ID for the address.

#### Note

It is not recommended to use this.
