[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / CrmServiceAvailabilityOptions

# Interface: CrmServiceAvailabilityOptions

Defined in: [packages/stentor-models/src/Services/CrmService.ts:131](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L131)

Settings for the availability of the CRM service.

## Extends

- [`CrmServiceAvailabilitySettings`](CrmServiceAvailabilitySettings.md)

## Properties

### availableDays?

> `optional` **availableDays**: [`DayOfWeek`](../type-aliases/DayOfWeek.md)[]

Defined in: [packages/stentor-models/src/Services/CrmService.ts:57](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L57)

The days of the week they are available to schedule appointments through the scheduler.

#### Inherited from

[`CrmServiceAvailabilitySettings`](CrmServiceAvailabilitySettings.md).[`availableDays`](CrmServiceAvailabilitySettings.md#availabledays)

***

### blockedDays?

> `optional` **blockedDays**: [`DateTime`](DateTime.md)[]

Defined in: [packages/stentor-models/src/Services/CrmService.ts:61](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L61)

These are holidays or any other days specific to the business that they are not available for appointments.

#### Inherited from

[`CrmServiceAvailabilitySettings`](CrmServiceAvailabilitySettings.md).[`blockedDays`](CrmServiceAvailabilitySettings.md#blockeddays)

***

### maxTotalDailyAppointments?

> `optional` **maxTotalDailyAppointments**: `number`

Defined in: [packages/stentor-models/src/Services/CrmService.ts:65](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L65)

Maximum total number of appointments a day that can be scheduled through the scheduler.

#### Inherited from

[`CrmServiceAvailabilitySettings`](CrmServiceAvailabilitySettings.md).[`maxTotalDailyAppointments`](CrmServiceAvailabilitySettings.md#maxtotaldailyappointments)

***

### delayedJobTypes?

> `optional` **delayedJobTypes**: `string`[]

Defined in: [packages/stentor-models/src/Services/CrmService.ts:69](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L69)

Job types, where we only schedule a few days (3) ahead

#### Inherited from

[`CrmServiceAvailabilitySettings`](CrmServiceAvailabilitySettings.md).[`delayedJobTypes`](CrmServiceAvailabilitySettings.md#delayedjobtypes)

***

### availabilityClasses?

> `optional` **availabilityClasses**: [`AvailabilityClass`](AvailabilityClass.md)[]

Defined in: [packages/stentor-models/src/Services/CrmService.ts:73](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L73)

The customer specific "availability classes" that describes the scheduling strategy for job types.

#### Inherited from

[`CrmServiceAvailabilitySettings`](CrmServiceAvailabilitySettings.md).[`availabilityClasses`](CrmServiceAvailabilitySettings.md#availabilityclasses)

***

### defaultAvailabilityClass?

> `optional` **defaultAvailabilityClass**: `string`

Defined in: [packages/stentor-models/src/Services/CrmService.ts:77](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L77)

The default availability class (when the AI cannot figure it out)

#### Inherited from

[`CrmServiceAvailabilitySettings`](CrmServiceAvailabilitySettings.md).[`defaultAvailabilityClass`](CrmServiceAvailabilitySettings.md#defaultavailabilityclass)

***

### defaultBusyDays?

> `optional` **defaultBusyDays**: [`BusyDayDescription`](BusyDayDescription.md)

Defined in: [packages/stentor-models/src/Services/CrmService.ts:81](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L81)

The default busy days for the business.  This is used when the FSM/Scheduling backend does not provide busy days

#### Inherited from

[`CrmServiceAvailabilitySettings`](CrmServiceAvailabilitySettings.md).[`defaultBusyDays`](CrmServiceAvailabilitySettings.md#defaultbusydays)

***

### jobType?

> `optional` **jobType**: [`CrmServiceJobType`](CrmServiceJobType.md)

Defined in: [packages/stentor-models/src/Services/CrmService.ts:138](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L138)

Job Type to filter availability by.

This allows to display availability for a specific job type, which can be different.
