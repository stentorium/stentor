[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / Storage

# Interface: Storage

Defined in: packages/stentor-models/lib/Storage/Storage.d.ts:8

## Extends

- `KeyValueStore`

## Indexable

\[`keys`: `string`\]: `any`

## Properties

### createdTimestamp

> **createdTimestamp**: `number`

Defined in: packages/stentor-models/lib/Storage/Storage.d.ts:15

When the storage was created.  This can be used to keep track of when we first
met the user.

Time is stored as number of milliseconds elapsed since the UNIX epoch.

***

### lastActiveTimestamp?

> `optional` **lastActiveTimestamp**: `number`

Defined in: packages/stentor-models/lib/Storage/Storage.d.ts:22

When the last time we updated the storage was.  This can be used to keep track of when we last
saw the user.

Time is stored as number of milliseconds elapsed since the UNIX epoch.

***

### history?

> `optional` **history**: [`History`](../../../stentor-history/src/interfaces/History.md)

Defined in: packages/stentor-models/lib/Storage/Storage.d.ts:30

Limited history for the user, used to store media they are in the middle of listening to.

Can be used to store other historical data in the future, such as previous responses they have heard.

NOTE: We might want to make history required on storage.

***

### currentHandler?

> `optional` **currentHandler**: [`Handler`](Handler.md)

Defined in: packages/stentor-models/lib/Storage/Storage.d.ts:34

The current handler of intents & events.

***

### previousHandler?

> `optional` **previousHandler**: [`Handler`](Handler.md)

Defined in: packages/stentor-models/lib/Storage/Storage.d.ts:38

The previous handler before the current

***

### previousIntent?

> `optional` **previousIntent**: [`Intent`](Intent.md)

Defined in: packages/stentor-models/lib/Storage/Storage.d.ts:42

The previous intent before the current

***

### previousResponse?

> `optional` **previousResponse**: [`Response`](../type-aliases/Response.md)

Defined in: packages/stentor-models/lib/Storage/Storage.d.ts:46

The previous response given to the user.

***

### unknownInputs?

> `optional` **unknownInputs**: `number`

Defined in: packages/stentor-models/lib/Storage/Storage.d.ts:50

Number of consecutive InputUnknown requests received from the user

***

### currentAudioHandler?

> `optional` **currentAudioHandler**: [`Handler`](Handler.md)

Defined in: packages/stentor-models/lib/Storage/Storage.d.ts:54

The current handler that is playing audio.

***

### sessionStore?

> `optional` **sessionStore**: `SessionStoreData`

Defined in: packages/stentor-models/lib/Storage/Storage.d.ts:58

Session raw data that is used to create the session store

***

### piiToken?

> `optional` **piiToken**: `string`

Defined in: packages/stentor-models/lib/Storage/Storage.d.ts:62

The PII information key (pii token)
