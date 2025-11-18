[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / AudioLiveStream

# Interface: AudioLiveStream

Defined in: [packages/stentor-models/src/Media/LiveStream.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/LiveStream.ts#L9)

Audio with an indefinite length that cannot be paused.

## Extends

- [`Audio`](Audio.md)

## Properties

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L23)

Title (or name) of the audio.

This is typically the track title
or podcast episode name.

#### Inherited from

[`Audio`](Audio.md).[`title`](Audio.md#title)

***

### subtitle?

> `optional` **subtitle**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L30)

Subtitle for the audio.

This is typically the category or
artist name.

#### Inherited from

[`Audio`](Audio.md).[`subtitle`](Audio.md#subtitle)

***

### description?

> `optional` **description**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L37)

Description of the audio

Max length is 160 characters, limited by
Google.

#### Inherited from

[`Audio`](Audio.md).[`description`](Audio.md#description)

***

### image?

> `optional` **image**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L43)

Image for the audio, typically the album art.

Dimensions must be square, minimum 480 by 480 pixels

#### Inherited from

[`Audio`](Audio.md).[`image`](Audio.md#image)

***

### backgroundImage?

> `optional` **backgroundImage**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:49](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L49)

When applicable (Alexa), the background image for display surfaces.

Minimum dimensions are 1024 by 640 pixels

#### Inherited from

[`Audio`](Audio.md).[`backgroundImage`](Audio.md#backgroundimage)

***

### type

> **type**: `"LiveStream"`

Defined in: [packages/stentor-models/src/Media/LiveStream.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/LiveStream.ts#L10)

The type of media.

#### Overrides

[`Audio`](Audio.md).[`type`](Audio.md#type)

***

### length

> **length**: `-1`

Defined in: [packages/stentor-models/src/Media/LiveStream.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/LiveStream.ts#L14)

Length for livestreams is always negative one since it has no length.

#### Overrides

[`Audio`](Audio.md).[`length`](Audio.md#length)

***

### ~~name?~~

> `optional` **name**: `string`

Defined in: [packages/stentor-models/src/Media/LiveStream.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/LiveStream.ts#L22)

Name of the stream.

Use title instead.

#### Deprecated

Use title instead

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

[`Audio`](Audio.md).[`id`](Audio.md#id)

***

### token?

> `optional` **token**: `string`

Defined in: [packages/stentor-models/src/Media/Playable.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L17)

A token for the playable object that represents a unique playback of the track.

#### Inherited from

[`Audio`](Audio.md).[`token`](Audio.md#token)

***

### visuals?

> `optional` **visuals**: [`Visuals`](Visuals.md)

Defined in: [packages/stentor-models/src/Media/Playable.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L29)

Things to show on screens if the device is capable of showing.

This is used primarily on Google for media cards.

#### Inherited from

[`Audio`](Audio.md).[`visuals`](Audio.md#visuals)
