<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [stentor-models](./stentor-models.md) &gt; [ConditionalCheck](./stentor-models.conditionalcheck.md) &gt; [functions](./stentor-models.conditionalcheck.functions.md)

## ConditionalCheck.functions property

A set of functions that help determination within a string.

For example, for a time based conditional check, you can provide a function:

shedule(startTime: string, duration: number, timezone: string): boolean

which turns true if the current time is within the provided parameters.

<b>Signature:</b>

```typescript
functions: ((...args: any) => boolean)[];
```
