/*! Copyright (c) 2019, XAPPmedia */
import { Audio } from "./Audio";
import { RSSFeedItem } from "./RSSFeedItem";
import { PodcastEpisodeType } from "./Types";
/**
 * An episode for a podcast.
 *
 * @export
 * @interface PodcastEpisode
 * @extends {Audio}
 */
export interface PodcastEpisode extends RSSFeedItem, Audio {
    type: PodcastEpisodeType;
}
