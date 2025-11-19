[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / compileSlotValues

# ~~Function: compileSlotValues()~~

## Call Signature

> **compileSlotValues**(`responseOutput`, `slots`, `replaceWhenUndefined?`, `macros?`): `string`

Defined in: [packages/stentor-utils/src/compilers/compileSlotValues.ts:111](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compileSlotValues.ts#L111)

Compiles a templated response with slot values from the
provided slot map.

For example, when passed "What date do you want your ${flowers}?"
and the slot map contains a slot with name `flowers` it will replace
it with the value.

It will handle the different potential value types for slots such as
strings, numbers, dates and durations.

By default, if the slot value does not exist, the template value is left untouched.

### Parameters

#### responseOutput

`string`

#### slots

[`RequestSlotMap`](../../../stentor/src/interfaces/RequestSlotMap.md)

#### replaceWhenUndefined?

`boolean`

When set to true, it will replace the value with 'undefined' if it doesn't exist, default behavior is to leave the template as is.

#### macros?

[`MacroMap`](../interfaces/MacroMap.md)

### Returns

`string`

### Deprecated

Use class Compiler, which handles both JSONPaths & Slots

## Call Signature

> **compileSlotValues**(`responseOutput`, `slots`, `replaceWhenUndefined?`, `macros?`): [`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

Defined in: [packages/stentor-utils/src/compilers/compileSlotValues.ts:112](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compileSlotValues.ts#L112)

Compiles a templated response with slot values from the
provided slot map.

For example, when passed "What date do you want your ${flowers}?"
and the slot map contains a slot with name `flowers` it will replace
it with the value.

It will handle the different potential value types for slots such as
strings, numbers, dates and durations.

By default, if the slot value does not exist, the template value is left untouched.

### Parameters

#### responseOutput

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

#### slots

[`RequestSlotMap`](../../../stentor/src/interfaces/RequestSlotMap.md)

#### replaceWhenUndefined?

`boolean`

When set to true, it will replace the value with 'undefined' if it doesn't exist, default behavior is to leave the template as is.

#### macros?

[`MacroMap`](../interfaces/MacroMap.md)

### Returns

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

### Deprecated

Use class Compiler, which handles both JSONPaths & Slots
