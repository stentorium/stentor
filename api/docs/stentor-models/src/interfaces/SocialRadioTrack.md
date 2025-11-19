[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / SocialRadioTrack

# Interface: SocialRadioTrack

Defined in: [packages/stentor-models/src/Media/SocialRadio.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/SocialRadio.ts#L17)

Tracks in SocialRadio are typically filler audio used
for station identification.

## Extends

- [`ReportableAudio`](ReportableAudio.md)

## Properties

### type

> **type**: [`AudioType`](../type-aliases/AudioType.md)

Defined in: [packages/stentor-models/src/Media/Audio.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L16)

The type of media.

#### Inherited from

[`ReportableAudio`](ReportableAudio.md).[`type`](ReportableAudio.md#type)

***

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L23)

Title (or name) of the audio.

This is typically the track title
or podcast episode name.

#### Inherited from

[`ReportableAudio`](ReportableAudio.md).[`title`](ReportableAudio.md#title)

***

### subtitle?

> `optional` **subtitle**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L30)

Subtitle for the audio.

This is typically the category or
artist name.

#### Inherited from

[`ReportableAudio`](ReportableAudio.md).[`subtitle`](ReportableAudio.md#subtitle)

***

### description?

> `optional` **description**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L37)

Description of the audio

Max length is 160 characters, limited by
Google.

#### Inherited from

[`ReportableAudio`](ReportableAudio.md).[`description`](ReportableAudio.md#description)

***

### image?

> `optional` **image**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L43)

Image for the audio, typically the album art.

Dimensions must be square, minimum 480 by 480 pixels

#### Inherited from

[`ReportableAudio`](ReportableAudio.md).[`image`](ReportableAudio.md#image)

***

### backgroundImage?

> `optional` **backgroundImage**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:49](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L49)

When applicable (Alexa), the background image for display surfaces.

Minimum dimensions are 1024 by 640 pixels

#### Inherited from

[`ReportableAudio`](ReportableAudio.md).[`backgroundImage`](ReportableAudio.md#backgroundimage)

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

[`ReportableAudio`](ReportableAudio.md).[`id`](ReportableAudio.md#id)

***

### token?

> `optional` **token**: `string`

Defined in: [packages/stentor-models/src/Media/Playable.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L17)

A token for the playable object that represents a unique playback of the track.

#### Inherited from

[`ReportableAudio`](ReportableAudio.md).[`token`](ReportableAudio.md#token)

***

### length?

> `optional` **length**: `number`

Defined in: [packages/stentor-models/src/Media/Playable.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L23)

The length of the playable object in milliseconds.

A length of -1 denotes the playable has no end.

#### Inherited from

[`ReportableAudio`](ReportableAudio.md).[`length`](ReportableAudio.md#length)

***

### visuals?

> `optional` **visuals**: [`Visuals`](Visuals.md)

Defined in: [packages/stentor-models/src/Media/Playable.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Playable.ts#L29)

Things to show on screens if the device is capable of showing.

This is used primarily on Google for media cards.

#### Inherited from

[`ReportableAudio`](ReportableAudio.md).[`visuals`](ReportableAudio.md#visuals)

***

### playedId?

> `optional` **playedId**: `string`

Defined in: [packages/stentor-models/src/Media/Reportable.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Reportable.ts#L12)

An ID representing a playback of the playable.

#### Inherited from

[`ReportableAudio`](ReportableAudio.md).[`playedId`](ReportableAudio.md#playedid)
