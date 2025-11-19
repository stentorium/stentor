[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-handler/src](../README.md) / HandlerGraph

# Class: HandlerGraph

Defined in: [packages/stentor-handler/src/HandlerGraph/HandlerGraph.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/HandlerGraph/HandlerGraph.ts#L13)

Generate a graph of handlers.

A handler is a vertex and the edges are the connections between the handlers
based on the forwards.

## Extends

- `AbstractGraph`

## Constructors

### Constructor

> **new HandlerGraph**(`handlers?`): `HandlerGraph`

Defined in: [packages/stentor-handler/src/HandlerGraph/HandlerGraph.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/HandlerGraph/HandlerGraph.ts#L18)

#### Parameters

##### handlers?

[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>[]

#### Returns

`HandlerGraph`

#### Overrides

`AbstractGraph.constructor`

## Properties

### vertices

> `readonly` **vertices**: `string`[]

Defined in: node\_modules/@xapp/patterns/lib/Graph/AbstractGraph.d.ts:13

#### Inherited from

`AbstractGraph.vertices`

***

### edges

> `readonly` **edges**: `object`

Defined in: node\_modules/@xapp/patterns/lib/Graph/AbstractGraph.d.ts:14

#### Index Signature

\[`vertex`: `string`\]: `string`[]

#### Inherited from

`AbstractGraph.edges`

## Methods

### addVertex()

> **addVertex**(`vertex`): `void`

Defined in: node\_modules/@xapp/patterns/lib/Graph/AbstractGraph.d.ts:19

#### Parameters

##### vertex

`string`

#### Returns

`void`

#### Inherited from

`AbstractGraph.addVertex`

***

### removeVertex()

> **removeVertex**(`vertex`): `void`

Defined in: node\_modules/@xapp/patterns/lib/Graph/AbstractGraph.d.ts:20

#### Parameters

##### vertex

`string`

#### Returns

`void`

#### Inherited from

`AbstractGraph.removeVertex`

***

### addEdge()

> **addEdge**(`vertex1`, `vertex2`): `void`

Defined in: node\_modules/@xapp/patterns/lib/Graph/AbstractGraph.d.ts:21

#### Parameters

##### vertex1

`string`

##### vertex2

`string`

#### Returns

`void`

#### Inherited from

`AbstractGraph.addEdge`

***

### removeEdge()

> **removeEdge**(`vertex1`, `vertex2`): `void`

Defined in: node\_modules/@xapp/patterns/lib/Graph/AbstractGraph.d.ts:22

#### Parameters

##### vertex1

`string`

##### vertex2

`string`

#### Returns

`void`

#### Inherited from

`AbstractGraph.removeEdge`

***

### size()

> **size**(): `number`

Defined in: node\_modules/@xapp/patterns/lib/Graph/AbstractGraph.d.ts:23

#### Returns

`number`

#### Inherited from

`AbstractGraph.size`

***

### relations()

> **relations**(): `number`

Defined in: node\_modules/@xapp/patterns/lib/Graph/AbstractGraph.d.ts:24

#### Returns

`number`

#### Inherited from

`AbstractGraph.relations`

***

### traverseDFS()

> **traverseDFS**(`vertex`, `callback`): `void`

Defined in: node\_modules/@xapp/patterns/lib/Graph/AbstractGraph.d.ts:25

#### Parameters

##### vertex

`string`

##### callback

(`vertex`) => `void`

#### Returns

`void`

#### Inherited from

`AbstractGraph.traverseDFS`

***

### traverseBFS()

> **traverseBFS**(`vertex`, `callback`): `void`

Defined in: node\_modules/@xapp/patterns/lib/Graph/AbstractGraph.d.ts:27

#### Parameters

##### vertex

`string`

##### callback

(`vertex`) => `void`

#### Returns

`void`

#### Inherited from

`AbstractGraph.traverseBFS`

***

### print()

> **print**(): `void`

Defined in: node\_modules/@xapp/patterns/lib/Graph/AbstractGraph.d.ts:28

#### Returns

`void`

#### Inherited from

`AbstractGraph.print`

***

### getHandler()

> **getHandler**(`id`): [`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>

Defined in: [packages/stentor-handler/src/HandlerGraph/HandlerGraph.ts:53](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/HandlerGraph/HandlerGraph.ts#L53)

Get the handler for the node.

#### Parameters

##### id

`string`

#### Returns

[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>
