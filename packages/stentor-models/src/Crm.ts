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
     * Optional job type ID in the 3rd party CRM 
     * (this maybe looked up already as a side effect of the avalability request)
     */
    jobTypeId?: string;
    /**
     * Optinal id to to identify the availabilty stratego (blocked days ahead, etc)
     */
    availabilityClassId?: string;
    /**
     * Is it abandoned (unfinished)?
     */
    isAbandoned?: boolean;
    /**
     * Optional Google Place ID identifying which business location 
     * this lead originated from. Used for multi-location businesses
     * to route leads to the correct external system.
     */
    placeId?: string;
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
