/*! Copyright (c) 2019, XAPPmedia */
import { RSSFeedItemPlayableMedia } from "stentor-models";
import { expect } from "chai";
import { GENERIC_RSS_FEED } from "../Constants";
import { MediaPlaylist, MediaPlaylistProps } from "../MediaPlaylist";
import { RSSFeed, RSSFeedProps } from "../RSSFeed";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rssFeed = require("./assets/playlist");

const item0: RSSFeedItemPlayableMedia = {
    type: "Audio",
    feedTitle: "feedTitle",
    title: "title0",
    url: "url0"
};

const item1: RSSFeedItemPlayableMedia = {
    type: "Audio",
    feedTitle: "feedTitle",
    title: "title1",
    url: "url1"
};

describe("RSSFeed", () => {
    let feed: RSSFeed;
    describe("constructor", () => {
        describe("with a plain array", () => {
            beforeEach(() => {
                feed = new RSSFeed([item0, item1]);
            });
            it("returns an RSSFeed instance", () => {
                expect(feed).instanceof(RSSFeed);
            });
            it("sets the type", () => {
                expect(feed.type).to.equal("RSSFeed");
            });
            it("sets the first item", () => {
                expect(feed[0]).to.deep.equal(item0);
            });
            it("sets the second item", () => {
                expect(feed[1]).to.deep.equal(item1);
            });
        });
        describe("with a MediaPlaylist", () => {
            beforeEach(() => {
                const props: MediaPlaylist<RSSFeedItemPlayableMedia> = new MediaPlaylist<RSSFeedItemPlayableMedia>([
                    item0,
                    item1
                ]);
                feed = new RSSFeed(props);
            });
            it("returns an RSSFeed instance", () => {
                expect(feed).instanceof(RSSFeed);
            });
            it("sets the type", () => {
                expect(feed.type).to.equal("RSSFeed");
            });
            it("sets the first item", () => {
                expect(feed[0]).to.deep.equal(item0);
            });
            it("sets the second item", () => {
                expect(feed[1]).to.deep.equal(item1);
            });
        });
        describe("with MediaPlaylistProps", () => {
            beforeEach(() => {
                const props: MediaPlaylistProps<RSSFeedItemPlayableMedia> = {
                    [0]: item0,
                    [1]: item1
                };
                feed = new RSSFeed(props);
            });
            it("returns an RSSFeed instance", () => {
                expect(feed).instanceof(RSSFeed);
            });
            it("sets the type", () => {
                expect(feed.type).to.equal("RSSFeed");
            });
            it("sets the first item", () => {
                expect(feed[0]).to.deep.equal(item0);
            });
            it("sets the second item", () => {
                expect(feed[1]).to.deep.equal(item1);
            });
        });
        describe("with a RSSFeed", () => {
            beforeEach(() => {
                const props = new RSSFeed([item0, item1]);
                feed = new RSSFeed(props);
            });
            it("returns an RSSFeed instance", () => {
                expect(feed).instanceof(RSSFeed);
            });
            it("sets the type", () => {
                expect(feed.type).to.equal("RSSFeed");
            });
            it("sets the first item", () => {
                expect(feed[0]).to.deep.equal(item0);
            });
            it("sets the second item", () => {
                expect(feed[1]).to.deep.equal(item1);
            });
        });
        describe("with RSSFeedProps", () => {
            describe("with indexes", () => {
                beforeEach(() => {
                    const props: RSSFeedProps = {
                        type: "RSSFeed",
                        url: "url",
                        [0]: item0,
                        [1]: item1
                    };
                    feed = new RSSFeed(props);
                });
                it("returns an RSSFeed instance", () => {
                    expect(feed).instanceof(RSSFeed);
                });
                it("sets the type", () => {
                    expect(feed.type).to.equal("RSSFeed");
                });
                it("sets the url", () => {
                    expect(feed.url).to.equal("url");
                });
                it("sets the first item", () => {
                    expect(feed[0]).to.deep.equal(item0);
                });
                it("sets the second item", () => {
                    expect(feed[1]).to.deep.equal(item1);
                });
            });
            describe("with playlist", () => {
                beforeEach(() => {
                    const props: RSSFeedProps = {
                        type: "RSSFeed",
                        url: "url",
                        playlist: [item0, item1]
                    };
                    feed = new RSSFeed(props);
                });
                it("returns an RSSFeed instance", () => {
                    expect(feed).instanceof(RSSFeed);
                });
                it("sets the type", () => {
                    expect(feed.type).to.equal("RSSFeed");
                });
                it("sets the url", () => {
                    expect(feed.url).to.equal("url");
                });
                it("sets the first item", () => {
                    expect(feed[0]).to.deep.equal(item0);
                });
                it("sets the second item", () => {
                    expect(feed[1]).to.deep.equal(item1);
                });
            });
        });
        describe("with just type and url", () => {
            beforeEach(() => {
                const props = new RSSFeed({ type: "RSSFeed", url: "https://my.rss.feed" });
                feed = new RSSFeed(props);
            });
            it("returns an RSSFeed instance", () => {
                expect(feed).instanceof(RSSFeed);
            });
            it("sets the type", () => {
                expect(feed.type).to.equal("RSSFeed");
            });
            it("doesn't set any items on the playlist", () => {
                expect(feed).to.length(0);
            });
        });
        describe("with JSON", () => {
            // This test simulates real data
            beforeEach(() => {
                feed = new RSSFeed(rssFeed);
            });
            it("sets the type", () => {
                expect(feed.type).to.equal(GENERIC_RSS_FEED);
            });
            it("sets the length", () => {
                const FEED_LENGTH = 15;
                expect(feed).to.have.length(FEED_LENGTH);
            });
            it("sets items in the list", () => {
                const firstItem = feed[0];
                expect(firstItem).to.exist;
                expect(firstItem.description).to.contain("Melissa and Matthew");
                expect(firstItem.type).to.equal("PodcastEpisode");
                const lastItem = feed[feed.length - 1];
                expect(lastItem).to.exist;
                expect(lastItem.description).to.contain("Ahmed Bouzid");
            });
        });
    });
});
