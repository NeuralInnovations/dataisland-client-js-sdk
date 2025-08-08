[@neuralinnovations/dataisland-sdk - v0.6.48](../../README.md) / [Exports](../modules.md) / EventDispatcher

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

  ↳ [`File`](File.md)

  ↳ [`Files`](Files.md)

  ↳ [`Group`](Group.md)

  ↳ [`Answer`](Answer.md)

  ↳ [`Chats`](Chats.md)

  ↳ [`Groups`](Groups.md)

  ↳ [`Organization`](Organization.md)

  ↳ [`UserProfile`](UserProfile.md)

  ↳ [`Workspace`](Workspace.md)

  ↳ [`QueryFlow`](QueryFlow.md)

  ↳ [`QueryFlows`](QueryFlows.md)

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

## Methods

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<`EventType`, `DataType`\> |

#### Returns

`void`

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
