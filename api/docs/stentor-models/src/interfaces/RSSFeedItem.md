[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / RSSFeedItem

# Interface: RSSFeedItem

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L7)

An individual item (from `<item>`) found within an RSS Feed.

## Extended by

- [`PodcastEpisode`](PodcastEpisode.md)

## Properties

### feedTitle

> **feedTitle**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L13)

The title of the feed the item belongs to.

This is primarily used to remind listeners what feed the feed item came from.

***

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L17)

The title of the feed item.

***

### description?

> `optional` **description**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L21)

Description of the feed item.

***

### subtitle?

> `optional` **subtitle**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L25)

The subtitle of the feed item.

***

### explicit?

> `optional` **explicit**: `boolean`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L29)

If the feed item is marked explicit.

***

### link?

> `optional` **link**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:36](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L36)

The link of the feed item.

This is typically where users can find more information about the RSS feed item and
not the actual media content.

***

### url

> **url**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:40](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L40)

The URL within the `<enclosure>` tag.

***

### mediaType?

> `optional` **mediaType**: `"video/mpeg"` \| `"audio/mpeg"`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:44](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L44)

The media type within the `<enclosure>` tag.

***

### length?

> `optional` **length**: `number`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:48](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L48)

The length within the `<enclosure>` tag.

***

### image?

> `optional` **image**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:52](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L52)

URL for the image

***

### id?

> `optional` **id**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:56](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L56)

The GUID of the feed item.

***

### pubDate?

> `optional` **pubDate**: `string`

Defined in: [packages/stentor-models/src/Media/RSSFeedItem.ts:65](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Media/RSSFeedItem.ts#L65)

Date the feed item was published.

RFC 822 encoded date string, in accordance with the RSS 2.0 specification.

One exception is the year may be expressed with two digits instead of the
preferred four digits.
