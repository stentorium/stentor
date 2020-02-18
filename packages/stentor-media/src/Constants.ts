/*! Copyright (c) 2019, XAPPmedia */
import {
    Audio,
    AudioLiveStreamType,
    GenericAudioType,
    GenericMediaPlaylistType,
    GenericRSSFeedType,
    ImageType,
    PodcastEpisodeType,
    PodcastType,
    SocialRadioType,
    SongType,
    UnspecifiedMediaType,
    VideoLiveStreamType,
    VideoType
} from "stentor-models";

// Images
export const IMAGE: ImageType = "Image";
// Video
export const VIDEO: VideoType = "Video";
export const VIDEO_LIVE_STREAM: VideoLiveStreamType = "VideoLiveStream";
// Audio
export const AUDIO_LIVE_STREAM: AudioLiveStreamType = "LiveStream";
export const PODCAST_EPISODE: PodcastEpisodeType = "PodcastEpisode";
export const SONG: SongType = "Song";
export const GENERIC_AUDIO: GenericAudioType = "Audio";
// Just Media
export const UNSPECIFIED_MEDIA: UnspecifiedMediaType = "Media";
// RSS Feed
export const GENERIC_RSS_FEED: GenericRSSFeedType = "RSSFeed";
export const PODCAST: PodcastType = "Podcast";

export const GENERIC_MEDIA_PLAYLIST: GenericMediaPlaylistType = "MediaPlaylist";

export const SOCIAL_RADIO: SocialRadioType = "SocialRadio";

// Error: "Steam you requested is unavailable right now..."
const ERROR_PLAYABLE_URL = "https://s3.amazonaws.com/xapp-stentor-assets/stream-error-message-alexa.mp3";
const ERROR_PLAYABLE_TOKEN = "ERROR";

export const ERROR_PLAYABLE: Audio = {
    type: GENERIC_AUDIO,
    url: ERROR_PLAYABLE_URL,
    token: ERROR_PLAYABLE_TOKEN
};
