/*! Copyright (c) 2019, XAPPmedia */
import { Handler } from "stentor-models";

export interface StudioHandlersResponse {
    handlers: Handler[];
}

export interface StudioHandlerResponse {
    handler: Handler;
}


export interface StudioQueryResultHighlight {
    start: number;
    end: number;
    top?: boolean;
    type: "STANDARD"
}

export interface StudioQueryResult {
    title: {
        text: string;
        highlight: StudioQueryResultHighlight[]
    };
    excerpt: {
        text: string;
        highlight: StudioQueryResultHighlight[]
    };
    type: "DOCUMENT" | "ANSWER" | "QUESTION_ANSWER";
    confidence: "VERY_HIGH" | "HIGH" | "MEDIUM" | "LOW"
}

export interface StudioQueryResponse {
    total: number;
    results: StudioQueryResult[];
}
