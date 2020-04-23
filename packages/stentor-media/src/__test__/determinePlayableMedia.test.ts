/*! Copyright (c) 2019, XAPPmedia */
import { AudioLiveStream, Schedule, Scheduled, VideoLiveStream } from "stentor-models";
import { expect } from "chai";
import { AUDIO_LIVE_STREAM, VIDEO_LIVE_STREAM } from "../Constants";
import { determineMediaSource } from "../determineMediaSource";
import { Multimedia, PlaybackCapabilities } from "../Multimedia";

const capable: PlaybackCapabilities = {
    canPlayAudio: true,
    canPlayVideo: true
};

/* const audioOnly: PlaybackCapabilities = {
    canPlayAudio: true,
    canPlayVideo: false
}; */

const video: VideoLiveStream = {
    type: VIDEO_LIVE_STREAM,
    length: -1,
    url: "https://url.video",
    token: "token"
};

const video1: VideoLiveStream = {
    type: VIDEO_LIVE_STREAM,
    length: -1,
    url: "https://url.video1",
    token: "token1"
};

const video2: VideoLiveStream = {
    type: VIDEO_LIVE_STREAM,
    length: -1,
    url: "https://url.video2",
    token: "token2"
};

const audio: AudioLiveStream = {
    type: AUDIO_LIVE_STREAM,
    length: -1,
    url: "https://url.audio",
    token: "token"
};

const audio1: AudioLiveStream = {
    type: AUDIO_LIVE_STREAM,
    length: -1,
    url: "https://url.audio1",
    token: "token1"
};

const audio2: AudioLiveStream = {
    type: AUDIO_LIVE_STREAM,
    length: -1,
    url: "https://url.audio2",
    token: "token2"
};

describe("#determinePlayableMedia()", () => {
    let now: Date;
    let schedule: Schedule;

    let emptyMultimedia: Multimedia;
    let scheduledMultimedia: Scheduled<Multimedia>;
    let unscheduledMultimedia: Multimedia;
    let multimedia: Multimedia;

    beforeEach(() => {
        emptyMultimedia = {
            audio: [],
            video: []
        };

        now = new Date();
        schedule = {
            start: {
                time: now.toISOString()
            },
            duration: {
                amount: 5,
                format: "s"
            }
        };

        scheduledMultimedia = {
            audio: [audio],
            video: [video],
            schedule
        };

        unscheduledMultimedia = {
            audio: [audio1],
            video: [video1]
        };

        multimedia = {
            audio: [audio2],
            video: [video2]
        };
    });

    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(determineMediaSource(undefined, capable)).to.be.undefined;
        });
    });
    describe("when passed multimedia without media", () => {
        it("returns undefined", () => {
            expect(determineMediaSource([emptyMultimedia], capable)).to.be.undefined;
        });
    });
    describe("when passed multiple without schedules", () => {
        it("picks the first one", () => {
            expect(determineMediaSource([unscheduledMultimedia, multimedia], capable)).to.equal(video1);
        });
    });
    describe("when passed multimedia with an active schedule", () => {
        it("selects the one with the schedule", () => {
            expect(determineMediaSource([scheduledMultimedia, unscheduledMultimedia], capable)).to.equal(video);
        });
    });
    describe("for audio only devices", () => {
        it("selects the audio", () => {
            expect(determineMediaSource([multimedia], { ...capable, canPlayVideo: false })).to.equal(audio2);
        });
    });
});
