[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / Compiler

# Class: Compiler

Defined in: [packages/stentor-utils/src/compilers/compiler.ts:56](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compiler.ts#L56)

Compiles the templated response based on the provided request and context with some configurability.

You can provide custom macros that can be used to modify the templated response and also additional context
that will be used as possible replacements.

## Implements

- [`CompilerProps`](../interfaces/CompilerProps.md)

## Constructors

### Constructor

> **new Compiler**(`props?`): `Compiler`

Defined in: [packages/stentor-utils/src/compilers/compiler.ts:64](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compiler.ts#L64)

#### Parameters

##### props?

[`CompilerProps`](../interfaces/CompilerProps.md)

#### Returns

`Compiler`

## Properties

### replaceWhenUndefined?

> `readonly` `optional` **replaceWhenUndefined**: `boolean`

Defined in: [packages/stentor-utils/src/compilers/compiler.ts:58](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compiler.ts#L58)

When true, it will replace the ${foo} with undefined or null if the value for `foo` cannot be found.  Default behavior will leave ${foo} if it does not have a value.

A caveat to this is when the `foo` is in a string such as `"${foo}"` then it will replace it with an empty string instead of undefined, thus "" instead of "undefined".  The reason for this
is "" is falsey and "undefined" is not.  If you are doing string comparisons then this will be a problem.

#### Implementation of

[`CompilerProps`](../interfaces/CompilerProps.md).[`replaceWhenUndefined`](../interfaces/CompilerProps.md#replacewhenundefined)

***

### macros?

> `readonly` `optional` **macros**: [`MacroMap`](../interfaces/MacroMap.md)

Defined in: [packages/stentor-utils/src/compilers/compiler.ts:60](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compiler.ts#L60)

When provided it overrides the DEFAULT_MACROS and are used when compiling the templates.

You can include the DEFAULT_MACROS if you include them:

```ts
macros: {
   ...DEFAULT_MACROS,
   ...myMacros
}
```

#### Implementation of

[`CompilerProps`](../interfaces/CompilerProps.md).[`macros`](../interfaces/CompilerProps.md#macros)

***

### additionalContext?

> `readonly` `optional` **additionalContext**: `Record`\<`string`, `unknown`\> = `{}`

Defined in: [packages/stentor-utils/src/compilers/compiler.ts:62](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compiler.ts#L62)

When provided, the additional context will be used when compiling the templates.  This is an opportunity to inject
more information beyond the provided request and context objects.

#### Implementation of

[`CompilerProps`](../interfaces/CompilerProps.md).[`additionalContext`](../interfaces/CompilerProps.md#additionalcontext)

## Methods

### compile()

#### Call Signature

> **compile**(`input`, `request`, `context`): `string`

Defined in: [packages/stentor-utils/src/compilers/compiler.ts:259](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compiler.ts#L259)

Compiles the provided response output or string based on the provided request and context.

It is used for compiling conditions on a response or injecting variables into responses.

##### Parameters

###### input

`string`

Either a string or a set of responses.

###### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

The request

###### context

[`Context`](../../../stentor/src/interfaces/Context.md)

Context object

##### Returns

`string`

#### Call Signature

> **compile**(`input`, `request`, `context`): [`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

Defined in: [packages/stentor-utils/src/compilers/compiler.ts:260](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compiler.ts#L260)

Compiles the provided response output or string based on the provided request and context.

It is used for compiling conditions on a response or injecting variables into responses.

##### Parameters

###### input

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

Either a string or a set of responses.

###### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

The request

###### context

[`Context`](../../../stentor/src/interfaces/Context.md)

Context object

##### Returns

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)
