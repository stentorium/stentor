[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-media/src](../README.md) / isRSSFeedProps

# Function: isRSSFeedProps()

> **isRSSFeedProps**(`props`): `props is RSSFeedProps<RSSFeedItemPlayableMedia>`

Defined in: [packages/stentor-media/src/Guards.ts:120](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/Guards.ts#L120)

Type guard to determine if the props are for an RSSFeed.

## Parameters

### props

`PlayableMedia`[] | [`RSSFeedProps`](../interfaces/RSSFeedProps.md)\<`RSSFeedItemPlayableMedia`\> | [`RSSFeed`](../classes/RSSFeed.md)\<`RSSFeedItemPlayableMedia`\> | [`MediaPlaylist`](../classes/MediaPlaylist.md)\<`PlayableMedia`\> | [`MediaPlaylistProps`](../interfaces/MediaPlaylistProps.md)\<`PlayableMedia`\> | [`Playlist`](../classes/Playlist.md)\<`Playable`\> | [`PlaylistProps`](../interfaces/PlaylistProps.md)\<`Playable`\>

## Returns

`props is RSSFeedProps<RSSFeedItemPlayableMedia>`
