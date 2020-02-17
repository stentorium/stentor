/*! Copyright (c) 2019, XAPPmedia */
import { AudioLiveStream, OnDemand, VideoLiveStream } from "stentor-models";
import { MediaPlaylist, MediaPlaylistProps } from "./MediaPlaylist";
import { RSSFeed, RSSFeedProps } from "./RSSFeed";

/*
 * The underlying source of media.
 */
export type MediaSource =
    | RSSFeed
    | RSSFeedProps
    | MediaPlaylist
    | MediaPlaylistProps
    | AudioLiveStream
    | VideoLiveStream
    | OnDemand;
