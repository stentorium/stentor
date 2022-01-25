/*! Copyright (c) 2022, XAPPmedia */

export interface LeadFormField {
    name: string;
    value: string;
}

export interface ExternalLead {
    fields: LeadFormField[];
    source?: string;
    company?: string;
    transScript?: string;
}

export interface CrmResponse {
    status: "Success" | "Failure";
    message?: string;
}
