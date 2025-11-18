[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / ContextBuilder

# Class: ContextBuilder\<S\>

Defined in: packages/stentor-context/lib/ContextBuilder.d.ts:5

## Extends

- `AbstractBuilder`\<[`Context`](../interfaces/Context.md)\<`S`\>\>

## Type Parameters

### S

`S` *extends* [`Storage`](../interfaces/Storage.md) = [`Storage`](../interfaces/Storage.md)

## Constructors

### Constructor

> **new ContextBuilder**\<`S`\>(): `ContextBuilder`\<`S`\>

Defined in: packages/stentor-context/lib/ContextBuilder.d.ts:7

#### Returns

`ContextBuilder`\<`S`\>

#### Overrides

`AbstractBuilder<Context<S>>.constructor`

## Methods

### ~~withDevice()~~

> **withDevice**(`device`): `ContextBuilder`\<`S`\>

Defined in: packages/stentor-context/lib/ContextBuilder.d.ts:15

Add device information to the context.

#### Parameters

##### device

[`Device`](../interfaces/Device.md)

#### Returns

`ContextBuilder`\<`S`\>

#### Deprecated

- Device will be removed from the context in the next major release.  Use device on request.

***

### withResponse()

> **withResponse**(`response`): `ContextBuilder`\<`S`\>

Defined in: packages/stentor-context/lib/ContextBuilder.d.ts:16

#### Parameters

##### response

[`ResponseBuilder`](ResponseBuilder.md)

#### Returns

`ContextBuilder`\<`S`\>

***

### withRequestUserData()

> **withRequestUserData**(`userData`): `ContextBuilder`\<`S`\>

Defined in: packages/stentor-context/lib/ContextBuilder.d.ts:17

#### Parameters

##### userData

`UserData`

#### Returns

`ContextBuilder`\<`S`\>

***

### withStorage()

> **withStorage**(`storage`): `ContextBuilder`\<`S`\>

Defined in: packages/stentor-context/lib/ContextBuilder.d.ts:18

#### Parameters

##### storage

`S`

#### Returns

`ContextBuilder`\<`S`\>

***

### withSessionData()

> **withSessionData**(`data`): `ContextBuilder`\<`S`\>

Defined in: packages/stentor-context/lib/ContextBuilder.d.ts:24

Set the session storage with the provided data.

#### Parameters

##### data

`SessionStoreData`

#### Returns

`ContextBuilder`\<`S`\>

***

### playingAudio()

> **playingAudio**(): `ContextBuilder`\<`S`\>

Defined in: packages/stentor-context/lib/ContextBuilder.d.ts:25

#### Returns

`ContextBuilder`\<`S`\>

***

### build()

> **build**(): [`Context`](../interfaces/Context.md)\<`S`\>

Defined in: packages/stentor-context/lib/ContextBuilder.d.ts:26

#### Returns

[`Context`](../interfaces/Context.md)\<`S`\>

#### Overrides

`AbstractBuilder.build`
