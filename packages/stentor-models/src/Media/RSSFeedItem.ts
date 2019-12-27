/*! Copyright (c) 2019, XAPPmedia */
import { PlayableMedia } from "./PlayableMedia";

/**
 * An individual item (from <item>) found within an RSS Feed.
 *
 * @export
 * @interface RSSFeedItem
 */
export interface RSSFeedItem {
    /**
     * The title of the feed the item belongs to.
     *
     * This is primarily used to remind listeners what feed the feed item came from.
     *
     * @type {string}
     * @memberof RSSFeedItem
     */
    feedTitle: string;
    /**
     * The title of the feed item.
     *
     * @type {string}
     * @memberof RSSFeedItem
     */
    title?: string;
    /**
     * Description of the feed item.
     *
     * @type {string}
     * @memberof RSSFeedItem
     */
    description?: string;
    /**
     * The subtitle of the feed item.
     *
     * @type {string}
     * @memberof RSSFeedItem
     */
    subtitle?: string;
    /**
     * If the feed item is marked explicit.
     *
     * @type {boolean}
     * @memberof RSSFeedItem
     */
    explicit?: boolean;
    /**
     * The link of the feed item.
     *
     * This is typically where users can find more information about the RSS feed item and
     * not the actual media content.
     *
     * @type {string}
     * @memberof RSSFeedItem
     */
    link?: string;
    /**
     * The URL within the <enclosure> tag.
     *
     * @type {string}
     * @memberof RSSFeedItem
     */
    url: string;
    /**
     * The media type within the <enclosure> tag.
     *
     * @type {string}
     * @memberof RSSFeedItem
     */
    mediaType?: "video/mpeg" | "audio/mpeg";
    /**
     * The length within the <enclosure> tag.
     *
     * @type {number}
     * @memberof RSSFeedItem
     */
    length?: number;
    /**
     * URL for the image
     *
     * @type {string}
     * @memberof RSSFeedItem
     */
    image?: string;
    /**
     * The GUID of the feed item.
     *
     * @type {string}
     * @memberof RSSFeedItem
     */
    id?: string;
    /**
     * Date the feed item was published.
     *
     * RFC 822 encoded date string, in accordance with the RSS 2.0 specification.
     *
     * One exception is the year may be expressed with two digits instead of the
     * preferred four digits.
     *
     * @type {string}
     * @memberof RSSFeedItem
     */
    pubDate?: string;
}

export type RSSFeedItemPlayableMedia = RSSFeedItem & PlayableMedia;
