/*! Copyright (c) 2019, XAPPmedia */
import { HTTP_200_OK } from "stentor-constants";
import { Event, Handler, HandlerService } from "stentor-models";
import { existsAndNotEmpty } from "stentor-utils";
import "isomorphic-fetch";
import { OVAIHandlerResponse, OVAIHandlersResponse } from "./Response";

const BASE_URL = "https://api.xapp.media";

function getIntentId(id: string | { intentId: string }): string {
    return typeof id === "string" ? id : id.intentId;
}

export class OVAIService implements HandlerService {
    private readonly baseURL: string = BASE_URL;
    private readonly token: string;
    private readonly appId: string;

    public constructor(props?: { baseURL?: string; token?: string; appId?: string }) {
        // First look for the token & appId on the environment variables
        if (process.env.OVAI_TOKEN) {
            this.token = process.env.OVAI_TOKEN;
        }

        if (process.env.OVAI_APP_ID) {
            this.appId = process.env.OVAI_APP_ID;
        }

        if (props) {
            this.baseURL = props.baseURL ? props.baseURL : this.baseURL;
            this.token = props.token ? props.token : this.token;
            this.appId = props.appId ? props.appId : this.appId;
        }

        if (!this.token) {
            throw new Error(
                "A token must be provided to OVAIService either through the constructor or by setting the environment variable OVAI_TOKEN."
            );
        }

        if (!this.appId) {
            throw new Error(
                "An appId must be provided to the OVAIService either through the constructor or by setting the environment variable OVAI_APP_ID."
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
            .then<OVAIHandlersResponse>(response => response.json())
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

        let status: number;
        let statusText: string;

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            }
        })
            .then<OVAIHandlerResponse>(response => {
                status = response.status;
                statusText = response.statusText;
                return response.json();
            })
            .then<Handler>(json => {
                if (status === 404) {
                    throw new Error(`Handler with intentId "${intentId}" not found. Please verify the intentId exists in your application.`);
                } else if (status === 401 || (json as any).message === "Unauthorized") {
                    throw new Error("Token provided to OVAIService is unauthorized to perform current action.");
                } else if (status !== HTTP_200_OK) {
                    throw new Error(`OVAIService.get() returned ${status} ${statusText} for intentId "${intentId}": ${JSON.stringify(json)}`);
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
                    throw new Error(`OVAIService.putEvents() returned ${status} ${statusText} ${JSON.stringify(json)}`);
                }
                return;
            });
    }
}

