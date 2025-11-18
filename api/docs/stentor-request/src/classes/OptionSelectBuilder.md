[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-request/src](../README.md) / OptionSelectBuilder

# Class: OptionSelectBuilder

Defined in: [packages/stentor-request/src/Builders.ts:652](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L652)

Builds a OptionSelect

## Extends

- `AbstractBuilder`\<[`OptionSelectRequest`](../../../stentor/src/interfaces/OptionSelectRequest.md)\>

## Constructors

### Constructor

> **new OptionSelectBuilder**(): `OptionSelectBuilder`

#### Returns

`OptionSelectBuilder`

#### Inherited from

`AbstractBuilder<OptionSelectRequest>.constructor`

## Methods

### withDeviceId()

> **withDeviceId**(`deviceId`): `OptionSelectBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:661](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L661)

Add a device ID to the request.

#### Parameters

##### deviceId

`string`

Device ID for the request

#### Returns

`OptionSelectBuilder`

***

### withSelectedToken()

> **withSelectedToken**(`token`): `OptionSelectBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:671](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L671)

Set the selected token to the request.  By default the value is "optionToken".

#### Parameters

##### token

`string`

Set the selected token for the request

#### Returns

`OptionSelectBuilder`

***

### build()

> **build**(): [`OptionSelectRequest`](../../../stentor/src/interfaces/OptionSelectRequest.md)

Defined in: [packages/stentor-request/src/Builders.ts:676](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L676)

#### Returns

[`OptionSelectRequest`](../../../stentor/src/interfaces/OptionSelectRequest.md)

#### Overrides

`AbstractBuilder.build`
