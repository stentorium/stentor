<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [stentor-utils](./stentor-utils.md) &gt; [getDateTimeFrom](./stentor-utils.getdatetimefrom.md)

## getDateTimeFrom() function

From a Dialogflow style ISO-8601 time string: "2019-06-05T12:00:00-04:00", it pulls out the date and the time.

<b>Signature:</b>

```typescript
export declare function getDateTimeFrom(date: string | Date, includeOnly?: "time" | "date"): DateTime | undefined;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  date | string \| Date |  |
|  includeOnly | "time" \| "date" |  |

<b>Returns:</b>

[DateTime](./stentor-models.datetime.md) \| undefined

A DateTime object based on the provided parameters

