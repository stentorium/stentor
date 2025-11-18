[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Storage

# Interface: Storage

Defined in: [packages/stentor-models/src/Storage/Storage.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/Storage.ts#L9)

## Extends

- [`KeyValueStore`](KeyValueStore.md)

## Indexable

\[`keys`: `string`\]: `any`

## Properties

### createdTimestamp

> **createdTimestamp**: `number`

Defined in: [packages/stentor-models/src/Storage/Storage.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/Storage.ts#L16)

When the storage was created.  This can be used to keep track of when we first
met the user.

Time is stored as number of milliseconds elapsed since the UNIX epoch.

***

### lastActiveTimestamp?

> `optional` **lastActiveTimestamp**: `number`

Defined in: [packages/stentor-models/src/Storage/Storage.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/Storage.ts#L23)

When the last time we updated the storage was.  This can be used to keep track of when we last
saw the user.

Time is stored as number of milliseconds elapsed since the UNIX epoch.

***

### history?

> `optional` **history**: [`History`](History.md)

Defined in: [packages/stentor-models/src/Storage/Storage.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/Storage.ts#L31)

Limited history for the user, used to store media they are in the middle of listening to.

Can be used to store other historical data in the future, such as previous responses they have heard.

NOTE: We might want to make history required on storage.

***

### currentHandler?

> `optional` **currentHandler**: [`Handler`](Handler.md)

Defined in: [packages/stentor-models/src/Storage/Storage.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/Storage.ts#L35)

The current handler of intents & events.

***

### previousHandler?

> `optional` **previousHandler**: [`Handler`](Handler.md)

Defined in: [packages/stentor-models/src/Storage/Storage.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/Storage.ts#L39)

The previous handler before the current

***

### previousIntent?

> `optional` **previousIntent**: [`Intent`](Intent.md)

Defined in: [packages/stentor-models/src/Storage/Storage.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/Storage.ts#L43)

The previous intent before the current

***

### previousResponse?

> `optional` **previousResponse**: [`Response`](../type-aliases/Response.md)

Defined in: [packages/stentor-models/src/Storage/Storage.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/Storage.ts#L47)

The previous response given to the user.

***

### unknownInputs?

> `optional` **unknownInputs**: `number`

Defined in: [packages/stentor-models/src/Storage/Storage.ts:51](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/Storage.ts#L51)

Number of consecutive InputUnknown requests received from the user

***

### currentAudioHandler?

> `optional` **currentAudioHandler**: [`Handler`](Handler.md)

Defined in: [packages/stentor-models/src/Storage/Storage.ts:55](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/Storage.ts#L55)

The current handler that is playing audio.

***

### sessionStore?

> `optional` **sessionStore**: [`SessionStoreData`](SessionStoreData.md)

Defined in: [packages/stentor-models/src/Storage/Storage.ts:59](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/Storage.ts#L59)

Session raw data that is used to create the session store

***

### piiToken?

> `optional` **piiToken**: `string`

Defined in: [packages/stentor-models/src/Storage/Storage.ts:67](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Storage/Storage.ts#L67)

The PII information key (pii token)
