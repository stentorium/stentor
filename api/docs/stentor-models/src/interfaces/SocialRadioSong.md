[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / SocialRadioSong

# Interface: SocialRadioSong

Defined in: [packages/stentor-models/src/Media/SocialRadio.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/SocialRadio.ts#L22)

Just a normal song

## Extends

- [`ReportableSong`](ReportableSong.md)

## Properties

### subtitle?

> `optional` **subtitle**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L30)

Subtitle for the audio.

This is typically the category or
artist name.

#### Inherited from

[`ReportableSong`](ReportableSong.md).[`subtitle`](ReportableSong.md#subtitle)

***

### description?

> `optional` **description**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L37)

Description of the audio

Max length is 160 characters, limited by
Google.

#### Inherited from

[`ReportableSong`](ReportableSong.md).[`description`](ReportableSong.md#description)

***

### image?

> `optional` **image**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L43)

Image for the audio, typically the album art.

Dimensions must be square, minimum 480 by 480 pixels

#### Inherited from

[`ReportableSong`](ReportableSong.md).[`image`](ReportableSong.md#image)

***

### backgroundImage?

> `optional` **backgroundImage**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:49](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L49)

When applicable (Alexa), the background image for display surfaces.

Minimum dimensions are 1024 by 640 pixels

#### Inherited from

[`ReportableSong`](ReportableSong.md).[`backgroundImage`](ReportableSong.md#backgroundimage)

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

[`ReportableSong`](ReportableSong.md).[`id`](ReportableSong.md#id)

***

### token?

> `optional` **token**: `string`

Defined in: [packages/stentor-models/src/Media/Playable.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L17)

A token for the playable object that represents a unique playback of the track.

#### Inherited from

[`ReportableSong`](ReportableSong.md).[`token`](ReportableSong.md#token)

***

### length?

> `optional` **length**: `number`

Defined in: [packages/stentor-models/src/Media/Playable.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L23)

The length of the playable object in milliseconds.

A length of -1 denotes the playable has no end.

#### Inherited from

[`ReportableSong`](ReportableSong.md).[`length`](ReportableSong.md#length)

***

### visuals?

> `optional` **visuals**: [`Visuals`](Visuals.md)

Defined in: [packages/stentor-models/src/Media/Playable.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L29)

Things to show on screens if the device is capable of showing.

This is used primarily on Google for media cards.

#### Inherited from

[`ReportableSong`](ReportableSong.md).[`visuals`](ReportableSong.md#visuals)

***

### playedId?

> `optional` **playedId**: `string`

Defined in: [packages/stentor-models/src/Media/Reportable.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Reportable.ts#L12)

An ID representing a playback of the playable.

#### Inherited from

[`ReportableSong`](ReportableSong.md).[`playedId`](ReportableSong.md#playedid)

***

### type

> **type**: `"Song"`

Defined in: [packages/stentor-models/src/Media/Song.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Song.ts#L9)

The type of media.

#### Inherited from

[`ReportableSong`](ReportableSong.md).[`type`](ReportableSong.md#type)

***

### title

> **title**: `string`

Defined in: [packages/stentor-models/src/Media/Song.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Song.ts#L10)

Title (or name) of the audio.

This is typically the track title
or podcast episode name.

#### Inherited from

[`ReportableSong`](ReportableSong.md).[`title`](ReportableSong.md#title)

***

### artist?

> `optional` **artist**: `string`

Defined in: [packages/stentor-models/src/Media/Song.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Song.ts#L11)

#### Inherited from

[`ReportableSong`](ReportableSong.md).[`artist`](ReportableSong.md#artist)

***

### album?

> `optional` **album**: `string`

Defined in: [packages/stentor-models/src/Media/Song.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Song.ts#L12)

#### Inherited from

[`ReportableSong`](ReportableSong.md).[`album`](ReportableSong.md#album)
