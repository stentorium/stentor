/*! Copyright (c) 2021, XAPPmedia */
import { KnowledgeBaseGenerated, KnowledgeBaseResult } from "../Request";

/**
 * A knowledge base that can be queried
 */
export interface KnowledgeBaseService {
    /**
     * Query the knowledge base
     * 
     * @param query - Query to search within the knowledge base, typically a user's question.
     * @return Knowledge Base result with either FAQs, suggested, or documents.   
     */
    query(query: string, options?: { controller?: AbortController }): Promise<KnowledgeBaseResult>;
    /**
     * Retrieval Augmented Generation Response
     * 
     * @beta
     * @param query 
     */
    rag?(query: string, options?: { controller?: AbortController, temperature?: number }): Promise<KnowledgeBaseGenerated>;
}
