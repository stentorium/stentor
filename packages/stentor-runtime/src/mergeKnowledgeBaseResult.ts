/*! Copyright (c) 2021, XAPPmedia */
import { KnowledgeBaseResult, Request } from "stentor-models";
import { isInputUnknownRequest, isIntentRequest } from "stentor-request";
import { combine } from "stentor-utils";
import { KnowledgeBaseConfig } from "./main";

/**
 * Merges the provided knowledge base result onto the provided request, taking into account the optional config passed in.
 * 
 * @param request 
 * @param result 
 * @param config 
 * @returns 
 */
export function mergeKnowledgeBaseResult(request: Request, result: KnowledgeBaseResult, config?: KnowledgeBaseConfig): Request {

    const merged = { ...request };

    if (result) {
        if (isIntentRequest(merged) || isInputUnknownRequest(merged)) {
            if (config?.mergeResults) {
                const existing = merged.knowledgeBaseResult;
                merged.knowledgeBaseResult = {
                    faqs: combine(existing?.faqs, result.faqs),
                    documents: combine(existing?.documents, result.documents),
                    suggested: combine(existing?.suggested, result.suggested)
                }
            } else {
                merged.knowledgeBaseResult = result;
            }

            if (config?.setIntentId) {
                merged.type = "INTENT_REQUEST";
                merged.intentId = config.setIntentId;
            }
        }
    }

    return merged;
}