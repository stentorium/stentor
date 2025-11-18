[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Conditions

# Interface: Conditions

Defined in: [packages/stentor-models/src/Conditional.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Conditional.ts#L47)

**`Beta`**

Definition of conditions.

## Remarks

A couple of notes on the behavior:
  * If passed musts and shoulds, they are ANDed (or &&) together.  All musts must pass and at least one should needs to pass.
  * If only one shoulds is provided, it must return true for the conditions to be met.
  * If multiple shoulds are passed

## Properties

### must?

> `optional` **must**: (`object` \| [`Contexts`](../type-aliases/Contexts.md))[]

Defined in: [packages/stentor-models/src/Conditional.ts:53](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Conditional.ts#L53)

**`Beta`**

All objects within must return true in order for the conditions to be met.

It might be helpful to think of these as ANDs (or &&)

***

### should?

> `optional` **should**: (`object` \| [`Contexts`](../type-aliases/Contexts.md))[]

Defined in: [packages/stentor-models/src/Conditional.ts:59](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Conditional.ts#L59)

**`Beta`**

Only one of the objects within the array must pass for the conditions to be met. 

If only one is provided, it must pass for the conditions to be met.
