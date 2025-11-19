[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / FormStepIFrame

# Interface: FormStepIFrame

Defined in: [packages/stentor-models/src/Form/FormStep.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L7)

A step is partial form. Fields plus next/prev/submit buttons as needed.
We are going through these "mini screens".

## Extends

- [`FormStep`](FormStep.md)

## Properties

### iframe

> **iframe**: `object`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L11)

An iframe step is a form step that is rendered as an iframe.

#### src

> **src**: `string`

The source of the iframe.

#### width?

> `optional` **width**: `string`

Optional width, defaults to 100%

#### height?

> `optional` **height**: `string`

Optional height, defaults to 100%

***

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L32)

#### Inherited from

[`FormStep`](FormStep.md).[`name`](FormStep.md#name)

***

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:33](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L33)

#### Inherited from

[`FormStep`](FormStep.md).[`title`](FormStep.md#title)

***

### fields

> **fields**: [`FormField`](../type-aliases/FormField.md)[]

Defined in: [packages/stentor-models/src/Form/FormStep.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L37)

The fields that are part of the form.

#### Inherited from

[`FormStep`](FormStep.md).[`fields`](FormStep.md#fields)

***

### condition?

> `optional` **condition**: `string`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L39)

#### Inherited from

[`FormStep`](FormStep.md).[`condition`](FormStep.md#condition)

***

### nextAction?

> `optional` **nextAction**: `"next"` \| `"submit"` \| `"omit"`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L47)

The action to take when the user clicks the next button.

"next": move to the next step
"submit": force "Next" instead of "Submit" (server generated next step).
"omit": don't show the next button (for instance final "Thank you screen")

#### Inherited from

[`FormStep`](FormStep.md).[`nextAction`](FormStep.md#nextaction)

***

### previousAction?

> `optional` **previousAction**: `"submit"` \| `"omit"` \| `"previous"`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:55](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L55)

The action to take when the user clicks the previous button.

"previous": move to the previous step
"submit": force "Previous" instead of "Submit" (server generated previous step).
"omit": don't show the previous button (for instance first step)

#### Inherited from

[`FormStep`](FormStep.md).[`previousAction`](FormStep.md#previousaction)

***

### nextLabel?

> `optional` **nextLabel**: `string`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:59](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L59)

The label to use for the next button, defaults to "Next".

#### Inherited from

[`FormStep`](FormStep.md).[`nextLabel`](FormStep.md#nextlabel)

***

### previousLabel?

> `optional` **previousLabel**: `string`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:63](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L63)

The label to use for the previous button, defaults to "Previous".

#### Inherited from

[`FormStep`](FormStep.md).[`previousLabel`](FormStep.md#previouslabel)

***

### final?

> `optional` **final**: `boolean`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:67](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L67)

#### Inherited from

[`FormStep`](FormStep.md).[`final`](FormStep.md#final)

***

### crmSubmit?

> `optional` **crmSubmit**: `boolean`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:70](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L70)

#### Inherited from

[`FormStep`](FormStep.md).[`crmSubmit`](FormStep.md#crmsubmit)

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

#### Inherited from

[`FormStep`](FormStep.md).[`warnBeforeUnload`](FormStep.md#warnbeforeunload)

***

### warnBeforeUnloadMessage?

> `optional` **warnBeforeUnloadMessage**: `string`

Defined in: [packages/stentor-models/src/Form/FormStep.ts:91](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormStep.ts#L91)

**`Beta`**

Custom message to display in the unload warning dialog.  This is used when the use attempts to hit the 'X' button on the form when they have unsaved changes.

 This is a beta feature and may change in future releases.

Note: Most browsers do not display custom messages anymore, but having this
property allows for future compatibility and clarity.

#### Inherited from

[`FormStep`](FormStep.md).[`warnBeforeUnloadMessage`](FormStep.md#warnbeforeunloadmessage)
