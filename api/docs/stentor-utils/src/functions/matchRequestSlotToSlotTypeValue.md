[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / matchRequestSlotToSlotTypeValue

# Function: matchRequestSlotToSlotTypeValue()

> **matchRequestSlotToSlotTypeValue**\<`T`\>(`slot`, `slotTypeValues`): `SlotTypeValue`\<`T`\>

Defined in: [packages/stentor-utils/src/matcher.ts:212](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/matcher.ts#L212)

Match the request slot to the provided slot type values.

Both synonym and value are used, whichever has the highest
score is returned.

## Type Parameters

### T

`T`

## Parameters

### slot

[`RequestSlot`](../../../stentor/src/interfaces/RequestSlot.md)

### slotTypeValues

`SlotTypeValue`\<`T`\>[]

## Returns

`SlotTypeValue`\<`T`\>
