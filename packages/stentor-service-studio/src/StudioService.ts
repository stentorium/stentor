/*! Copyright (c) 2019, XAPPmedia */
import { HTTP_200_OK } from "stentor-constants";
import { Event, Handler, HandlerService } from "stentor-models";
import { existsAndNotEmpty } from "stentor-utils";
import "isomorphic-fetch";
import { StudioHandlerResponse, StudioHandlersResponse } from "./Response";

const BASE_URL = "https://api.xapp.ai";

function getIntentId(id: string | { intentId: string }): string {
    return typeof id === "string" ? id : id.intentId;
}

export class StudioService implements HandlerService {
    private readonly baseURL: string = BASE_URL;
    private readonly token: string;
    private readonly appId: string;

    public constructor(props?: { baseURL?: string; token?: string; appId?: string }) {
        // First look for the token & appId on the environment variables
        if (process.env.STUDIO_TOKEN) {
            this.token = process.env.STUDIO_TOKEN;
        }

        if (process.env.STUDIO_APP_ID) {
            this.appId = process.env.STUDIO_APP_ID;
        }

        if (process.env.STUDIO_BASE_URL) {
            this.baseURL = process.env.STUDIO_BASE_URL;
        }

        if (props) {
            this.baseURL = props.baseURL ? props.baseURL : this.baseURL;
            this.token = props.token ? props.token : this.token;
            this.appId = props.appId ? props.appId : this.appId;
        }

        if (!this.token) {
            throw new Error(
                "A token must be provided to StudioService either through the constructor or by setting the environment variable STUDIO_TOKEN."
            );
        }

        if (!this.appId) {
            throw new Error(
                "An appId must be provided to the StudioService either through the constructor or by setting the environment variable STUDIO_APP_ID."
            );
        }
    }

    public getAll(): Promise<Handler[]> {
        const url = `${this.baseURL}/cms/handler`;

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            }
        })
            .then<StudioHandlersResponse>(response => response.json())
            .then<Handler[]>(json => {
                if (existsAndNotEmpty(json.handlers)) {
                    return json.handlers;
                }
                return [];
            });
    }

    public get(id: string | { intentId: string }): Promise<Handler> | Promise<undefined> {
        const intentId = getIntentId(id);

        const url = `${this.baseURL}/cms/handler/${intentId}`;

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            }
        })
            .then<StudioHandlerResponse>(response => response.json())
            .then<Handler>(json => {
                // TODO: Check status code to better handle error codes
                if ((json as any).message === "Unauthorized") {
                    throw new Error("Token provided to OVAIService is unauthorized to perform current action.");
                } else if (typeof json.handler === "object") {
                    return json.handler;
                }

                return undefined;
            });
    }

    public putEvents(events: Event<any>[]): Promise<void> {
        if (!existsAndNotEmpty(events)) {
            return;
        }

        // Make sure we have the APP ID!
        events.forEach(event => {
            // If no appID, add it.
            if (!event.appId) {
                event.appId = this.appId;
            }
        });

        // Validate!
        events.forEach((event) => {
            // We require appId, platform, channel, type
            if (!event.appId) {
                throw new Error(`appId is required to send an event to the Studio Event Stream.`);
            }

            if (!event.platform) {
                throw new Error(`platform is required to send an event to the Studio Event Stream.`);
            }

            if (!event.channel) {
                throw new Error(`channel is required to send an event to the Studio Event Stream.`);
            }

            if (!event.type) {
                throw new Error(`type is required to send an event to the Studio Event Stream.`);
            }
        });

        const url = `${this.baseURL}/cms/app/events`;

        let status: number;
        let statusText: string;

        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({ events })
        })
            .then(response => {
                status = response.status;
                statusText = response.statusText;
                return response.json();
            })
            .then(json => {
                if (status !== HTTP_200_OK) {
                    throw new Error(`StudioService.putEvents() returned ${status} ${statusText} ${JSON.stringify(json)}`);
                }
                return;
            });
    }
}

