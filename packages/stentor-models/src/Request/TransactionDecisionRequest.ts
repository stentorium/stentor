/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { TransactionDecisionType } from "./Types";
import { TransactionData } from "../TransactionData";

export interface TransactionDecisionRequest extends BaseRequest {
    type: TransactionDecisionType;
    sessionId: string;
    granted: boolean;
    transactionData: TransactionData;
}
