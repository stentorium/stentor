[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-request/src](../README.md) / InputUnknownRequestBuilder

# Class: InputUnknownRequestBuilder

Defined in: [packages/stentor-request/src/Builders.ts:131](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L131)

Builds an InputUnknownRequest

## Extends

- `AbstractBuilder`\<`InputUnknownRequest`\>

## Constructors

### Constructor

> **new InputUnknownRequestBuilder**(): `InputUnknownRequestBuilder`

#### Returns

`InputUnknownRequestBuilder`

#### Inherited from

`AbstractBuilder<InputUnknownRequest>.constructor`

## Methods

### onPlatform()

> **onPlatform**(`platform`): `InputUnknownRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:142](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L142)

Set the platform for the request.

#### Parameters

##### platform

`string`

Platform for the request

#### Returns

`InputUnknownRequestBuilder`

***

### onChannel()

> **onChannel**(`channel`): `InputUnknownRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:153](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L153)

Set the channel for the request

#### Parameters

##### channel

`string`

Channel for the request

#### Returns

`InputUnknownRequestBuilder`

***

### withDeviceId()

> **withDeviceId**(`deviceId`): `InputUnknownRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:163](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L163)

Add a device ID to the request.

#### Parameters

##### deviceId

`string`

Device ID for the request

#### Returns

`InputUnknownRequestBuilder`

***

### withRawQuery()

> **withRawQuery**(`rawQuery`): `InputUnknownRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:173](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L173)

Set the raw query on the request.

#### Parameters

##### rawQuery

`string`

The raw query for the request

#### Returns

`InputUnknownRequestBuilder`

***

### build()

> **build**(): `InputUnknownRequest`

Defined in: [packages/stentor-request/src/Builders.ts:178](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L178)

#### Returns

`InputUnknownRequest`

#### Overrides

`AbstractBuilder.build`
