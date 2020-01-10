/*! Copyright (c) 2019, XAPPmedia */
import { Handler } from "../Handler";

/**
 * The HandlerService provides the assistant application's dialog management with logic and content
 * in the form of a {@link Handler}.
 * 
 * @public
 */
export interface HandlerService {
    /**
     * Returns the handler for the provided ID or undefined if not found.
     * 
     * @param id - Either the ID as a string or an object that has the ID under intentId
     * @public
     */
    get(id: string | { intentId: string }): Promise<Handler> | Promise<undefined>;
}
