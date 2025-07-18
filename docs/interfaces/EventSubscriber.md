[@neuralinnovations/dataisland-sdk - v0.6.44](../../README.md) / [Exports](../modules.md) / EventSubscriber

# Interface: EventSubscriber\<EventType, DataType\>

## Type parameters

| Name |
| :------ |
| `EventType` |
| `DataType` |

## Implemented by

- [`EventDispatcher`](../classes/EventDispatcher.md)

## Table of contents

### Properties

- [subscribe](EventSubscriber.md#subscribe)

## Properties

### subscribe

• **subscribe**: (`callback`: (`event`: [`Event`](Event.md)\<`EventType`, `DataType`\>) => `void`, `type?`: `EventType`) => [`Disposable`](Disposable.md)

#### Type declaration

▸ (`callback`, `type?`): [`Disposable`](Disposable.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](Event.md)\<`EventType`, `DataType`\>) => `void` |
| `type?` | `EventType` |

##### Returns

[`Disposable`](Disposable.md)
