<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [stentor-models](./stentor-models.md) &gt; [SimpleSegment](./stentor-models.simplesegment.md)

## SimpleSegment interface

Simple segment, just the segment that will replace the template.

<b>Signature:</b>

```typescript
export interface SimpleSegment extends Partial<Conditioned> 
```
<b>Extends:</b> Partial&lt;[Conditioned](./stentor-models.conditioned.md)<!-- -->&gt;

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [segment](./stentor-models.simplesegment.segment.md) | string \| [ResponseOutput](./stentor-models.responseoutput.md) | The segment replaces the template in the templated string.<!-- -->In the string "$<!-- -->{<!-- -->GREETING<!-- -->}<!-- -->, how are you?", the segment will replace $<!-- -->{<!-- -->GREETING<!-- -->}<!-- -->. |

