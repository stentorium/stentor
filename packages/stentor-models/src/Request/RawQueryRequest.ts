/*! Copyright (c) 2021, XAPPmedia */
import { BaseRequest } from "./Request";
import { RawQueryRequestType } from "./Types";

/**
 * A request that has not yet been processed by an NLU to determine
 * the intent.
 */
export interface RawQueryRequest extends BaseRequest {
    type: RawQueryRequestType;
    /**
     * The request from the user
     */
    rawQuery: string;
    /**
     * The ID of the user's current session.
     *
     * A session is typically defined by the channel is on but it is typically a set
     * of requests and responses that are linked together.
     */
    sessionId: string;
}