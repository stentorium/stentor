/*! Copyright (c) 2019, XAPPmedia */
import { Handler } from "stentor-models";

export interface StudioHandlersResponse {
    handlers: Handler[];
}

export interface StudioHandlerResponse {
    handler: Handler;
}

export interface StudioFAQ {
    /**
     * When the FAQ was created, ISO-8601 formatted string.
     */
    created: string;
    /**
     * List of questions that match to the FAQ.
     */
    questions: string[];
    /**
     * Name of the FAQ
     */
    name: string;
    /**
     * Answer, content, for the FAQ
     */
    answer: string;
    /**
     * Optional URL for the FAQ for external reference.
     */
    url?: string;
    /**
     * 
     */
    _score?: number;
}


export interface StudioFAQResponse {
    total: number;
    faq: StudioFAQ[];
}

export interface StudioRAGResponse {
    result: string;
    hasAnswer?: boolean;
    sources?: { url: string, title?: string }[];
}
