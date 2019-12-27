/*! Copyright (c) 2019, XAPPmedia */
export declare type UnspecifiedMediaType = "Media";
export declare type MultimediaType = "Multimedia";
export declare type ImageType = "Image";
export declare type VideoLiveStreamType = "VideoLiveStream";
export declare type GenericVideoType = "Video";
export declare type VideoType = GenericVideoType | VideoLiveStreamType;
export declare type AudioLiveStreamType = "LiveStream";
export declare type PodcastEpisodeType = "PodcastEpisode";
export declare type SongType = "Song";
export declare type GenericAudioType = "Audio";
export declare type LiveStreamType = AudioLiveStreamType | VideoLiveStreamType;
/**
 * AudioType is the combination of all types of audio
 */
export declare type AudioType = PodcastEpisodeType | SongType | AudioLiveStreamType | GenericAudioType;
/**
 * MediaType is the combination of Audio, Video, and Images
 */
export declare type MediaType = AudioType | VideoType | ImageType | UnspecifiedMediaType;
export declare type PodcastType = "Podcast";
export declare type GenericRSSFeedType = "RSSFeed";
export declare type RSSFeedType = GenericRSSFeedType | PodcastType;
export declare type GenericMediaPlaylistType = "MediaPlaylist";
export declare type MediaPlaylistType = GenericMediaPlaylistType | RSSFeedType;
export declare type PlaylistType = RSSFeedType | MediaPlaylistType;
export declare type SocialRadioType = "SocialRadio";
export declare type OnDemandType = SocialRadioType;
export declare type MediaSourceType = OnDemandType | PlaylistType | AudioLiveStreamType | VideoLiveStreamType;
