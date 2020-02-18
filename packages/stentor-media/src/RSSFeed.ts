/*! Copyright (c) 2019, XAPPmedia */
import { RSSFeedItemPlayableMedia, RSSFeedType } from "stentor-models";
import { GENERIC_RSS_FEED } from "./Constants";
import { isRSSFeedProps } from "./Guards";
import { MediaPlaylist, MediaPlaylistProps } from "./MediaPlaylist";
import { Playlist, PlaylistProps } from "./Playlist";

export interface RSSFeedProps<T extends RSSFeedItemPlayableMedia = RSSFeedItemPlayableMedia>
    extends MediaPlaylistProps<T> {
    type: RSSFeedType;
    url: string;
    title?: string;
    explicit?: boolean;
    description?: string;
    subtitle?: string;
    imageUrl?: string;
    fetchTime?: number;
    playlist?: T[];
}

// TODO: Potentially be able to just return RSSFeedItems that are not necessarily PlayableMedia
export class RSSFeed<T extends RSSFeedItemPlayableMedia = RSSFeedItemPlayableMedia> extends MediaPlaylist<T> {
    public readonly type: RSSFeedType;

    public readonly url: string;

    public readonly title?: string;

    public readonly description?: string;

    public readonly subtitle?: string;

    public readonly imageUrl?: string;

    public readonly explicit?: boolean;

    public readonly fetchTime?: number;

    public constructor(
        props?:
            | T[]
            | RSSFeedProps<T>
            | RSSFeed<T>
            | MediaPlaylist<T>
            | MediaPlaylistProps<T>
            | Playlist<T>
            | PlaylistProps<T>
    ) {
        // If it has a playlist on it, pass just the playlist to the super
        // and the other props will be set later
        if (props && (props as RSSFeedProps<T>).playlist) {
            super((props as RSSFeedProps<T>).playlist);
        } else {
            super(props);
        }

        this.type = GENERIC_RSS_FEED;
        // Set the prototype explicitly.
        // Recommendation from https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
        Object.setPrototypeOf(this, RSSFeed.prototype);

        // if we had props, set them.
        if (isRSSFeedProps(props)) {
            this.name = props.name;
            this.type = props.type || GENERIC_RSS_FEED;
            this.url = props.url ? props.url : undefined;
            this.title = props.title ? props.title : undefined;
            this.description = props.description ? props.description : undefined;
            this.subtitle = props.subtitle ? props.subtitle : undefined;
            this.imageUrl = props.imageUrl ? props.imageUrl : undefined;
            this.explicit = !!props.explicit;
            this.fetchTime = props.fetchTime ? props.fetchTime : undefined;
        }
    }

    public toJSON(): RSSFeedProps<T> {
        const json: any = {};

        this.forEach((playable, index) => {
            json[index] = playable;
        });

        return {
            ...json,
            type: this.type,
            url: this.url,
            title: this.title,
            description: this.description,
            subtitle: this.subtitle,
            imageUrl: this.imageUrl,
            explicit: this.explicit,
            fetchTime: this.fetchTime
        };
    }
}
