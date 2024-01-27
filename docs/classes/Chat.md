[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / Chat

# Class: Chat

## Table of contents

### Constructors

- [constructor](Chat.md#constructor)

### Accessors

- [id](Chat.md#id)
- [name](Chat.md#name)

### Methods

- [question](Chat.md#question)

## Constructors

### constructor

• **new Chat**(): [`Chat`](Chat.md)

#### Returns

[`Chat`](Chat.md)

## Accessors

### id

• `get` **id**(): `string`

Chat id.

#### Returns

`string`

#### Defined in

[storages/chat.ts:12](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/chat.ts#L12)

___

### name

• `get` **name**(): `string`

Chat name.

#### Returns

`string`

#### Defined in

[storages/chat.ts:17](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/chat.ts#L17)

## Methods

### question

▸ **question**(`message`, `answer?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `answer?` | [`ChatAnswer`](../enums/ChatAnswer.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[storages/chat.ts:19](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/chat.ts#L19)
