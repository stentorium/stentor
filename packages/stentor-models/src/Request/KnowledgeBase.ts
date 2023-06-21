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

export interface KnowledgeBaseGenerated extends KnowledgeBaseDocument {
    /**
     * The generated text from the LLM
     */
    generated: string;
    /**
     * Optional, the source LLM of the generated answer.
     */
    llm?: string;
    /**
     * A description of the type of generated response.
     * 
     * This can be used to better describe the prompt used for generation so it can be understood what type of
     * information is in the generated response.
     * 
     * Two standard values are "retrieval-augmented-generation" and "general-knowledge"
     */
    type?: string;
    /**
     * Generated AI will still return an response even if it didn't have an answer.  True if it has the answer to the user's query.
     */
    hasAnswer?: boolean;
    /**
     * Optional sources that the Generative AI used to generate the response.  This is typically specific to type "retrieval-augmented-generation" where source material is used to generate the answer.
     */
    sources?: { url?: string, title?: string }[];
}

export interface KnowledgeBaseResult {
    /**
     * A list of ML powered answer found in specific documents.
     * 
     * This corresponds with results such as the Kendra Suggested answer.  They use some ML model to attempt to pinpoint exactly within 
     */
    suggested?: KnowledgeBaseSuggested[];
    /**
     * List of FAQs that could match the query.
     * 
     * The source of these answers are from a database of existing FAQs.
     */
    faqs?: KnowledgeBaseFAQ[];
    /**
     * A list of results based on perceived relevance.
     * 
     * The source of this is a set corpus 
     */
    documents?: KnowledgeBaseDocument[];
    /**
     * A list of generated answers from a large language model.
     */
    generated?: KnowledgeBaseGenerated[];
}