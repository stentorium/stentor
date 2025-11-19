[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-conditional/src](../README.md) / ConditionalDeterminer

# Class: ConditionalDeterminer

Defined in: [packages/stentor-conditional/src/ConditionalDeterminer.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-conditional/src/ConditionalDeterminer.ts#L11)

ConditionalDeterminer is first configured with a set of conditional 
checks it can perform and then determines which is the best match.

## Constructors

### Constructor

> **new ConditionalDeterminer**(`checks?`, `macros?`): `ConditionalDeterminer`

Defined in: [packages/stentor-conditional/src/ConditionalDeterminer.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-conditional/src/ConditionalDeterminer.ts#L19)

#### Parameters

##### checks?

`ConditionalCheck`\<`any`\>[]

##### macros?

`MacroMap`

#### Returns

`ConditionalDeterminer`

## Methods

### determine()

> **determine**\<`T`\>(`conditionals`): `Conditional`\<`T`\>[]

Defined in: [packages/stentor-conditional/src/ConditionalDeterminer.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-conditional/src/ConditionalDeterminer.ts#L35)

Determine the best conditional matches

#### Type Parameters

##### T

`T`

#### Parameters

##### conditionals

`Conditional`\<`T`\>[]

#### Returns

`Conditional`\<`T`\>[]

All matching conditionals based on the available checks
