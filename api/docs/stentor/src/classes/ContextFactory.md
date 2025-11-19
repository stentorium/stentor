[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / ContextFactory

# Class: ContextFactory

Defined in: packages/stentor-context/lib/ContextFactory.d.ts:8

## Constructors

### Constructor

> **new ContextFactory**(): `ContextFactory`

#### Returns

`ContextFactory`

## Methods

### fromRequest()

> `static` **fromRequest**(`request`, `requestBody`, `storage`, `session`, `services`, `channel`, `appData?`): `Promise`\<`Readonly`\<[`Context`](../interfaces/Context.md)\<[`Storage`](../interfaces/Storage.md)\>\>\>

Defined in: packages/stentor-context/lib/ContextFactory.d.ts:19

Build context from the provided request.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### requestBody

`object`

##### storage

[`Storage`](../interfaces/Storage.md)

##### session

`SessionStore`

##### services

`ContextFactoryServices`

##### channel

[`Channel`](../interfaces/Channel.md)

This field will disappear in the next major release.  It is only used to set the device field on the context.

##### appData?

`AppRuntimeData`

#### Returns

`Promise`\<`Readonly`\<[`Context`](../interfaces/Context.md)\<[`Storage`](../interfaces/Storage.md)\>\>\>
