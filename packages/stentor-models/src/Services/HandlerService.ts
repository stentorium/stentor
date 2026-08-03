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
    /**
     * Returns the handlers for the provided IDs in a single call.  Handlers that cannot be found
     * are omitted from the result rather than causing the whole call to fail.
     *
     * Optional so that existing {@link HandlerService} implementations remain valid; implementations
     * that do not override this can be batched by callers falling back to multiple {@link get} calls.
     *
     * @param ids - Array of IDs, each either a string or an object that has the ID under intentId
     * @public
     */
    getMany?(ids: (string | { intentId: string })[]): Promise<Handler[]>;
}
