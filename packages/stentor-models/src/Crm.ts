/*! Copyright (c) 2022, XAPPmedia */
import { Message } from "./Message";

export interface LeadFormField {
    name: string;
    value: string;
}

export interface ExternalLead {
    /**
     * The user ID that generated the lead
     */
    userId?: string;
    /**
     * The session ID that generated the lead
     */
    sessionId?: string;
    /**
     * Fields such as name and email
     */
    fields: LeadFormField[];
    /**
     * Optional source, typically chat-widget or form-widget
     */
    source?: string;
    /**
     * Optional company
     */
    company?: string;
    /**
     * Transcript of the conversation
     *
     */
    transcript?: Message[];
    /**
     * Optional reference ID in the 3rd party CRM or FSM
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
