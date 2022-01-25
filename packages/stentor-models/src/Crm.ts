/*! Copyright (c) 2022, XAPPmedia */

export interface LeadFormField {
    name: string;
    value: string;
}

export interface CrmTranscriptAttributes {
    [attribute: string]: unknown;
}

/**
 * Transcript representation of the session. The input/output is an easily readable, simplified representation
 * of the visitor/bot "chat". This is usually emailed or sent to a CRM system or customer service for a quick overview.
 * That is why input an output are strings.
 */
export interface CrmTranscriptExchange {
    input: string;
    output: string;
    attributes?: CrmTranscriptAttributes;
}

export interface CrmTranscript {
    items: CrmTranscriptExchange[];
}

export interface ExternalLead {
    fields: LeadFormField[];
    source?: string;
    company?: string;
    transcript?: CrmTranscript[];
}

export interface CrmResponse {
    status: "Success" | "Failure";
    message?: string;
}
