/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { OptionSelectID, OptionSelectRequestType } from "./Types";

export interface OptionSelectRequest extends BaseRequest {
    type: OptionSelectRequestType;
    /**
     * OptionSelect has a constant ID.
     */
    intentId: OptionSelectID;
    /**
     * The current session ID
     */
    sessionId: string;
    /**
     * The select option's unique id
     */
    token: string;
    /**
     * The textual representation of the selected option.
     *
     * This is not always available.
     */
    title?: string;
    /**
     * For the selection of an item in a list, this is the index of the item.
     *
     * This is not always available.
     */
    index?: number;
}
