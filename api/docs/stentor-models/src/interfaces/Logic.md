[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Logic

# Interface: Logic

Defined in: [packages/stentor-models/src/Logic.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Logic.ts#L5)

Logic meant to be run in the LogicEvaluator.

## Properties

### version?

> `optional` **version**: `number`

Defined in: [packages/stentor-models/src/Logic.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Logic.ts#L10)

Version of the LogicEvaluator the compiled code will be
executed within.

***

### compiled

> **compiled**: `string`

Defined in: [packages/stentor-models/src/Logic.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Logic.ts#L14)

The compiled JavaScript

***

### typescript?

> `optional` **typescript**: `string`

Defined in: [packages/stentor-models/src/Logic.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Logic.ts#L22)

**`Alpha`**

Currently not supported but in the future we might want to store
the raw TypeScript source which is easier to read and write than
the compiled JavaScript.
