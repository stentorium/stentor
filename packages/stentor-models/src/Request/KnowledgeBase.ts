/*! Copyright (c) 2021, XAPPmedia */

export interface KnowledgeAnswer {
    /**
     * Which knowledge base (optional)
     */
    source?: string;
    /**
     * Raw question
     */
    faqQuestion: string;
    /**
     * Raw answer
     */
    answer: string;
    /**
     * Confidence 0-1
     */
    matchConfidence?: number;
}

/**
 * Description of a highlighted word, which is relevant to
 * the original knowledge base search.
 */
export interface KnowledgeBaseHighlight {
    /**
     * Starting offset within the document
     */
    beginOffset: number;
    /**
     * End location of the highlight within the document
     */
    endOffset: number;
    /**
     * If the highlight is the top suggested answer for the entire search.
     * 
     * A document can contain the answer while the highlight pinpoints it's location 
     * within the document. 
     * 
     * When this is true, it will show up as a suggested answer in the results.
     */
    topAnswer?: boolean;
}

/**
 * A single document, typically part of a larger corpus of information 
 * that is where the answer to the user's original query may reside.
 */
export interface KnowledgeBaseDocument {
    /**
     * The title of the document
     */
    title?: string;
    /**
     * Optional URI that is the source of the document.  It can be a URI for a website or
     * a URI within an internal system (like AWS S3 for example).
     */
    uri?: string;
    /**
     * The document text.  This isn't necessarily the entire source document found at the optional URI,
     * it typically is more focused within where the answer may be.
     */
    document: string;
    /**
     * Notable highlights within the document that can help the user scan and find their answer.
     */
    highlights?: KnowledgeBaseHighlight[];
    /**
     * Additional attribute for the document.  Keys and values are dependent on the underlying knowledgebase.
     */
    attributes?: { [key: string]: any }
}

/**
 * A suggested answer with high confidence.
 */
export interface KnowledgeBaseSuggested extends KnowledgeBaseDocument {
    /**
     * The snippet that is the exact answer the user is looking for within a larger document.
     */
    topAnswer?: string;
    /**
     * Confidence of the match, number between 0-1 where the higher the number has a higher confidence.
     */
    matchConfidence?: number;
}

/**
 * An FAQ
 */
export interface KnowledgeBaseFAQ {
    /**
     * The question
     */
    question: string;
    /**
     * URI, either the source or a location where more information can be found.
     */
    uri?: string;
    /**
     * The answer to the FAQ
     */
    document: string;
    /**
     * Highlights within the FAQ document that are relevant to the user's original search.
     */
    highlights?: KnowledgeBaseHighlight[];
    /**
     * Additional attribute for the document.  Keys and values are dependent on the underlying knowledge base.
     */
    attributes?: { [key: string]: any }
    /**
     * Confidence of the match, number between 0-1 where the higher the number has a higher confidence.
     */
    matchConfidence?: number;
    /**
     * If provided, this references a handler
     */
    handlerId?: string;
}

export interface KnowledgeBaseResult {
    /**
     * A ML powered answer
     */
    suggested?: KnowledgeBaseSuggested[];
    /**
     * List of FAQs that could match the query.
     */
    faqs?: KnowledgeBaseFAQ[];
    /**
     * A list of results based on perceived relevance.  
     */
    documents?: KnowledgeBaseDocument[];
}