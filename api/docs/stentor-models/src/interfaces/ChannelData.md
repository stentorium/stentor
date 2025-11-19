[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ChannelData

# Interface: ChannelData

Defined in: [packages/stentor-models/src/Channel/ChannelData.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/ChannelData.ts#L8)

Channel data, all channel data extends from this object.

## Properties

### id

> **id**: `string`

Defined in: [packages/stentor-models/src/Channel/ChannelData.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/ChannelData.ts#L12)

Unique ID of the channel.

***

### type

> **type**: `string`

Defined in: [packages/stentor-models/src/Channel/ChannelData.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/ChannelData.ts#L16)

The channel type

***

### useNLU?

> `optional` **useNLU**: `string`

Defined in: [packages/stentor-models/src/Channel/ChannelData.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/ChannelData.ts#L25)

ID of the NLU to use within app.nlu[].

If it exists, the channel will use the provided NLU at runtime to convert
the raw text to an Intent.

If the value is "*", then it will pick the first available NLU within app.nlu[]

***

### endPoint?

> `optional` **endPoint**: `string`

Defined in: [packages/stentor-models/src/Channel/ChannelData.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/ChannelData.ts#L29)

URI where the channel can be accessed.

***

### directoryListing?

> `optional` **directoryListing**: `string`

Defined in: [packages/stentor-models/src/Channel/ChannelData.ts:33](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/ChannelData.ts#L33)

URL for the directory listing

***

### status?

> `optional` **status**: [`FullAppStatus`](FullAppStatus.md)

Defined in: [packages/stentor-models/src/Channel/ChannelData.ts:40](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/ChannelData.ts#L40)

The status of the app with respect to this current channel.

An example may be that an app is currently live on Alexa but being
built on Google Home.
