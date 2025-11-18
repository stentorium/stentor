[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-handler/src](../README.md) / HandlerTree

# Class: HandlerTree

Defined in: [packages/stentor-handler/src/HandlerTree/HandlerTree.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/HandlerTree/HandlerTree.ts#L5)

## Extends

- `AbstractTree`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\>

## Constructors

### Constructor

> **new HandlerTree**(`root?`): `HandlerTree`

Defined in: node\_modules/@xapp/patterns/lib/Tree/AbstractTree.d.ts:25

#### Parameters

##### root?

`Node`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>\>

#### Returns

`HandlerTree`

#### Inherited from

`AbstractTree<Handler>.constructor`

## Properties

### \_root

> `protected` **\_root**: `Node`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>\>

Defined in: node\_modules/@xapp/patterns/lib/Tree/AbstractTree.d.ts:24

#### Inherited from

`AbstractTree._root`

## Accessors

### root

#### Get Signature

> **get** **root**(): `Node`\<`D`\>

Defined in: node\_modules/@xapp/patterns/lib/Tree/AbstractTree.d.ts:23

The root of the tree

##### Memberof

AbstractTree

##### Returns

`Node`\<`D`\>

#### Inherited from

`AbstractTree.root`

## Methods

### add()

> **add**(`data`, `toNode?`): `void`

Defined in: node\_modules/@xapp/patterns/lib/Tree/AbstractTree.d.ts:36

Add data to the tree

If a root doesn't exist and only the first parameter is passed,
it will be set as root.

#### Parameters

##### data

[`Handler`](../../../stentor/src/interfaces/Handler.md)

Data to be added to the tree

##### toNode?

[`Handler`](../../../stentor/src/interfaces/Handler.md)

#### Returns

`void`

#### Memberof

AbstractTree

#### Inherited from

`AbstractTree.add`

***

### find()

> **find**(`data`): `Node`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>\>

Defined in: node\_modules/@xapp/patterns/lib/Tree/AbstractTree.d.ts:46

Find the data in the node.

Leverages breadth first search (BFS) method.

#### Parameters

##### data

[`Handler`](../../../stentor/src/interfaces/Handler.md)

#### Returns

`Node`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>\>

#### Memberof

AbstractTree

#### Inherited from

`AbstractTree.find`

***

### traverseDFS()

> **traverseDFS**(`fn`, `method?`): `void`

Defined in: node\_modules/@xapp/patterns/lib/Tree/AbstractTree.d.ts:49

#### Parameters

##### fn

(`node`) => `void`

##### method?

`"preOrder"` | `"postOrder"`

#### Returns

`void`

#### Inherited from

`AbstractTree.traverseDFS`

***

### traverseBFS()

> **traverseBFS**(`fn?`): `void`

Defined in: node\_modules/@xapp/patterns/lib/Tree/AbstractTree.d.ts:50

#### Parameters

##### fn?

(`node`) => `void`

#### Returns

`void`

#### Inherited from

`AbstractTree.traverseBFS`

***

### print()

> **print**(`convertToString`, `printLine?`): `void`

Defined in: node\_modules/@xapp/patterns/lib/Tree/AbstractTree.d.ts:71

Print the tree to the console using the provided function
to transform each data to a string.

#### Parameters

##### convertToString

(`data`, `branch?`) => `string`

##### printLine?

(`line`) => `void`

#### Returns

`void`

#### Memberof

AbstractTree

#### Inherited from

`AbstractTree.print`
