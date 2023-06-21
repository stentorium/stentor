/*! Copyright (c) 2019, XAPPmedia */
import { HTTP_200_OK } from "stentor-constants";
import { Event, Handler, HandlerService, KnowledgeBaseGenerated, KnowledgeBaseResult, KnowledgeBaseService } from "stentor-models";
import { existsAndNotEmpty, findFuzzyMatch } from "stentor-utils";
import "isomorphic-fetch";
import { StudioFAQResponse, StudioHandlerResponse, StudioHandlersResponse, StudioRAGResponse } from "./Response";

const BASE_URL = "https://api.xapp.ai";

function getIntentId(id: string | { intentId: string }): string {
    return typeof id === "string" ? id : id.intentId;
}

export interface StudioServiceProps {
    /**
     * Defaults to https://api.xapp.ai, update this if you have a single tenant instance of OC Studio.
     */
    baseURL?: string;
    /**
     * Machine to machine token associated with the appId, used for authentication
     */
    token?: string;
    /**
     * Optional, organization level token that has access to all applications within the organization.
     */
    orgToken?: string;
    /**
     * The appId for the application you are requesting information for.
     */
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

    /**
     * Get the handler by ID.
     * 
     * @param id 
     * @returns 
     */
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

    /**
     * Queries both /cms/search & /cms/faq/query to return KnowledgeBaseResult.
     * 
     * @param query 
     */
    public query(query: string, options?: { controller?: AbortController }): Promise<KnowledgeBaseResult> {

        // Call search
        const search = this.search(query, options);
        const faqs = this.faq(query, options);

        return Promise.all([search, faqs]).then((results) => {

            const result: KnowledgeBaseResult = {
                faqs: [],
                documents: [],
                suggested: []
            };

            const searchResults: Pick<KnowledgeBaseResult, "documents" | "suggested"> = results[0];
            const faqResults: StudioFAQResponse = results[1];

            result.documents = searchResults.documents;
            result.suggested = searchResults.suggested;
            faqResults.faq.forEach((faq) => {

                // Find the closest question
                const questions = findFuzzyMatch(query, faq.questions);
                // Only if we find a decent match, do we return it
                if (existsAndNotEmpty(questions)) {
                    result.faqs.push({
                        uri: faq.url,
                        question: questions[0],
                        document: faq.answer
                    });
                }
            });
            // For FAQs, we do a quick string closeness match
            return result;
        });
    }

    /**
     * Search a knowledge base.
     * 
     * Calls /cms/search endpoint.
     * 
     * @param query - The query to search  
     * @param controller - Optional abort controller to cancel the request
     * @returns 
     */
    public search(query: string, options?: { controller?: AbortController }): Promise<Pick<KnowledgeBaseResult, "documents" | "suggested">> {
        let url = `${this.baseURL}/cms/search`

        const encodedQuery = encodeURIComponent(query);

        url += `?question=${encodedQuery}`;

        let token: string = this.token;

        if (this.orgToken) {
            token = this.orgToken;
            url += `&appId=${this.appId}`;
        }

        const fetchOptions: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (options?.controller) {
            fetchOptions.signal = options?.controller.signal;
        }

        let status: number;
        let statusText: string;

        return fetch(url, fetchOptions)
            .then<KnowledgeBaseResult>((response) => {
                status = response.status;
                statusText = response.statusText;

                return response.json();
            }).then<KnowledgeBaseResult>((results) => {
                if (status === 200) {
                    return results;
                } else {
                    throw new Error(`StudioService.search() returned ${status} ${statusText} ${JSON.stringify(results)}`);
                }
            })
    }
    /**
     * Find a FAQ match based on the query.
     * 
     * The results are already sorted by relevancy.
     * 
     * @param query 
     * @returns 
     */
    public faq(query: string, options?: { controller?: AbortController }): Promise<StudioFAQResponse> {

        let url = `${this.baseURL}/cms/faq/query`

        const encodedQuery = encodeURIComponent(query);

        url += `?question=${encodedQuery}`;

        let token: string = this.token;

        if (this.orgToken) {
            token = this.orgToken;
            url += `&appId=${this.appId}`;
        }

        const fetchOptions: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (options?.controller) {
            fetchOptions.signal = options?.controller.signal;
        }

        let status: number;
        let statusText: string;

        return fetch(url, fetchOptions).then<StudioFAQResponse>((response) => {
            status = response.status;
            statusText = response.statusText;

            return response.json();
        }).then<StudioFAQResponse>((results) => {
            if (status === 200) {
                return results;
            } else {
                throw new Error(`StudioService.faq() returned ${status} ${statusText} ${JSON.stringify(results)}`);
            }
        })
    }

    public rag(query: string, options: { temperature?: number, controller?: AbortController } = { temperature: 0.5 }): Promise<KnowledgeBaseGenerated> {

        const url = new URL(`${this.baseURL}/cms/rag`);

        url.searchParams.set("question", query);
        url.searchParams.set("temperature", `${options.temperature}`);

        let token: string = this.token;

        if (this.orgToken) {
            token = this.orgToken;
            url.searchParams.set("appId", this.appId);
        }

        const fetchOptions: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (options?.controller) {
            fetchOptions.signal = options?.controller.signal;
        }

        let status: number;
        let statusText: string;

        return fetch(url, fetchOptions).then<StudioRAGResponse>((response) => {
            status = response.status;
            statusText = response.statusText;

            return response.json();
        }).then<KnowledgeBaseGenerated>((results) => {
            if (status === 200) {

                const result = results.result;
                const hasAnswer = results.hasAnswer;
                const sources = results.sources;

                return {
                    generated: result,
                    document: result,
                    hasAnswer,
                    sources,
                    type: "retrieval-augmented-generation"
                };
            } else {
                throw new Error(`StudioService.rag() returned ${status} ${statusText} ${JSON.stringify(results)}`);
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
        }).then(response => {
            status = response.status;
            statusText = response.statusText;
            return response.json();
        }).then(json => {
            if (status !== HTTP_200_OK) {
                throw new Error(`StudioService.putEvents() returned ${status} ${statusText} ${JSON.stringify(json)}`);
            }
            return;
        });
    }
}

