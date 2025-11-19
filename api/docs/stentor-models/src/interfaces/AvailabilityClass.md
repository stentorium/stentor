[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / AvailabilityClass

# Interface: AvailabilityClass

Defined in: [packages/stentor-models/src/Services/CrmService.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L17)

## Properties

### id

> **id**: `string`

Defined in: [packages/stentor-models/src/Services/CrmService.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L21)

ID for the availability class, typically the slugged name.

***

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Services/CrmService.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L25)

Human readable name of the availability class

***

### summary

> **summary**: `string`

Defined in: [packages/stentor-models/src/Services/CrmService.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L29)

Summary of the availability class.  This is used to describe the availability class so the AI can match it to user input.  It contains high level description as well as examples of input that would match to this class.

***

### numberOfDaysOut?

> `optional` **numberOfDaysOut**: `number`

Defined in: [packages/stentor-models/src/Services/CrmService.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L37)

Minimum number of days out that can be scheduled for this type.

This is independent of if the day is available or not.

Value of 0 is the default if not provided, meaning same day could be available.

***

### appointmentsPerDay?

> `optional` **appointmentsPerDay**: `number`

Defined in: [packages/stentor-models/src/Services/CrmService.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L43)

Maximum number of appointments that can be scheduled per day for this type.

If not provided, it is assumed to be unlimited.

***

### leadOnly?

> `optional` **leadOnly**: `boolean`

Defined in: [packages/stentor-models/src/Services/CrmService.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L47)

If true, this availability class is only for leads and not for appointments as they typically require more information and followup.
