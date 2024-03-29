<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [stentor-utils](./stentor-utils.md) &gt; [maskPhoneNumbers](./stentor-utils.maskphonenumbers.md)

## maskPhoneNumbers() function

Detects the phone numbers within a string and masks the numbers with \#s, preserving the formatting.

<b>Signature:</b>

```typescript
export declare function maskPhoneNumbers(str: string, partial?: boolean): string;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  str | string | The string containing phone numbers. |
|  partial | boolean | Defaults to false. When true it keeps the last four digits of the number |

<b>Returns:</b>

string

String with phone numbers masked.

