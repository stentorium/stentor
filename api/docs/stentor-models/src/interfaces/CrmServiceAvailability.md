[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / CrmServiceAvailability

# Interface: CrmServiceAvailability

Defined in: [packages/stentor-models/src/Services/CrmService.ts:118](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L118)

## Properties

### range

> **range**: [`DateTimeRange`](DateTimeRange.md)

Defined in: [packages/stentor-models/src/Services/CrmService.ts:122](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L122)

The range

***

### unavailabilities

> **unavailabilities**: [`CrmServiceDateAvailability`](CrmServiceDateAvailability.md)[]

Defined in: [packages/stentor-models/src/Services/CrmService.ts:128](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L128)

Availability for each date in the range.

If the date is not included in the array, it is assumed to be available.
