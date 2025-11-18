[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-locales/src](../README.md) / Omit

# Type Alias: Omit\<T, K\>

> **Omit**\<`T`, `K`\> = `Pick`\<`T`, `Exclude`\<keyof `T`, `K`\>\>

Defined in: [packages/stentor-locales/src/localize.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-locales/src/localize.ts#L22)

Allows one to omit certain keys in the interface.

Example:

interface First {
   param1: string;
   param2: string;
   param3: string;
}

type Second = Omit<First, "param2">

let second: Second = { param1: "Hello", param3: "World" };
second.param2 = "There"; // Compile error.

## Type Parameters

### T

`T` *extends* `object`

### K

`K` *extends* keyof `T`
