[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Reportable

# Interface: Reportable

Defined in: [packages/stentor-models/src/Media/Reportable.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Reportable.ts#L8)

A playable whose playback can be reported to
a third party.

## Extends

- [`Playable`](Playable.md)

## Extended by

- [`ReportableSong`](ReportableSong.md)
- [`ReportableAudio`](ReportableAudio.md)

## Properties

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

[`Playable`](Playable.md).[`id`](Playable.md#id)

***

### token?

> `optional` **token**: `string`

Defined in: [packages/stentor-models/src/Media/Playable.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L17)

A token for the playable object that represents a unique playback of the track.

#### Inherited from

[`Playable`](Playable.md).[`token`](Playable.md#token)

***

### length?

> `optional` **length**: `number`

Defined in: [packages/stentor-models/src/Media/Playable.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L23)

The length of the playable object in milliseconds.

A length of -1 denotes the playable has no end.

#### Inherited from

[`Playable`](Playable.md).[`length`](Playable.md#length)

***

### visuals?

> `optional` **visuals**: [`Visuals`](Visuals.md)

Defined in: [packages/stentor-models/src/Media/Playable.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L29)

Things to show on screens if the device is capable of showing.

This is used primarily on Google for media cards.

#### Inherited from

[`Playable`](Playable.md).[`visuals`](Playable.md#visuals)

***

### playedId?

> `optional` **playedId**: `string`

Defined in: [packages/stentor-models/src/Media/Reportable.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Reportable.ts#L12)

An ID representing a playback of the playable.
