/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { Podcast, PodcastProps } from "../Podcast";

const podcastProps: PodcastProps = {
    type: "Podcast",
    url: "https://some.podcast.url",
    title: "title",
    description: "description",
    explicit: false,
    subtitle: "subtitle",
    imageUrl: "https://some.image",
    playlist: [
        {
            type: "PodcastEpisode",
            feedTitle: "title",
            title: "item title",
            description: "item description",
            explicit: false,
            token: "token",
            url: "https://another.url"
        }
    ]
};

describe("Podcast", () => {
    describe("constructor", () => {
        let podcast: Podcast;
        describe("with all properties", () => {
            beforeEach(() => {
                podcast = new Podcast({ ...podcastProps });
            });
            it("sets the url", () => {
                expect(podcast.url).to.equal("https://some.podcast.url");
            });
            it("sets the title", () => {
                expect(podcast.title).to.equal("title");
            });
            it("sets the description", () => {
                expect(podcast.description).to.equal("description");
            });
            it("sets explicity", () => {
                expect(podcast.explicit).to.be.false;
            });
            it("sets the subtitle", () => {
                expect(podcast.subtitle).to.equal("subtitle");
            });
            it("sets the imageUrl", () => {
                expect(podcast.imageUrl).to.equal("https://some.image");
            });
            it("sets the playlist data", () => {
                expect(podcast).to.have.length(1);
            });
        });
        describe("with empty imageUrl", () => {
            beforeEach(() => {
                podcast = new Podcast({
                    type: "Podcast",
                    url: "https://some.podcast.url",
                    title: "title",
                    description: "description",
                    explicit: false,
                    imageUrl: ""
                });
            });
            it("sets the image URL to be undefined", () => {
                expect(podcast.imageUrl).to.be.undefined;
            });
        });
    });
    describe("JSON.parse()", () => {
        let json: any;
        beforeEach(() => {
            const podcast = new Podcast({ ...podcastProps });
            const jsonString = JSON.stringify(podcast);
            json = JSON.parse(jsonString);
        });
        it("sets the url", () => {
            expect(json.url).to.equal("https://some.podcast.url");
        });
        it("sets the title", () => {
            expect(json.title).to.equal("title");
        });
        it("sets the description", () => {
            expect(json.description).to.equal("description");
        });
        it("sets the subtitle", () => {
            expect(json.subtitle).to.equal("subtitle");
        });
        it("sets the imageUrl", () => {
            expect(json.imageUrl).to.equal("https://some.image");
        });
        it("sets explicit", () => {
            expect(json.explicit).to.be.false;
        });
        it("sets the playlist item", () => {
            expect(json[0]).to.exist;
        });
        it("can be converted back to a Podcast", () => {
            const newPodcast = new Podcast(json);
            expect(newPodcast).to.have.length(1);
            expect(newPodcast.type).to.equal("Podcast");
            expect(newPodcast.title).to.equal("title");
            const firstEpisode = newPodcast[0];
            expect(firstEpisode.type).to.equal("PodcastEpisode");
            expect(firstEpisode.feedTitle).to.equal("title");
            expect(firstEpisode.token).to.equal("token");
            expect(firstEpisode.url).to.equal("https://another.url");
        });
    });
});
