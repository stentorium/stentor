<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [stentor-utils](./stentor-utils.md) &gt; [wordToNumber](./stentor-utils.wordtonumber.md)

## wordToNumber() function

Converts a word like "one hundred" to the number 100.

Words that are not numbers are passed through.

<b>Signature:</b>

```typescript
export declare function wordToNumber(word: string): number | string;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  word | string | Word to convert to a number |

<b>Returns:</b>

number \| string

Returns either the original value or the number that was converted.

