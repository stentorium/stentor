[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Conditioned

# Interface: Conditioned

Defined in: [packages/stentor-models/src/Conditional.ts:67](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Conditional.ts#L67)

**`Beta`**

An object can implement Conditioned if it has a set of conditions.

## Properties

### conditions

> **conditions**: `string` \| [`Conditions`](Conditions.md)

Defined in: [packages/stentor-models/src/Conditional.ts:73](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Conditional.ts#L73)

**`Beta`**

Conditions to be met.

Can either be a Conditions object or a string such as "foo('bar') || false"
