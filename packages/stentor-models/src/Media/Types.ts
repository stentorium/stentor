/*! Copyright (c) 2019, XAPPmedia */
/*
 * MEDIA
 */

// Unspecified is the default, it is the unknown
export type UnspecifiedMediaType = "Media";
// Multimedia is the combination of many types of media but is presented at the same time
// across multiple devices.
export type MultimediaType = "Multimedia";

/*
 * IMAGES
 */

// Image Types
// Note, we may end up adding more types
// such as png, jpeg, etc.  In that case
// we can make UnspecifiedImageType = "Image";
// and ImageType then is:
// ImageType = PNGImageType | ... | UnspecifiedImageType;
export type ImageType = "Image";

/*
 * VIDEO
 */

// Video Types
// Note, we may end up adding more video types
// and in that case we can follow the same pattern
// we do for images noted above.
export type VideoLiveStreamType = "VideoLiveStream";
// Generic
export type GenericVideoType = "Video";
// Combined videotype, contains all the possible types of video
export type VideoType = GenericVideoType | VideoLiveStreamType;

/*
 * AUDIO
 */

// Audio Types
export type AudioLiveStreamType = "LiveStream";
export type PodcastEpisodeType = "PodcastEpisode";
export type SongType = "Song";
// Generic
export type GenericAudioType = "Audio";

// Live Stream
// A subtype.
export type LiveStreamType = AudioLiveStreamType | VideoLiveStreamType;

/**
 * AudioType is the combination of all types of audio
 */
export type AudioType = PodcastEpisodeType | SongType | AudioLiveStreamType | GenericAudioType;

/**
 * MediaType is the combination of Audio, Video, and Images
 */
export type MediaType = AudioType | VideoType | ImageType | UnspecifiedMediaType;

/*
 * PLAYLIST
 */

// Playlist types
// First is a playlist that is communicated through an RSS feed
export type PodcastType = "Podcast";
export type GenericRSSFeedType = "RSSFeed";
export type RSSFeedType = GenericRSSFeedType | PodcastType;

export type GenericMediaPlaylistType = "MediaPlaylist";

export type MediaPlaylistType = GenericMediaPlaylistType | RSSFeedType;

// With the above RSSFeed types we can then add a generic playlist

// to create a playlist type that all extend from
export type PlaylistType = RSSFeedType | MediaPlaylistType;

/*
 * ON DEMAND (API)
 */

export type SocialRadioType = "SocialRadio";
export type OnDemandType = SocialRadioType; // Yes, currently only one

export type MediaSourceType = OnDemandType | PlaylistType | AudioLiveStreamType | VideoLiveStreamType;
