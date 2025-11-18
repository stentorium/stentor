[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / compileJSONPaths

# ~~Function: compileJSONPaths()~~

## Call Signature

> **compileJSONPaths**(`responseOutput`, `object`, `replaceWhenUndefined?`): `string`

Defined in: [packages/stentor-utils/src/compilers/compileJSONPaths.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compileJSONPaths.ts#L37)

Compiles all instances of a template with the provided string by looking
up the JSON path within the provided object.

For example, when passed "${greeting} ${foo.name}, how are you?" and
{ greeting: "Hello", foo: {name: "Bob" }} will be compiled to "Hello Bob, how are you?"

### Parameters

#### responseOutput

`string`

#### object

`object`

#### replaceWhenUndefined?

`boolean`

### Returns

`string`

### Deprecated

Use class Compiler, which handles both JSONPaths & Slots

## Call Signature

> **compileJSONPaths**(`responseOutput`, `object`, `replaceWhenUndefined?`): [`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

Defined in: [packages/stentor-utils/src/compilers/compileJSONPaths.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/compilers/compileJSONPaths.ts#L38)

Compiles all instances of a template with the provided string by looking
up the JSON path within the provided object.

For example, when passed "${greeting} ${foo.name}, how are you?" and
{ greeting: "Hello", foo: {name: "Bob" }} will be compiled to "Hello Bob, how are you?"

### Parameters

#### responseOutput

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

#### object

`object`

#### replaceWhenUndefined?

`boolean`

### Returns

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

### Deprecated

Use class Compiler, which handles both JSONPaths & Slots
