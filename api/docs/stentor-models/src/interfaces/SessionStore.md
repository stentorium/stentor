[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / SessionStore

# Interface: SessionStore

Defined in: [packages/stentor-models/src/Storage/SessionStore.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/SessionStore.ts#L22)

## Methods

### get()

> **get**(`key`): `any`

Defined in: [packages/stentor-models/src/Storage/SessionStore.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/SessionStore.ts#L29)

Get a session value

#### Parameters

##### key

`string`

Key for value to be retrieved

#### Returns

`any`

Value for the supplied key

***

### set()

> **set**(`key`, `value`): `void`

Defined in: [packages/stentor-models/src/Storage/SessionStore.ts:36](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/SessionStore.ts#L36)

Set a value with a key

#### Parameters

##### key

`string`

Key for value to be set

##### value

`any`

Value to be set on the store

#### Returns

`void`

***

### getStore()

> **getStore**(): `any`

Defined in: [packages/stentor-models/src/Storage/SessionStore.ts:42](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/SessionStore.ts#L42)

This will return the whole store

#### Returns

`any`

The session storage

***

### transcript()?

> `optional` **transcript**(): [`Message`](Message.md)[]

Defined in: [packages/stentor-models/src/Storage/SessionStore.ts:46](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/SessionStore.ts#L46)

Returns the transcript of the session.

#### Returns

[`Message`](Message.md)[]
