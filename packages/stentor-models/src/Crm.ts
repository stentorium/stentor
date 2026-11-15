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
    /**
     * The arrival window the customer asked for. With holds on, it counts against the
     * availabilityClassId capacity until the lead is lost, canceled, or the window passes.
     */
    requestedWindow?: LeadWindow;
    /**
     * The window the business booked the job into, set when the lead is marked booked.
     * Defaults to requestedWindow.
     */
    bookedWindow?: LeadWindow;
}

/**
 * A window on a lead, ISO 8601 with offset in the business timezone.
 */
export interface LeadWindow {
    start: string;
    end: string;
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
