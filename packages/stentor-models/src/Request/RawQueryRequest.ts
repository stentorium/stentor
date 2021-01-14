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
}