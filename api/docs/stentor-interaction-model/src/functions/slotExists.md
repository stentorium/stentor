[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-interaction-model/src](../README.md) / slotExists

# Function: slotExists()

> **slotExists**(`slots`, `name`): `boolean`

Defined in: [packages/stentor-interaction-model/src/SlotConditionalCheck.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/SlotConditionalCheck.ts#L47)

Has a value for the provided slot name.

The slot is not undefined or an empty string.

## Parameters

### slots

[`RequestSlotMap`](../../../stentor/src/interfaces/RequestSlotMap.md)

### name

`string`

## Returns

`boolean`

## Private Remark

This is just a wrapper around hasSlots
