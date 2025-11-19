[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-handler/src](../README.md) / toNodesAndConnections

# Function: toNodesAndConnections()

> **toNodesAndConnections**(`graph`): `object`

Defined in: [packages/stentor-handler/src/HandlerGraph/toNodesAndConnections.ts:56](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/HandlerGraph/toNodesAndConnections.ts#L56)

Convert a graph to nodes and connections, a format required for display within a GUI.

This format is required by https://github.com/lightsinthesky/react-node-graph

## Parameters

### graph

[`HandlerGraph`](../classes/HandlerGraph.md)

## Returns

`object`

### nodes

> **nodes**: `object`

#### Index Signature

\[`id`: `string`\]: [`Node`](../interfaces/Node.md)

### connections

> **connections**: `object`

#### Index Signature

\[`id`: `string`\]: [`Connection`](../interfaces/Connection.md)
