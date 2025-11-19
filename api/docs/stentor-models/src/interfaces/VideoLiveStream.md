[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / VideoLiveStream

# Interface: VideoLiveStream

Defined in: [packages/stentor-models/src/Media/LiveStream.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/LiveStream.ts#L25)

Video media

## Extends

- [`Video`](Video.md)

## Properties

### type

> **type**: `"VideoLiveStream"`

Defined in: [packages/stentor-models/src/Media/LiveStream.ts:26](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/LiveStream.ts#L26)

The type of media.

#### Overrides

[`Video`](Video.md).[`type`](Video.md#type)

***

### length

> **length**: `-1`

Defined in: [packages/stentor-models/src/Media/LiveStream.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/LiveStream.ts#L27)

The length of the playable object in milliseconds.

A length of -1 denotes the playable has no end.

#### Overrides

[`Video`](Video.md).[`length`](Video.md#length)

***

### url

> **url**: `string`

Defined in: [packages/stentor-models/src/Media/Playable.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L9)

The URL for the playable object.

#### Inherited from

[`Playable`](Playable.md).[`url`](Playable.md#url)

***

### id?

> `optional` **id**: `string`

Defined in: [packages/stentor-models/src/Media/Playable.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L13)

An ID for the playable object.

#### Inherited from

[`Video`](Video.md).[`id`](Video.md#id)

***

### token?

> `optional` **token**: `string`

Defined in: [packages/stentor-models/src/Media/Playable.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L17)

A token for the playable object that represents a unique playback of the track.

#### Inherited from

[`Video`](Video.md).[`token`](Video.md#token)

***

### visuals?

> `optional` **visuals**: [`Visuals`](Visuals.md)

Defined in: [packages/stentor-models/src/Media/Playable.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L29)

Things to show on screens if the device is capable of showing.

This is used primarily on Google for media cards.

#### Inherited from

[`Video`](Video.md).[`visuals`](Video.md#visuals)
