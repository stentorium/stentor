/*! Copyright (c) 2022, XAPPmedia */

import { CrmResponse, ExternalLead } from "../Crm";

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
}
