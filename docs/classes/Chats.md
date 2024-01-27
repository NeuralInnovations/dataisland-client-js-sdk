[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / Chats

# Class: Chats

Chats storage.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`ChatsEvent`](../enums/ChatsEvent.md), [`Chat`](Chat.md)\>

  ↳ **`Chats`**

## Table of contents

### Constructors

- [constructor](Chats.md#constructor)

### Methods

- [create](Chats.md#create)
- [dispatch](Chats.md#dispatch)
- [subscribe](Chats.md#subscribe)

## Constructors

### constructor

• **new Chats**(): [`Chats`](Chats.md)

#### Returns

[`Chats`](Chats.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Methods

### create

▸ **create**(): `Promise`\<[`Chat`](Chat.md)\>

Create new chat.

#### Returns

`Promise`\<[`Chat`](Chat.md)\>

#### Defined in

[storages/chats.ts:16](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/chats.ts#L16)

___

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`ChatsEvent`](../enums/ChatsEvent.md), [`Chat`](Chat.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

#### Defined in

[events.ts:22](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L22)

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`ChatsEvent`](../enums/ChatsEvent.md), [`Chat`](Chat.md)\>) => `void` |
| `type?` | [`ChatsEvent`](../enums/ChatsEvent.md) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)

#### Defined in

[events.ts:35](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L35)
