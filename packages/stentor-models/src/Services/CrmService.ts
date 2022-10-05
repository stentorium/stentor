/*! Copyright (c) 2022, XAPPmedia */

import { CrmResponse, ExternalLead } from "../Crm";

export interface CrmService {
    /**
     * Send the lead to the CRM
     * 
     * @param externalLead Lead information
     * @param extras Optional additional metadata to pass to the CRM
     */
    send(externalLead: ExternalLead, extras?: Record<string, unknown>): Promise<CrmResponse>;
}
