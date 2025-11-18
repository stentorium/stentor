[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Playable

# Interface: Playable

Defined in: [packages/stentor-models/src/Media/Playable.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L5)

An object that can be played.

## Extended by

- [`Reportable`](Reportable.md)

## Properties

### url

> **url**: `string`

Defined in: [packages/stentor-models/src/Media/Playable.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L9)

The URL for the playable object.

***

### id?

> `optional` **id**: `string`

Defined in: [packages/stentor-models/src/Media/Playable.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L13)

An ID for the playable object.

***

### token?

> `optional` **token**: `string`

Defined in: [packages/stentor-models/src/Media/Playable.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L17)

A token for the playable object that represents a unique playback of the track.

***

### length?

> `optional` **length**: `number`

Defined in: [packages/stentor-models/src/Media/Playable.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L23)

The length of the playable object in milliseconds.

A length of -1 denotes the playable has no end.

***

### visuals?

> `optional` **visuals**: [`Visuals`](Visuals.md)

Defined in: [packages/stentor-models/src/Media/Playable.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L29)

Things to show on screens if the device is capable of showing.

This is used primarily on Google for media cards.
