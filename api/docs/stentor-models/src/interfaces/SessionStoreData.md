[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / SessionStoreData

# Interface: SessionStoreData

Defined in: [packages/stentor-models/src/Storage/SessionStore.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/SessionStore.ts#L7)

Lets make it simple and versatile

## Properties

### id

> **id**: `string`

Defined in: [packages/stentor-models/src/Storage/SessionStore.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/SessionStore.ts#L11)

ID for the session storage, typically the session ID.

***

### transcript?

> `optional` **transcript**: [`Message`](Message.md)[]

Defined in: [packages/stentor-models/src/Storage/SessionStore.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/SessionStore.ts#L15)

Optional transcript of the session that can be used for reporting purposes.

***

### data

> **data**: `object`

Defined in: [packages/stentor-models/src/Storage/SessionStore.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/SessionStore.ts#L19)

The data store that is modified.

#### Index Signature

\[`key`: `string`\]: `any`
