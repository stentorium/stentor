/*! Copyright (c) 2019, XAPPmedia */
import { InputUnknownRequestType, IntentRequestType, KnowledgeAnswer, RequestSlotMap, SentimentedRequest } from "../Request";
import { ActiveContext } from "../Response";

export interface NLUQueryResponse extends SentimentedRequest {
    type: IntentRequestType | InputUnknownRequestType;
    /**
     * ID for the matched intent.
     */
    intentId: string;
    /**
     * Optional slots for the matched intent.
     */
    slots?: RequestSlotMap;
    /**
     * Confidence level of the intent match.  On a scale from 0-1 where 1 is the highest confidence of a match.
     */
    matchConfidence?: number;
    /**
     * Some NLUs will also return knowledgebase results.
     */
    knowledgeAnswer?: KnowledgeAnswer;
}

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
     * Optional active context to pass with the request, used to weight 
     * certain intents.
     */
    activeContext?: ActiveContext[];
    /**
     * Optional request attributes.
     */
    requestAttributes?: Record<string, string>;
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
