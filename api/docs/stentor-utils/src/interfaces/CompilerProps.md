[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / CompilerProps

# Interface: CompilerProps

Defined in: [packages/stentor-utils/src/compilers/compiler.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compiler.ts#L22)

## Properties

### replaceWhenUndefined?

> `readonly` `optional` **replaceWhenUndefined**: `boolean`

Defined in: [packages/stentor-utils/src/compilers/compiler.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compiler.ts#L29)

When true, it will replace the ${foo} with undefined or null if the value for `foo` cannot be found.  Default behavior will leave ${foo} if it does not have a value.

A caveat to this is when the `foo` is in a string such as `"${foo}"` then it will replace it with an empty string instead of undefined, thus "" instead of "undefined".  The reason for this
is "" is falsey and "undefined" is not.  If you are doing string comparisons then this will be a problem.

***

### macros?

> `readonly` `optional` **macros**: [`MacroMap`](MacroMap.md)

Defined in: [packages/stentor-utils/src/compilers/compiler.ts:42](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compiler.ts#L42)

When provided it overrides the DEFAULT_MACROS and are used when compiling the templates.

You can include the DEFAULT_MACROS if you include them:

```ts
macros: {
   ...DEFAULT_MACROS,
   ...myMacros
}
```

***

### additionalContext?

> `readonly` `optional` **additionalContext**: `Record`\<`string`, `unknown`\>

Defined in: [packages/stentor-utils/src/compilers/compiler.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compiler.ts#L47)

When provided, the additional context will be used when compiling the templates.  This is an opportunity to inject
more information beyond the provided request and context objects.
