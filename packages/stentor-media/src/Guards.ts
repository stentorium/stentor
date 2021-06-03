/*! Copyright (c) 2019, XAPPmedia */
import {
    Audio,
    AudioLiveStream,
    GenericAudio,
    Media,
    Playable,
    PlayableMedia,
    PodcastEpisode,
    Reportable,
    Song,
    Video,
    VideoLiveStream
} from "stentor-models";
import {
    AUDIO_LIVE_STREAM,
    GENERIC_AUDIO,
    GENERIC_RSS_FEED,
    PODCAST,
    PODCAST_EPISODE,
    SONG,
    VIDEO,
    VIDEO_LIVE_STREAM
} from "./Constants";
import { MediaPlaylist, MediaPlaylistProps } from "./MediaPlaylist";
import { Playlist, PlaylistProps } from "./Playlist";
import { RSSFeed, RSSFeedProps } from "./RSSFeed";

/**
 * Check if the playable is reportable.
 *
 * @param {Playable} playable
 * @returns {playable is Reportable}
 */
export function isReportable(playable: Playable): playable is Reportable {
    return (playable as Reportable).playedId !== undefined;
}

/**
 * Type guard to see if the Audio is a song.
 *
 * @param {Media} media
 * @returns {media is Song}
 */
export function isSong(media: Media): media is Song {
    return !!media && media.type === SONG;
}

/**
 * Type guard to check if media is GenericAudio.
 *
 * @param {Media} media
 * @returns {media is GenericAudio}
 */
export function isGenericAudio(media: Media): media is GenericAudio {
    return !!media && media.type === GENERIC_AUDIO;
}

/**
 * Type guard to check if media is a AudioLiveStream
 *
 * @param {Media} media
 * @returns {media is AudioLiveStream}
 */
export function isAudioLiveStream(media: Media): media is AudioLiveStream {
    return !!media && media.type === AUDIO_LIVE_STREAM;
}

/**
 * Type guard to determine if media is a PodcastEpisode
 *
 * @param {Media} media
 * @returns {media is PodcastEpisode}
 */
export function isPodcastEpisode(media: Media): media is PodcastEpisode {
    return !!media && media.type === PODCAST_EPISODE;
}

/**
 * Type guard to determine if the Media is Audio
 *
 * @param {Media} media
 * @returns {media is Audio}
 */
export function isAudio(media: Media): media is Audio {
    return (
        !!media &&
        (media.type === AUDIO_LIVE_STREAM ||
            media.type === GENERIC_AUDIO ||
            media.type === SONG ||
            media.type === PODCAST_EPISODE)
    );
}

/**
 * Type guard to determine if the Media is Video
 *
 * @param {Media} media
 * @returns {media is Video}
 */
export function isVideo(media: Media): media is Video {
    return !!media && (media.type === VIDEO || media.type === VIDEO_LIVE_STREAM);
}

/**
 * Type guard to determine if Media is a Video
 *
 * @param {Media} media
 * @returns {media is VideoLiveStream}
 */
export function isVideoLiveStream(media: Media): media is VideoLiveStream {
    return !!media && media.type === VIDEO_LIVE_STREAM;
}

/**
 * Type guard to determine if the props are for an RSSFeed.
 *
 * @param props
 */
export function isRSSFeedProps(
    props: PlayableMedia[] | RSSFeedProps | RSSFeed | MediaPlaylist | MediaPlaylistProps | Playlist | PlaylistProps
): props is RSSFeedProps {
    if (!props) {
        return false;
    }

    return (props as RSSFeedProps).type === GENERIC_RSS_FEED || (props as RSSFeedProps).type === PODCAST;
}

/**
 * Guard to determine if the props are PlaylistProps
 */
export function isPlaylistProps<P extends Playable>(props: any): props is PlaylistProps<P> {
    if (!props) {
        return false;
    }

    if (typeof props !== "object") {
        return false;
    }

    const hasName: boolean = props.name !== undefined;
    const hasZeroIndex: boolean = props[0] || props["0"];

    return hasName || hasZeroIndex;
}
