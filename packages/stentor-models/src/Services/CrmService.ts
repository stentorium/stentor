/*! Copyright (c) 2022, XAPPmedia */

import { CrmResponse, ExternalLead } from "../Crm";

export interface CrmService {
    /**
     *
     * @param externalLead
     */
    send(externalLead: ExternalLead): Promise<CrmResponse>;
}
