/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { TransactionRequirementCheckType } from "./Types";

export interface TransactionRequirementCheckRequest extends BaseRequest {
    type: TransactionRequirementCheckType;
    sessionId: string;
    granted: boolean;
}
