/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { AudioPlayerRequest } from "stentor-models";
import { AudioPlayerRequestBuilder } from "../Builders";
import { AUDIO_PLAYER_PLAYBACK_FINISHED_EVENT, AUDIO_PLAYER_PLAYBACK_STARTED_EVENT } from "../Constants";

describe("AudioPlayerRequestBuilder", () => {
    describe("build", () => {
        describe("without any parameters set", () => {
            it("returns the default value for event", () => {
                const request = new AudioPlayerRequestBuilder().build();
                expect(request.event).to.equal(AUDIO_PLAYER_PLAYBACK_STARTED_EVENT);
            });
            it("returns the default value for offset", () => {
                const request = new AudioPlayerRequestBuilder().build();
                expect(request.offsetInMilliseconds).to.equal(0);
            });
            it("returns the default token", () => {
                const request = new AudioPlayerRequestBuilder().build();
                expect(request.token).to.equal("token");
            });
        });
        describe("with all parameters set", () => {
            let request: AudioPlayerRequest;
            const oneSecond = 1000;
            const token = "newToken";
            beforeEach(() => {
                const builder = new AudioPlayerRequestBuilder();
                builder.withOffset(oneSecond);
                builder.withToken(token);
                builder.withEvent(AUDIO_PLAYER_PLAYBACK_FINISHED_EVENT);
                request = builder.build();
            });
            it("returns the set offset", () => {
                expect(request.offsetInMilliseconds).to.equal(oneSecond);
            });
            it("returns the set token", () => {
                expect(request.token).to.equal(token);
            });
            it("returns the set event", () => {
                expect(request.event).to.equal(AUDIO_PLAYER_PLAYBACK_FINISHED_EVENT);
            });
        });
    });
});
