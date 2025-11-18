[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-context/src](../README.md) / ContextBuilder

# Class: ContextBuilder\<S\>

Defined in: [packages/stentor-context/src/ContextBuilder.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-context/src/ContextBuilder.ts#L7)

## Extends

- `AbstractBuilder`\<[`Context`](../../../stentor/src/interfaces/Context.md)\<`S`\>\>

## Type Parameters

### S

`S` *extends* [`Storage`](../../../stentor/src/interfaces/Storage.md) = [`Storage`](../../../stentor/src/interfaces/Storage.md)

## Constructors

### Constructor

> **new ContextBuilder**\<`S`\>(): `ContextBuilder`\<`S`\>

Defined in: [packages/stentor-context/src/ContextBuilder.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-context/src/ContextBuilder.ts#L10)

#### Returns

`ContextBuilder`\<`S`\>

#### Overrides

`AbstractBuilder<Context<S>>.constructor`

## Methods

### ~~withDevice()~~

> **withDevice**(`device`): `ContextBuilder`\<`S`\>

Defined in: [packages/stentor-context/src/ContextBuilder.ts:59](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-context/src/ContextBuilder.ts#L59)

Add device information to the context.

#### Parameters

##### device

[`Device`](../../../stentor/src/interfaces/Device.md)

#### Returns

`ContextBuilder`\<`S`\>

#### Deprecated

- Device will be removed from the context in the next major release.  Use device on request.

***

### withResponse()

> **withResponse**(`response`): `ContextBuilder`\<`S`\>

Defined in: [packages/stentor-context/src/ContextBuilder.ts:64](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-context/src/ContextBuilder.ts#L64)

#### Parameters

##### response

[`ResponseBuilder`](../../../stentor/src/classes/ResponseBuilder.md)

#### Returns

`ContextBuilder`\<`S`\>

***

### withRequestUserData()

> **withRequestUserData**(`userData`): `ContextBuilder`\<`S`\>

Defined in: [packages/stentor-context/src/ContextBuilder.ts:69](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-context/src/ContextBuilder.ts#L69)

#### Parameters

##### userData

`UserData`

#### Returns

`ContextBuilder`\<`S`\>

***

### withStorage()

> **withStorage**(`storage`): `ContextBuilder`\<`S`\>

Defined in: [packages/stentor-context/src/ContextBuilder.ts:74](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-context/src/ContextBuilder.ts#L74)

#### Parameters

##### storage

`S`

#### Returns

`ContextBuilder`\<`S`\>

***

### withSessionData()

> **withSessionData**(`data`): `ContextBuilder`\<`S`\>

Defined in: [packages/stentor-context/src/ContextBuilder.ts:97](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-context/src/ContextBuilder.ts#L97)

Set the session storage with the provided data.

#### Parameters

##### data

`SessionStoreData`

#### Returns

`ContextBuilder`\<`S`\>

***

### playingAudio()

> **playingAudio**(): `ContextBuilder`\<`S`\>

Defined in: [packages/stentor-context/src/ContextBuilder.ts:106](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-context/src/ContextBuilder.ts#L106)

#### Returns

`ContextBuilder`\<`S`\>

***

### build()

> **build**(): [`Context`](../../../stentor/src/interfaces/Context.md)\<`S`\>

Defined in: [packages/stentor-context/src/ContextBuilder.ts:118](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-context/src/ContextBuilder.ts#L118)

#### Returns

[`Context`](../../../stentor/src/interfaces/Context.md)\<`S`\>

#### Overrides

`AbstractBuilder.build`
