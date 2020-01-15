/*! Copyright (c) 2019, XAPPmedia */
import { AbstractBuilder } from "@xapp/patterns";
import { Context, Device, Pii, Storage, UserData } from "stentor-models";
import { ResponseBuilder } from "stentor-response";
import { createSessionStore } from "@xapp/stentor-storage";

export class ContextBuilder<S extends Storage = Storage> extends AbstractBuilder<Context<S>> {
    private context: Context<S>;

    constructor() {
        super();

        const device: Device = {
            channel: "test",
            audioSupported: true,
            canPlayAudio: true,
            videoSupported: true,
            canPlayVideo: true,
            canSpeak: true,
            canThrowCard: true,
            hasScreen: false,
            canTransferCall: false
        };

        const storage: S = {
            createdTimestamp: Date.now(),
            sessionStore: {
                data: {},
                id: "foo"
            }
        } as S;

        const pii: Pii = {
            token: "foo",
            emailAddress: "joe@email.com",
            emailAddressStatus: "OPTIN",
            phoneNumber: "703-555-5555",
            phoneNumberStatus: "OPTIN"
        };

        this.context = {
            device,
            storage,
            response: new ResponseBuilder({ device }),
            session: createSessionStore(storage),
            pii
        };
    }

    withDevice(device: Device): ContextBuilder<S> {
        this.context.device = device;
        return this;
    }

    withResponse(response: ResponseBuilder): ContextBuilder<S> {
        this.context.response = response;
        return this;
    }

    withRequestUserData(userData: UserData): ContextBuilder<S> {
        this.context.requestUserData = userData;
        return this;
    }

    withStorage(storage: S): ContextBuilder<S> {
        this.context.storage = {
            ...this.context.storage,
            ...storage
        };

        // Make sure we have a sessionStore
        if (!this.context.storage.sessionStore) {
            this.context.storage.sessionStore = {
                id: "foo", // This doesn't matter, well as long as the sessionId isn't ever foo
                data: {}
            };
        }

        this.context.session = createSessionStore(this.context.storage);
        return this;
    }

    playingAudio(): ContextBuilder<S> {
        this.context.audioPlayer = {
            status: "PLAYING",
            token: "TOKEN"
        };
        return this;
    }

    build(): Context<S> {
        return this.context;
    }
}
