/*! Copyright (c) 2019, XAPPmedia */
import { KnowledgeBaseResult } from "./KnowledgeBase";
import { BaseRequest, SentimentedRequest } from "./Request";
import { InputUnknownID, InputUnknownRequestType } from "./Types";
/**
 * Request when a user requests something not in the interaction model.
 */
export interface InputUnknownRequest extends BaseRequest, SentimentedRequest {
    type: InputUnknownRequestType;
    /**
     * Input Unknowns have a constant intentId.
     */
    intentId: InputUnknownID;
    /**
     * The session ID.
     */
    sessionId: string;
    /**
     * Results returned from a knowledge base such as AWS Kendra.
     * 
     * @beta
     */
    knowledgeBaseResult?: KnowledgeBaseResult;
}
