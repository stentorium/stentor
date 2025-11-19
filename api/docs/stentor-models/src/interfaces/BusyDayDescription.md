[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / BusyDayDescription

# Interface: BusyDayDescription

Defined in: [packages/stentor-models/src/Form/FormField.ts:177](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L177)

## Properties

### availableDays?

> `readonly` `optional` **availableDays**: [`DayOfWeek`](../type-aliases/DayOfWeek.md)[]

Defined in: [packages/stentor-models/src/Form/FormField.ts:181](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L181)

The days of the week that are available for appointments.

***

### blockWeekends?

> `readonly` `optional` **blockWeekends**: `boolean`

Defined in: [packages/stentor-models/src/Form/FormField.ts:187](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L187)

Blocks all weekends

If provided, it will override the availableDays.

***

### blockCurrentDay?

> `readonly` `optional` **blockCurrentDay**: `boolean`

Defined in: [packages/stentor-models/src/Form/FormField.ts:194](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L194)

Blocks the current day.

If it is a weekend and weekends are not blocked, it will be blocked.
If it is a weekend and weekends are blocked, the it will be disregarded.

***

### currentDayAvailableUntil?

> `readonly` `optional` **currentDayAvailableUntil**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:198](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L198)

Blocks the current day until the specified time.  This is in the format of HH:MM.

***

### blockNextBusinessDays?

> `readonly` `optional` **blockNextBusinessDays**: `number`

Defined in: [packages/stentor-models/src/Form/FormField.ts:206](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L206)

Blocks the next number of business days.

One business day will bock the next business day.

If this is set, it will override the availableDays, blockWeekends, and blockCurrentDay.
