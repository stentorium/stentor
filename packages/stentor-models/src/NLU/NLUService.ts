/*! Copyright (c) 2019, XAPPmedia */
import { InputUnknownRequestType, IntentRequestType, KnowledgeAnswer, RequestSlotMap } from "../Request";
import { ActiveContext } from "../Response";

export interface NLUQueryResponse {
    type: IntentRequestType | InputUnknownRequestType;
    intentId: string;
    slots?: RequestSlotMap;
    knowledgeAnswer?: KnowledgeAnswer;
}

export interface NLURequestProps {
    userId?: string;
    sessionId?: string;
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
