<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [stentor-models](./stentor-models.md) &gt; [HistoricalPath](./stentor-models.historicalpath.md)

## HistoricalPath interface

When compiled, it will move the user back to a previous handler they already visited.

It always calls the start() method of the historical handler.

<b>Signature:</b>

```typescript
export interface HistoricalPath extends SharedPath 
```
<b>Extends:</b> [SharedPath](./stentor-models.sharedpath.md)

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [historicalIndex](./stentor-models.historicalpath.historicalindex.md) | number | The number of handlers to go back into the history of.<!-- -->This is typically just one and can be no more than 10. |

