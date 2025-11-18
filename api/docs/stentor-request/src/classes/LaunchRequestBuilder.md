[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-request/src](../README.md) / LaunchRequestBuilder

# Class: LaunchRequestBuilder

Defined in: [packages/stentor-request/src/Builders.ts:51](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L51)

Builds a LaunchRequest

## Extends

- `AbstractBuilder`\<`LaunchRequest`\>

## Constructors

### Constructor

> **new LaunchRequestBuilder**(): `LaunchRequestBuilder`

#### Returns

`LaunchRequestBuilder`

#### Inherited from

`AbstractBuilder<LaunchRequest>.constructor`

## Methods

### withAccessToken()

> **withAccessToken**(`token`): `LaunchRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:62](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L62)

Add a access token to the request.

#### Parameters

##### token

`string` = `"accessToken"`

Access token for the request

#### Returns

`LaunchRequestBuilder`

***

### withDeviceId()

> **withDeviceId**(`deviceId`): `LaunchRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:72](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L72)

Add a device ID to the request.

#### Parameters

##### deviceId

`string`

Device ID for the request

#### Returns

`LaunchRequestBuilder`

***

### onPlatform()

> **onPlatform**(`platform`): `LaunchRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:82](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L82)

Set the platform for the request.

#### Parameters

##### platform

`string`

Platform for the request

#### Returns

`LaunchRequestBuilder`

***

### onChannel()

> **onChannel**(`channel`): `LaunchRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:93](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L93)

Set the channel for the request

#### Parameters

##### channel

`string`

Channel for the request

#### Returns

`LaunchRequestBuilder`

***

### build()

> **build**(): `LaunchRequest`

Defined in: [packages/stentor-request/src/Builders.ts:101](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L101)

Build the request.

#### Returns

`LaunchRequest`

#### Overrides

`AbstractBuilder.build`
