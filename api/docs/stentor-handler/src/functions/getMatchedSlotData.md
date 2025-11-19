[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-handler/src](../README.md) / getMatchedSlotData

# Function: getMatchedSlotData()

> **getMatchedSlotData**\<`T`\>(`request`, `slotName`, `slots`, `slotTypeMap`): `T`

Defined in: [packages/stentor-handler/src/AbstractHandler/Util.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Util.ts#L25)

If the provided request is an intent request, it searches for the provided slot name
and then tries to find the appropriate data associated with that slot value.

## Type Parameters

### T

`T`

## Parameters

### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

### slotName

`string`

### slots

`Slot`[]

### slotTypeMap

`SlotTypeMap`\<`T`\>

## Returns

`T`
