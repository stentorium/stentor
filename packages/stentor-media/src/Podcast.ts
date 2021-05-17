/*! Copyright (c) 2019, XAPPmedia */
import { PodcastEpisode, PodcastType } from "stentor-models";
import { RSSFeed, RSSFeedProps } from "./RSSFeed";

export interface PodcastProps extends RSSFeedProps<PodcastEpisode> {
    type: PodcastType;
}

/**
 * Podcast
 *
 * <p>
 * Note: Potential refactor - should this extend Playlist?
 * </p>
 * @class Podcast
 * @implements {PodcastProps}
 */
export class Podcast extends RSSFeed<PodcastEpisode> {
    readonly type: PodcastType;

    constructor(podcast: Podcast | PodcastProps) {
        super(podcast);

        // Set the prototype explicitly.
        // Recommendation from https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
        Object.setPrototypeOf(this, Podcast.prototype);
    }
}
