# stentor-service-event/src

## Classes

- [AbstractEventStream](classes/AbstractEventStream.md)
- [ConsoleStream](classes/ConsoleStream.md)
- [EventService](classes/EventService.md)
- [FirehoseStream](classes/FirehoseStream.md)
- [KinesisStream](classes/KinesisStream.md)
- [SNSStream](classes/SNSStream.md)

## Interfaces

- [EventPrefix](interfaces/EventPrefix.md)
- [EventServiceProps](interfaces/EventServiceProps.md)
- [KinesisStreamProps](interfaces/KinesisStreamProps.md)

## Type Aliases

- [PrefixType](type-aliases/PrefixType.md)
- [PrefixFunction](type-aliases/PrefixFunction.md)
- [Prefix](type-aliases/Prefix.md)
- [PartitionKeyGenerator](type-aliases/PartitionKeyGenerator.md)

## Variables

- [ANALYTICS\_EVENT\_TYPE](variables/ANALYTICS_EVENT_TYPE.md)
- [ERROR\_EVENT\_TYPE](variables/ERROR_EVENT_TYPE.md)
- [LAMBDA\_FAILURE\_EVENT\_TYPE](variables/LAMBDA_FAILURE_EVENT_TYPE.md)
- [LAMBDA\_SUCCESS\_EVENT\_TYPE](variables/LAMBDA_SUCCESS_EVENT_TYPE.md)
- [MESSAGE\_EVENT\_TYPE](variables/MESSAGE_EVENT_TYPE.md)
- [REQUEST\_EVENT\_TYPE](variables/REQUEST_EVENT_TYPE.md)

## Functions

- [wrapCallback](functions/wrapCallback.md)
- [isPrefixFunction](functions/isPrefixFunction.md)
- [staticPartitionGenerator](functions/staticPartitionGenerator.md)
- [randomPartitionKeyGenerator](functions/randomPartitionKeyGenerator.md)
