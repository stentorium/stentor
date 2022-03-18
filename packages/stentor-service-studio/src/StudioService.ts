/*! Copyright (c) 2019, XAPPmedia */
import { HTTP_200_OK } from "stentor-constants";
import { Event, Handler, HandlerService, KnowledgeBaseResult, KnowledgeBaseService } from "stentor-models";
import { existsAndNotEmpty } from "stentor-utils";
import "isomorphic-fetch";
import { StudioHandlerResponse, StudioHandlersResponse } from "./Response";

const BASE_URL = "https://api.xapp.ai";

function getIntentId(id: string | { intentId: string }): string {
    return typeof id === "string" ? id : id.intentId;
}

export interface StudioServiceProps {
    baseURL?: string;
    token?: string;
    /**
     * 
     */
    orgToken?: string;
    appId?: string;
}

export class StudioService implements HandlerService, KnowledgeBaseService {
    private readonly baseURL: string = BASE_URL;
    private readonly token: string;
    private readonly orgToken?: string;
    private readonly appId: string;

    public constructor(props?: StudioServiceProps) {
        // First look for the token & appId on the environment variables
        if (process.env.STUDIO_TOKEN) {
            this.token = process.env.STUDIO_TOKEN;
        }

        if (process.env.STUDIO_ORG_TOKEN) {
            this.orgToken = process.env.STUDIO_ORG_TOKEN;
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
            this.orgToken = props.orgToken ? props.orgToken : this.orgToken;
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

        let url = `${this.baseURL}/cms/handler/${intentId}`;

        let token: string = this.token;

        if (this.orgToken) {
            token = this.orgToken;
            url += `?appId=${this.appId}`;
        }

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then<StudioHandlerResponse>(response => response.json())
            .then<Handler>(json => {
                // TODO: Check status code to better handle error codes
                if ((json as any).message === "Unauthorized") {
                    throw new Error("Token provided to StudioService is unauthorized to perform current action.");
                } else if (typeof json.handler === "object") {
                    return json.handler;
                }

                return undefined;
            });
    }

    public query(query: string): Promise<KnowledgeBaseResult> {

        let url = `${this.baseURL}/cms/search`

        const encodedQuery = encodeURIComponent(query);

        url += `?question=${encodedQuery}`;


        let token: string = this.token;

        if (this.orgToken) {
            token = this.orgToken;
            url += `&appId=${this.appId}`;
        }

        let status: number;
        let statusText: string;

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then<KnowledgeBaseResult>((response) => {
                status = response.status;
                statusText = response.statusText;

                return response.json();
            }).then<KnowledgeBaseResult>((results) => {
                if (status === 200) {
                    return results;
                } else {
                    throw new Error(`StudioService.query() returned ${status} ${statusText} ${JSON.stringify(results)}`);
                }
            })
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

        let url = `${this.baseURL}/cms/app/events`;

        let token: string = this.token;

        if (this.orgToken) {
            token = this.orgToken;
            url += `?appId=${this.appId}`;
        }

        let status: number;
        let statusText: string;

        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
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

