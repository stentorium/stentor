/*! Copyright (c) 2019, XAPPmedia */
import { Audio, AudioLiveStream, PodcastEpisode, Song, Video } from "stentor-models";
import { expect } from "chai";
import {
    AUDIO_LIVE_STREAM,
    GENERIC_AUDIO,
    isAudio,
    isPodcastEpisode,
    isVideo,
    PODCAST_EPISODE,
    SONG,
    VIDEO
} from "../index";

const audio: Audio = {
    type: GENERIC_AUDIO,
    url: "url",
    token: "token"
};

const livestream: AudioLiveStream = {
    type: AUDIO_LIVE_STREAM,
    url: "url",
    token: "token",
    length: -1
};

const podcastEpisode: PodcastEpisode = {
    type: PODCAST_EPISODE,
    url: "url",
    token: "token",
    feedTitle: "podcastTitle"
};

const song: Song = {
    type: SONG,
    url: "url",
    token: "token",
    title: "title"
};

const video: Video = {
    type: VIDEO,
    url: "url",
    token: "token"
};

describe("Guards", () => {
    describe("#isPodcastEpisode()", () => {
        it("returns false when undefined", () => {
            expect(isPodcastEpisode(undefined)).to.be.false;
        });
        it("returns false when passed a video", () => {
            expect(isPodcastEpisode(video)).to.be.false;
        });
        it("returns true when passed a podcast episode", () => {
            expect(isPodcastEpisode(podcastEpisode)).to.be.true;
        });
    });
    describe("#isAudio()", () => {
        it("returns false when passed undefined", () => {
            expect(isAudio(undefined)).to.be.false;
        });
        it("returns false when passed a video", () => {
            expect(isAudio(video)).to.be.false;
        });
        it("returns true when passed audio", () => {
            expect(isAudio(audio)).to.be.true;
        });
        it("returns true when passed a song", () => {
            expect(isAudio(song)).to.be.true;
        });
        it("returns true when passed a podcast episode", () => {
            expect(isAudio(podcastEpisode)).to.be.true;
        });
        it("returns true when passed a livestream", () => {
            expect(isAudio(livestream)).to.be.true;
        });
    });
    describe("#isVideo()", () => {
        it("returns false when passed undefined", () => {
            expect(isVideo(undefined)).to.be.false;
        });
        it("returns true when passed a video", () => {
            expect(isVideo(video)).to.be.true;
        });
        it("returns true when passed audio", () => {
            expect(isVideo(audio)).to.be.false;
        });
        it("returns false when passed a livestream", () => {
            expect(isVideo(livestream)).to.be.false;
        });
    });
});
