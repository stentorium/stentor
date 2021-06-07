/*! Copyright (c) 2021, XAPPmedia */
import { KnowledgeBaseResult } from "../Request";

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
    query(query: string): KnowledgeBaseResult;
}