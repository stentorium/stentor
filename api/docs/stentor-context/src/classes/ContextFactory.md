[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-context/src](../README.md) / ContextFactory

# Class: ContextFactory

Defined in: [packages/stentor-context/src/ContextFactory.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-context/src/ContextFactory.ts#L30)

## Constructors

### Constructor

> **new ContextFactory**(): `ContextFactory`

#### Returns

`ContextFactory`

## Methods

### fromRequest()

> `static` **fromRequest**(`request`, `requestBody`, `storage`, `session`, `services`, `channel`, `appData?`): `Promise`\<`Readonly`\<[`Context`](../../../stentor/src/interfaces/Context.md)\<[`Storage`](../../../stentor/src/interfaces/Storage.md)\>\>\>

Defined in: [packages/stentor-context/src/ContextFactory.ts:41](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-context/src/ContextFactory.ts#L41)

Build context from the provided request.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### requestBody

`object`

##### storage

[`Storage`](../../../stentor/src/interfaces/Storage.md)

##### session

`SessionStore`

##### services

[`ContextFactoryServices`](../interfaces/ContextFactoryServices.md)

##### channel

[`Channel`](../../../stentor/src/interfaces/Channel.md)

This field will disappear in the next major release.  It is only used to set the device field on the context.

##### appData?

`AppRuntimeData`

#### Returns

`Promise`\<`Readonly`\<[`Context`](../../../stentor/src/interfaces/Context.md)\<[`Storage`](../../../stentor/src/interfaces/Storage.md)\>\>\>
