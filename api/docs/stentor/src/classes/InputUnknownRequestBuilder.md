[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / InputUnknownRequestBuilder

# Class: InputUnknownRequestBuilder

Defined in: packages/stentor-request/lib/Builders.d.ts:49

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

Defined in: packages/stentor-request/lib/Builders.d.ts:59

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

Defined in: packages/stentor-request/lib/Builders.d.ts:66

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

Defined in: packages/stentor-request/lib/Builders.d.ts:72

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

Defined in: packages/stentor-request/lib/Builders.d.ts:78

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

Defined in: packages/stentor-request/lib/Builders.d.ts:79

#### Returns

`InputUnknownRequest`

#### Overrides

`AbstractBuilder.build`
