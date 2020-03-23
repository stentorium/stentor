/*! Copyright (c) 2019, XAPPmedia */
import { isGlobalHandler } from "stentor-guards";
import { describeKey, determineIntentIdToPath, KeyDescription, hashCode } from "stentor-utils";
import { HandlerGraph } from "./HandlerGraph";

export interface NodeField {
    name: string;
}

export interface Node {
    nid: number; // string hopefully?
    // name?
    id: string;
    type: string;
    x: number;
    y: number;
    fields: { in: NodeField[]; out: NodeField[] };
}

export interface Connection {
    id: string;
    // The intentId that links the connection.
    description: KeyDescription;
    // id for the node
    from_node: number;
    // field name
    from: string;
    // id for the node
    to_node: number;
    // field name
    to: string;
}

function humanReadable(intentId: string): string {
    let readable: string;

    switch (intentId) {
        case "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$":
            readable = "open-ended";
            break;
        default:
            readable = intentId;
    }

    return readable;
}

/**
 * Convert a graph to nodes and connections, a format required for display within a GUI.
 *
 * This format is required by https://github.com/lightsinthesky/react-node-graph
 *
 * @export
 * @param {HandlerGraph} graph
 * @returns {{ nodes: Node[], connections: Connection[] }}
 */
export function toNodesAndConnections(
    graph: HandlerGraph
): { nodes: { [id: string]: Node }; connections: { [id: string]: Connection } } {
    const endNodes: Node[] = [];
    const globalNodes: Node[] = [];
    const secondaryNodes: Node[] = [];

    // First convert the vertices to nodes
    graph.vertices.forEach(vertex => {
        const handler = graph.getHandler(vertex);

        // ins are the content keys
        const inField: NodeField[] = [];
        if (handler.content) {
            Object.keys(handler.content).forEach(name => {
                inField.push({ name: humanReadable(name) });
            });
        }
        // outs are the forward keys
        const outField: NodeField[] = [];
        if (handler.forward) {
            Object.keys(handler.forward).forEach(name => {
                outField.push({ name: humanReadable(name) });
            });
        }

        const nid = hashCode(handler.intentId);

        const node: Node = {
            nid,
            id: handler.intentId,
            type: handler.name,
            x: 0, // will reset these later
            y: 0,
            fields: {
                in: inField,
                out: outField
            }
        };

        if (isGlobalHandler(handler)) {
            globalNodes.push(node);
        } else if (node.fields.in.length === 1 && node.fields.out.length === 0) {
            endNodes.push(node);
        } else {
            secondaryNodes.push(node);
        }
    });

    const nodes: { [id: string]: Node } = {};

    // X RIGHT
    // Y DOWN

    // const SPACING_X = 100;
    const SPACING_Y = 100;

    const NODE_START_X = 100;
    const NODE_START_Y = 100;

    globalNodes.forEach((node, index) => {
        node.x = NODE_START_X;
        node.y = NODE_START_Y + SPACING_Y * index;
        nodes[node.id] = node;
    });

    const NODE_MID_X = 600;
    const NODE_MID_Y = 10;

    secondaryNodes.forEach((node, index) => {
        node.x = NODE_MID_X;
        node.y = NODE_MID_Y + SPACING_Y * index;
        nodes[node.id] = node;
    });

    const NODE_END_X = 1100;
    const NODE_END_Y = 10;

    // Space out all the nodes without connection
    endNodes.forEach((node, index) => {
        node.x = NODE_END_X;
        node.y = NODE_END_Y + index * SPACING_Y;
        nodes[node.id] = node;
    });

    const connections: { [id: string]: Connection } = {};
    // Connections
    Object.keys(graph.edges).forEach(intentId => {
        const handler = graph.getHandler(intentId);
        const nid = hashCode(handler.intentId);

        const edges = graph.edges[intentId];

        edges.forEach((edge, index) => {
            // Find the intentId that will lead to the edge (path.intentId)
            const intentId = determineIntentIdToPath(handler, edge);

            // eslint-disable-next-line @typescript-eslint/camelcase
            const to_node = hashCode(edge);

            const description = describeKey(edge);

            const connection: Connection = {
                id: `${nid.toString()}_${index}`,
                description,
                // eslint-disable-next-line @typescript-eslint/camelcase
                from_node: nid,
                // this needs to be within the outs on the node, which is the key on the
                // forward
                from: humanReadable(intentId),
                // eslint-disable-next-line @typescript-eslint/camelcase
                to_node,
                to: humanReadable(edge)
            };

            connections[connection.id] = connection;
        });
    });

    return { nodes, connections };
}


