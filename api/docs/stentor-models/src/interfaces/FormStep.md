[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / FormStep

# Interface: FormStep

Defined in: [packages/stentor-models/src/Form/FormStep.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L31)

A step is partial form. Fields plus next/prev/submit buttons as needed.
We are going through these "mini screens".

## Extended by

- [`FormStepIFrame`](FormStepIFrame.md)

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L32)

***

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:33](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L33)

***

### fields

> **fields**: [`FormField`](../type-aliases/FormField.md)[]

Defined in: [packages/stentor-models/src/Form/FormStep.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L37)

The fields that are part of the form.

***

### condition?

> `optional` **condition**: `string`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L39)

***

### nextAction?

> `optional` **nextAction**: `"next"` \| `"submit"` \| `"omit"`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L47)

The action to take when the user clicks the next button.

"next": move to the next step
"submit": force "Next" instead of "Submit" (server generated next step).
"omit": don't show the next button (for instance final "Thank you screen")

***

### previousAction?

> `optional` **previousAction**: `"submit"` \| `"omit"` \| `"previous"`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:55](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L55)

The action to take when the user clicks the previous button.

"previous": move to the previous step
"submit": force "Previous" instead of "Submit" (server generated previous step).
"omit": don't show the previous button (for instance first step)

***

### nextLabel?

> `optional` **nextLabel**: `string`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:59](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L59)

The label to use for the next button, defaults to "Next".

***

### previousLabel?

> `optional` **previousLabel**: `string`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:63](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L63)

The label to use for the previous button, defaults to "Previous".

***

### final?

> `optional` **final**: `boolean`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:67](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L67)

***

### crmSubmit?

> `optional` **crmSubmit**: `boolean`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:70](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L70)

***

### warnBeforeUnload?

> `optional` **warnBeforeUnload**: `boolean`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:82](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L82)

**`Beta`**

Warn the user before unloading the page if there are unsaved changes.

This is especially helpful when either crmSubmit is true or final is true,
to prevent users from accidentally losing their data.

This will trigger a browser dialog when the user attempts to close the tab or navigate away which does not work on all browsers.

 This is a beta feature and may change in future releases.

***

### warnBeforeUnloadMessage?

> `optional` **warnBeforeUnloadMessage**: `string`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:91](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L91)

**`Beta`**

Custom message to display in the unload warning dialog.  This is used when the use attempts to hit the 'X' button on the form when they have unsaved changes.

 This is a beta feature and may change in future releases.

Note: Most browsers do not display custom messages anymore, but having this
property allows for future compatibility and clarity.
