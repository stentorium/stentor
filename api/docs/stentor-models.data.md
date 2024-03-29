<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [stentor-models](./stentor-models.md) &gt; [Data](./stentor-models.data.md)

## Data interface

Base data object for all the handlers

<b>Signature:</b>

```typescript
export interface Data 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [accessibleThroughDiscovery?](./stentor-models.data.accessiblethroughdiscovery.md) | boolean | <i>(Optional)</i> Is the handler available externally through discovery.<!-- -->On Google it means this accessible through Discovery (see [https://developers.google.com/actions/sdk/invocation-and-discovery\#discovery](https://developers.google.com/actions/sdk/invocation-and-discovery#discovery)<!-- -->) and on Alexa CanfulfillIntentRequest (see [https://developer.amazon.com/docs/custom-skills/understand-name-free-interaction-for-custom-skills.html](https://developer.amazon.com/docs/custom-skills/understand-name-free-interaction-for-custom-skills.html)<!-- -->) |
|  [inputUnknownStrategy?](./stentor-models.data.inputunknownstrategy.md) | [InputUnknownStrategyGlobal](./stentor-models.inputunknownstrategyglobal.md) \| [InputUnknownStrategyGoogle](./stentor-models.inputunknownstrategygoogle.md) \| [InputUnknownStrategyReprompt](./stentor-models.inputunknownstrategyreprompt.md) | <i>(Optional)</i> Strategy to use when the handler receives an InputUnknown request.<!-- -->Global requests the global InputUnknownHandler Google's recommended pattern as outlined here: https://designguidelines.withgoogle.com/conversation/conversational-components/errors.html Reprompt uses the reprompt from the previous response. |

