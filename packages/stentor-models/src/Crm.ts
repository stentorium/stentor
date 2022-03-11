/*! Copyright (c) 2022, XAPPmedia */
import { Message } from "./Message";

export interface LeadFormField {
    name: string;
    value: string;
}

export interface CrmTranscriptAttributes {
    [attribute: string]: unknown;
}

export interface ExternalLead {
    fields: LeadFormField[];
    source?: string;
    company?: string;
    transcript?: Message[];
}

export interface CrmResponse {
    status: "Success" | "Failure";
    message?: string;
}
