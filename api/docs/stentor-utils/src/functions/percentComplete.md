[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / percentComplete

# Function: percentComplete()

## Call Signature

> **percentComplete**\<`T`\>(`template`, `required`): `number`

Defined in: [packages/stentor-utils/src/object/percentComplete.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/object/percentComplete.ts#L29)

Calculates the percentage complete of the required parameters
for the given template.

### Type Parameters

#### T

`T`

### Parameters

#### template

`Partial`\<`T`\>

#### required

keyof `T`[]

### Returns

`number`

## Call Signature

> **percentComplete**\<`T`\>(`template`, `required`, `returnRemaining`): [`PercentCompleteAndRemaining`](../interfaces/PercentCompleteAndRemaining.md)\<`T`\>

Defined in: [packages/stentor-utils/src/object/percentComplete.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/object/percentComplete.ts#L30)

Calculates the percentage complete of the required parameters
for the given template.

### Type Parameters

#### T

`T`

### Parameters

#### template

`Partial`\<`T`\>

#### required

keyof `T`[]

#### returnRemaining

`true`

### Returns

[`PercentCompleteAndRemaining`](../interfaces/PercentCompleteAndRemaining.md)\<`T`\>
