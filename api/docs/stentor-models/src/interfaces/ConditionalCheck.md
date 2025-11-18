[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ConditionalCheck

# Interface: ConditionalCheck\<T\>

Defined in: [packages/stentor-models/src/Conditional.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Conditional.ts#L10)

A conditional check is used to test an object to see if the check applies and also can perform the check.

The functions are used to check the condition with evaluating a string conditional.

## Type Parameters

### T

`T` = `any`

## Properties

### test()

> **test**: (`obj`) => `obj is T`

Defined in: [packages/stentor-models/src/Conditional.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Conditional.ts#L15)

A test for an object, that if returns true, can then be passed
to the check function.

#### Parameters

##### obj

`object` | `T`

#### Returns

`obj is T`

***

### check()

> **check**: (`obj`, ...`args`) => `boolean`

Defined in: [packages/stentor-models/src/Conditional.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Conditional.ts#L24)

Check that is performed on the object to determine if it passes
or fails the criteria.

The first argument is the object while the subsequent parameters
are any additional optional information that is required to make
the determination.

#### Parameters

##### obj

`T`

##### args

...`any`

#### Returns

`boolean`

***

### functions

> **functions**: (...`args`) => `string` \| `number` \| `boolean`[]

Defined in: [packages/stentor-models/src/Conditional.ts:34](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Conditional.ts#L34)

A set of functions that help determination within a string.

For example, for a time based conditional check, you can provide a function:

schedule(startTime: string, duration: number, timezone: string): boolean

which turns true if the current time is within the provided parameters.

#### Parameters

##### args

...`any`

#### Returns

`string` \| `number` \| `boolean`
