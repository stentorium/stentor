/*! Copyright (c) 2022, XAPPmedia */

import { CrmResponse, ExternalLead } from "../Crm";
import { DateTime, DateTimeRange } from "../DateTime";

export interface CrmServiceAvailabilityOptions {
    /**
     * The Google Place ID for the business to help determine availability.
     */
    placeId?: string;
    /**
     * Maximum total number of appointments a day that can be scheduled through the scheduler.
     */
    maxTotalDailyAppointments?: number;
}

export interface CrmServiceDateAvailability {
    /**
     * The number of appointments available for the given range.
     * 
     * Typically, just the date is used, tz and time are not needed.
     */
    date: DateTime;
    /**
     * If the day is available for appointments.
     */
    available: boolean;
    /**
     * The number of remaining available appointments.
     */
    remainingAppointments?: number;
}

export interface CrmServiceAvailability {
    /**
     * The range
     */
    range: DateTimeRange;
    /**
     * Availability for each date in the range.
     */
    dateAvailabilities: CrmServiceDateAvailability[];
}

export interface CrmService {
    /**
     * Send information about a lead to the CRM.
     * 
     * This can be used to either create a lead or append data to an existing lead.
     * 
     * The existing lead can be determined by the refId on the ExternalLead information or by attempting to match data such as email or phone number.
     * 
     * @param externalLead Lead information
     * @param extras Optional additional metadata to pass to the CRM
     */
    send(externalLead: ExternalLead, extras?: Record<string, unknown>): Promise<CrmResponse>;
    /**
     * Updates a lead if the user provides more information after the lead has been sent.
     * 
     * It leverages the refId on the externalLead, which is originally provided in the CrmResponse to properly
     * 
     * @deprecated Use send with a refId on the externalLead and call send() again.  This will update.
     * 
     * @param externalLead 
     * @param extras 
     */
    update?(externalLead: ExternalLead, extras?: Record<string, unknown>): Promise<CrmResponse>;
    /**
     * Returns availability for scheduling an appointment with the business.
     * 
     * @param range 
     * @param options 
     */
    getAvailability(range: DateTimeRange, options?: CrmServiceAvailabilityOptions): Promise<CrmServiceAvailability>;
}
