/*! Copyright (c) 2019, XAPPmedia */
import { InputUnknownRequestType, IntentRequestType, KnowledgeAnswer, RequestSlotMap } from "../Request";
import { ActiveContext } from "../Response";

export interface NLUQueryResponse {
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
    requestAttributes?: { [key: string]: string };
}

/**
 * Service which can turn raw text into an intent and slots (optional).
 */
export interface NLUService {
    query(q: string, props?: NLURequestProps): Promise<NLUQueryResponse>;
    setContext?(props: NLURequestProps): Promise<void>;
}
