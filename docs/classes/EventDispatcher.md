[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / EventDispatcher

# Class: EventDispatcher\<EventType, DataType\>

## Type parameters

| Name |
| :------ |
| `EventType` |
| `DataType` |

## Hierarchy

- **`EventDispatcher`**

  ↳ [`Organizations`](Organizations.md)

  ↳ [`Workspaces`](Workspaces.md)

  ↳ [`Workspace`](Workspace.md)

  ↳ [`Group`](Group.md)

  ↳ [`Groups`](Groups.md)

  ↳ [`UserProfile`](UserProfile.md)

  ↳ [`Files`](Files.md)

  ↳ [`Chats`](Chats.md)

## Implements

- [`EventSubscriber`](../interfaces/EventSubscriber.md)\<`EventType`, `DataType`\>

## Table of contents

### Constructors

- [constructor](EventDispatcher.md#constructor)

### Properties

- [\_listeners](EventDispatcher.md#_listeners)

### Methods

- [dispatch](EventDispatcher.md#dispatch)
- [subscribe](EventDispatcher.md#subscribe)

## Constructors

### constructor

• **new EventDispatcher**\<`EventType`, `DataType`\>(): [`EventDispatcher`](EventDispatcher.md)\<`EventType`, `DataType`\>

#### Type parameters

| Name |
| :------ |
| `EventType` |
| `DataType` |

#### Returns

[`EventDispatcher`](EventDispatcher.md)\<`EventType`, `DataType`\>

## Properties

### \_listeners

• `Private` **\_listeners**: \{ `callback`: (`value`: [`Event`](../interfaces/Event.md)\<`EventType`, `DataType`\>) => `void` ; `disposable`: [`Disposable`](../interfaces/Disposable.md)  }[] = `[]`

#### Defined in

[events.ts:17](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L17)

## Methods

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<`EventType`, `DataType`\> |

#### Returns

`void`

#### Defined in

[events.ts:22](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L22)

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<`EventType`, `DataType`\>) => `void` |
| `type?` | `EventType` |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Implementation of

[EventSubscriber](../interfaces/EventSubscriber.md).[subscribe](../interfaces/EventSubscriber.md#subscribe)

#### Defined in

[events.ts:35](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L35)
