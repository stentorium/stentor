/*! Copyright (c) 2021, XAPPmedia */
import { KnowledgeBaseConfig, KnowledgeBaseResult, Request } from "stentor-models";
import { isInputUnknownRequest, isIntentRequest } from "stentor-guards";
import { combine } from "stentor-utils";

/**
 * From the two provided knowledge base results, it will return the result or combines them.  
 * 
 * @param existing 
 * @param incoming 
 * @param merge 
 * @returns 
 */
export function combineKnowledgeBaseResults(existing: KnowledgeBaseResult, incoming: KnowledgeBaseResult, merge = false): KnowledgeBaseResult {

    if (!existing) {
        return incoming;
    }

    if (!incoming) {
        return existing;
    }

    if (merge) {
        return {
            faqs: combine(existing?.faqs, incoming.faqs),
            documents: combine(existing?.documents, incoming.documents),
            suggested: combine(existing?.suggested, incoming.suggested),
            generated: combine(existing?.generated, incoming.generated)
        }
    } else {
        return incoming;
    }
}

/**
 * Merges the provided knowledge base result onto the provided request, taking into account the optional config passed in.
 * 
 * @param request 
 * @param result 
 * @param config 
 * @returns 
 */
export function mergeInKnowledgeBaseResults(request: Request, result: KnowledgeBaseResult, config?: KnowledgeBaseConfig): Request {

    const merged = { ...request };

    if (result) {
        if (isIntentRequest(merged) || isInputUnknownRequest(merged)) {
            const existing = merged.knowledgeBaseResult;
            merged.knowledgeBaseResult = combineKnowledgeBaseResults(existing, result, config?.mergeResults)

            if (config?.setIntentId) {
                merged.type = "INTENT_REQUEST";
                merged.intentId = config.setIntentId;
            }
        }
    }

    return merged;
}
