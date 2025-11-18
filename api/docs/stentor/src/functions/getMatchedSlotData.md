[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / getMatchedSlotData

# Function: getMatchedSlotData()

> **getMatchedSlotData**\<`T`\>(`request`, `slotName`, `slots`, `slotTypeMap`): `T`

Defined in: packages/stentor-handler/lib/AbstractHandler/Util.d.ts:11

If the provided request is an intent request, it searches for the provided slot name
and then tries to find the appropriate data associated with that slot value.

## Type Parameters

### T

`T`

## Parameters

### request

[`Request`](../type-aliases/Request.md)

### slotName

`string`

### slots

`Slot`[]

### slotTypeMap

`SlotTypeMap`\<`T`\>

## Returns

`T`
