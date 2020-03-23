/*! Copyright (c) 2019, XAPPmedia */
import { AbstractGraph } from "@xapp/patterns";
import { isExecutablePath } from "stentor-guards";
import { Handler } from "stentor-models";
import { filterOutIntents, HandlerMap, toMap } from "stentor-utils";

/**
 * Generate a graph of handlers.
 *
 * A handler is a vertex and the edges are the connections between the handlers
 * based on the forwards.
 *
 * @export
 * @class HandlerGraph
 * @extends {AbstractGraph}
 */
export class HandlerGraph extends AbstractGraph {
    private handlers: Handler[];

    private map: HandlerMap;

    constructor(handlers?: Handler[]) {
        super();

        if (Array.isArray(handlers) && handlers.length > 0) {
            // Make sure we don't have any intents
            this.handlers = filterOutIntents(handlers);
            this.map = toMap(this.handlers);
            // First, add all the vertexes
            this.handlers.forEach(handler => {
                this.addVertex(handler.intentId);
            });
            // Then add the edges
            this.handlers.forEach(handler => {
                if (handler.forward && Object.keys(handler.forward).length > 0) {
                    Object.keys(handler.forward).forEach(key => {
                        const paths = handler.forward[key];
                        paths.forEach(path => {
                            // We can only add executable paths at the moment
                            // Others will be determined at runtime.
                            if (isExecutablePath(path)) {
                                this.addEdge(handler.intentId, path.intentId);
                            }
                        });
                    });
                }
            });
        }
    }

    /**
     * Get the handler for the node.
     *
     * @param {string} id
     * @returns {(Handler | undefined)}
     * @memberof HandlerGraph
     */
    getHandler(id: string): Handler | undefined {
        return this.map[id];
    }
}
