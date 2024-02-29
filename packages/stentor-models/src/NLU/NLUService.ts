/*! Copyright (c) 2019, XAPPmedia */
import { IntentRequest, InputUnknownRequest } from "../Request";
import { ActiveContext } from "../Response";
import { KnowledgeBaseServiceFilters } from "../Services";

/**
 * Slightly smaller intent request without the sessionId and other identifying information.  It also doesn't pass through the original raw query.
 */
export type NLUIntentRequest = Pick<IntentRequest, "type" | "intentId" | "slots" | "matchConfidence" | "knowledgeAnswer" | "knowledgeBaseResult" | "sentimentAnalysis">

/**
 * Slightly smaller input unknown request without a sessionId and other identifying information.  It also doesn't pass through the original raw query.
 */
export type NLUInputUnknownRequest = Pick<InputUnknownRequest, "type" | "intentId" | "knowledgeBaseResult" | "sentimentAnalysis">;

/**
 * Response from the NLU
 */
export type NLUQueryResponse = NLUIntentRequest | NLUInputUnknownRequest;

export interface NLURequestProps {
    /**
     * Optional locale to request, defaults to "en"
     */
    locale?: string;
    /**
     * Optional userId to pass with the request
     */
    userId?: string;
    /**
     * Optional sessionId to pass with the request
     */
    sessionId?: string;
    /**
     * Optional channel information
     */
    channel?: string;
    /**
     * Optional platform information.
     */
    platform?: string;
    /**
     * Optional active context to pass with the request, used to weight 
     * certain intents.
     */
    activeContext?: ActiveContext[];
    /**
     * Optional request attributes.
     */
    requestAttributes?: Record<string, string>;
    /**
     * Optional filters for knowledge base service calls
     */
    filters?: { [key: KnowledgeBaseServiceFilters]: string };
}

/**
 * Service which can turn raw text into an intent and slots (optional).
 */
export interface NLUService {
    /**
     * Query the NLU with the user's natural language input.  A resolved intent will be returned from the NLU
     * 
     * @param q Natural language query from the user
     * @param props 
     */
    query(q: string, props?: NLURequestProps): Promise<NLUQueryResponse>;
    /**
     * Used to set context that will be used for the next query of the NLU.
     * 
     * This is used to set active contexts for example, which help prefer certain intents on the next query call.
     * 
     * @param props 
     */
    setContext?(props: NLURequestProps): Promise<void>;
}
