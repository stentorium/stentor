[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / LaunchRequestBuilder

# Class: LaunchRequestBuilder

Defined in: packages/stentor-request/lib/Builders.d.ts:9

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

> **withAccessToken**(`token?`): `LaunchRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:19

Add a access token to the request.

#### Parameters

##### token?

`string`

Access token for the request

#### Returns

`LaunchRequestBuilder`

***

### withDeviceId()

> **withDeviceId**(`deviceId`): `LaunchRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:25

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

Defined in: packages/stentor-request/lib/Builders.d.ts:31

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

Defined in: packages/stentor-request/lib/Builders.d.ts:38

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

Defined in: packages/stentor-request/lib/Builders.d.ts:42

Build the request.

#### Returns

`LaunchRequest`

#### Overrides

`AbstractBuilder.build`
