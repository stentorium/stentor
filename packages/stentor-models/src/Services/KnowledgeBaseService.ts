/*! Copyright (c) 2021, XAPPmedia */
import { KnowledgeBaseFAQResult, KnowledgeBaseGenerated, KnowledgeBaseResult } from "../Request";

/**
 * Filters for searching.
 * 
 * In order to leverage these, you must add them to the document when it is indexed.
 */
export type KnowledgeBaseServiceFilters = "locationId" | string;

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
    query(query: string, options?: { controller?: AbortController, filters?: { [key: KnowledgeBaseServiceFilters]: string } }): Promise<KnowledgeBaseResult>;
    /**
     * Search for matching FAQs
     * 
     * @param query 
     * @param options 
     */
    faq?(query: string, options?: { controller?: AbortController }): Promise<KnowledgeBaseFAQResult>;
    /**
     * Retrieval Augmented Generation Response
     * 
     * @beta
     * @param query 
     */
    rag?(query: string, options?: { controller?: AbortController, temperature?: number, filters?: { [key: KnowledgeBaseServiceFilters]: string } }): Promise<KnowledgeBaseGenerated>;
}
