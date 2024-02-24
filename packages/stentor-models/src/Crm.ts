/*! Copyright (c) 2022, XAPPmedia */
import { Message } from "./Message";



export interface LeadFormField {
    name: string;
    value: string;
}

export interface ExternalLead {
    /**
     * Fields such as name and email
     */
    fields: LeadFormField[];
    source?: string;
    company?: string;
    /**
     * Transcript of the conversation
     *
     */
    transcript?: Message[];
    /**
     * Optional reference ID
     */
    refId?: string;
    /**
     * Is it abandoned (unfinished)?
     */
    isAbandoned?: boolean;
}

export interface CrmResponse {
    /**
     * Was the lead creation request successful
     */
    status: "Success" | "Failure";
    /**
     * Potentially helpful message if there was a failure
     */
    message?: string;
    /**
     * A reference to the lead in the CRM 
     */
    refId?: string;
}
