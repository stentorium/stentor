/*! Copyright (c) 2022, XAPPmedia */

import { KnowledgeBaseService } from "../Services";

export interface KnowledgeBaseConfig {
    /**
     * Either the intentId or regex to determine which requests to call the KnowledgeBaseService.  If not provided it defaults to "^.*$", which is a regex
     * that will match on all requests.
     */
    matchIntentId?: string;
    /**
     * If provided, it will override the intentId on the original request if the knowledgebase results are preferred.
     * 
     * It will also update the request type to be that of an Intent Request.
     */
    setIntentId?: string;
    /**
     * If set to true then when knowledge base results already exist, they will be merged instead of the default behavior of
     * being overwritten.
     *  
     * @beta - This field and behavior of the field is subject to change.
     */
    mergeResults?: boolean;
    // For future consideration
    // If set, it will be used to establish a minimum threshold that must be passed in order to use the knowledge base results.
    // If below the threshold, then the existing intent will be used and not augmented.
    // confidenceThreshold?: number;
}

export interface KnowledgeBaseDependency extends KnowledgeBaseConfig {
    service: KnowledgeBaseService;
}