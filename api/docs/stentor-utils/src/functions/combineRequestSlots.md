[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / combineRequestSlots

# Function: combineRequestSlots()

> **combineRequestSlots**(`current`, `incoming`): [`RequestSlotMap`](../../../stentor/src/interfaces/RequestSlotMap.md)

Defined in: [packages/stentor-utils/src/request/combineRequestSlots.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/request/combineRequestSlots.ts#L16)

Combines two slot maps.

## Parameters

### current

[`RequestSlotMap`](../../../stentor/src/interfaces/RequestSlotMap.md)

The current slots

### incoming

[`RequestSlotMap`](../../../stentor/src/interfaces/RequestSlotMap.md)

The new incoming slots

## Returns

[`RequestSlotMap`](../../../stentor/src/interfaces/RequestSlotMap.md)

## Remarks

The incoming will only override the current if the value doesn't exist
on the current and exists on the incoming.  This is helpful for slot filling.

If both are undefined, an empty object is returned.
