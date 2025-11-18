[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / PodcastEpisode

# Interface: PodcastEpisode

Defined in: [packages/stentor-models/src/Media/PodcastEpisode.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/PodcastEpisode.ts#L9)

An episode for a podcast.

## Extends

- [`RSSFeedItem`](RSSFeedItem.md).[`Audio`](Audio.md)

## Properties

### backgroundImage?

> `optional` **backgroundImage**: `string`

Defined in: [packages/stentor-models/src/Media/Audio.ts:49](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/Audio.ts#L49)

When applicable (Alexa), the background image for display surfaces.

Minimum dimensions are 1024 by 640 pixels

#### Inherited from

[`Audio`](Audio.md).[`backgroundImage`](Audio.md#backgroundimage)

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

***

### type

> **type**: `"PodcastEpisode"`

Defined in: [packages/stentor-models/src/Media/PodcastEpisode.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/PodcastEpisode.ts#L10)

The type of media.

#### Overrides

[`Audio`](Audio.md).[`type`](Audio.md#type)

***

### feedTitle

> **feedTitle**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L13)

The title of the feed the item belongs to.

This is primarily used to remind listeners what feed the feed item came from.

#### Inherited from

[`RSSFeedItem`](RSSFeedItem.md).[`feedTitle`](RSSFeedItem.md#feedtitle)

***

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L17)

The title of the feed item.

#### Inherited from

[`RSSFeedItem`](RSSFeedItem.md).[`title`](RSSFeedItem.md#title)

***

### description?

> `optional` **description**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L21)

Description of the feed item.

#### Inherited from

[`RSSFeedItem`](RSSFeedItem.md).[`description`](RSSFeedItem.md#description)

***

### subtitle?

> `optional` **subtitle**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L25)

The subtitle of the feed item.

#### Inherited from

[`RSSFeedItem`](RSSFeedItem.md).[`subtitle`](RSSFeedItem.md#subtitle)

***

### explicit?

> `optional` **explicit**: `boolean`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L29)

If the feed item is marked explicit.

#### Inherited from

[`RSSFeedItem`](RSSFeedItem.md).[`explicit`](RSSFeedItem.md#explicit)

***

### link?

> `optional` **link**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:36](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L36)

The link of the feed item.

This is typically where users can find more information about the RSS feed item and
not the actual media content.

#### Inherited from

[`RSSFeedItem`](RSSFeedItem.md).[`link`](RSSFeedItem.md#link)

***

### url

> **url**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:40](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L40)

The URL within the `<enclosure>` tag.

#### Inherited from

[`RSSFeedItem`](RSSFeedItem.md).[`url`](RSSFeedItem.md#url)

***

### mediaType?

> `optional` **mediaType**: `"video/mpeg"` \| `"audio/mpeg"`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:44](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L44)

The media type within the `<enclosure>` tag.

#### Inherited from

[`RSSFeedItem`](RSSFeedItem.md).[`mediaType`](RSSFeedItem.md#mediatype)

***

### length?

> `optional` **length**: `number`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:48](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L48)

The length within the `<enclosure>` tag.

#### Inherited from

[`RSSFeedItem`](RSSFeedItem.md).[`length`](RSSFeedItem.md#length)

***

### image?

> `optional` **image**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:52](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L52)

URL for the image

#### Inherited from

[`RSSFeedItem`](RSSFeedItem.md).[`image`](RSSFeedItem.md#image)

***

### id?

> `optional` **id**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:56](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L56)

The GUID of the feed item.

#### Inherited from

[`RSSFeedItem`](RSSFeedItem.md).[`id`](RSSFeedItem.md#id)

***

### pubDate?

> `optional` **pubDate**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:65](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L65)

Date the feed item was published.

RFC 822 encoded date string, in accordance with the RSS 2.0 specification.

One exception is the year may be expressed with two digits instead of the
preferred four digits.

#### Inherited from

[`RSSFeedItem`](RSSFeedItem.md).[`pubDate`](RSSFeedItem.md#pubdate)
