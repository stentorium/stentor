/*! Copyright (c) 2019, XAPPmedia */
import { Handler } from "stentor-models";
import { toMap } from "../AbstractHandler";
import { isExecutablePath } from "../Path";
import { HandlerTree } from "./HandlerTree";

const MAX_RECURSION = 500;

export function generateHandlerTree(root: Handler, handlers: Handler[]): HandlerTree {
    const map: { [id: string]: Handler } = toMap(handlers) as { [id: string]: Handler };

    const tree = new HandlerTree({ data: root, children: [] });

    let infiniteLoopDetector: number = 0;

    // Start with the root in the queue
    const queue: Handler[] = [root];
    // Then go through all the forward methods
    while (queue.length) {
        const handler = queue.shift();

        if (!handler) {
            throw new Error("Next handler in queue was undefined");
        }

        if (typeof handler.forward === "object") {
            const keys = Object.keys(handler.forward);
            keys.forEach(id => {
                // Validate the handoff
                const forwardedTo = handler.forward[id];
                // A little validation
                if (!Array.isArray(forwardedTo)) {
                    throw new Error(`Forwarding for ${handler.intentId} ${id} was not an array`);
                }
                forwardedTo.forEach(childPath => {
                    if (isExecutablePath(childPath) && map[childPath.intentId]) {
                        const child = map[childPath.intentId];
                        if (child.intentId !== root.intentId) {
                            queue.push(child);
                            tree.add(child, handler);
                        }
                    }
                });
            });
        }
        // Our cheap and dirty infinite loop detector
        infiniteLoopDetector += 1;
        if (infiniteLoopDetector > MAX_RECURSION) {
            // throw new Error(`Infinite loop detected for handler ${handler.intentId}`);
            console.error(`Infinite loop detected for handler ${handler.intentId}`);
            break;
        }
    }

    return tree;
}
