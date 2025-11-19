[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / CrmServiceDateAvailability

# Interface: CrmServiceDateAvailability

Defined in: [packages/stentor-models/src/Services/CrmService.ts:95](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L95)

## Properties

### date

> **date**: [`DateTime`](DateTime.md)

Defined in: [packages/stentor-models/src/Services/CrmService.ts:99](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L99)

Typically, just the date is used, tz and time are not needed.

***

### available

> **available**: `boolean`

Defined in: [packages/stentor-models/src/Services/CrmService.ts:103](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L103)

If the day has any availability for appointments.

***

### remainingAppointments?

> `optional` **remainingAppointments**: `number`

Defined in: [packages/stentor-models/src/Services/CrmService.ts:107](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L107)

The number of remaining available appointments.

***

### blockedTimeSlots?

> `optional` **blockedTimeSlots**: [`CrmServiceTimeAvailability`](CrmServiceTimeAvailability.md)[]

Defined in: [packages/stentor-models/src/Services/CrmService.ts:115](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L115)

Blocked time slots for the day.

These are only blocked times during their normal business hours.

#### Note

- This is only for future consideration.
