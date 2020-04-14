/*! Copyright (c) 2019, XAPPmedia */
import { InputUnknownRequestType, IntentRequestType, KnowledgeAnswer, RequestSlotMap } from "../Request";

export interface NLUQueryResponse {
    type: IntentRequestType | InputUnknownRequestType;
    intentId: string;
    slots?: RequestSlotMap;
    knowledgeAnswer?: KnowledgeAnswer;
}

/**
 * Service which can turn raw text into an intent and slots (optional).
 */
export interface NLUService {
    query(q: string): Promise<NLUQueryResponse>;
}
