[@neuralinnovations/dataisland-sdk - v0.0.1-dev15](../../README.md) / [Exports](../modules.md) / Chat

# Class: Chat

## Table of contents

### Constructors

- [constructor](Chat.md#constructor)

### Accessors

- [collection](Chat.md#collection)
- [id](Chat.md#id)
- [name](Chat.md#name)
- [organization](Chat.md#organization)

### Methods

- [ask](Chat.md#ask)

## Constructors

### constructor

• **new Chat**(): [`Chat`](Chat.md)

#### Returns

[`Chat`](Chat.md)

## Accessors

### collection

• `get` **collection**(): readonly `Answer`[]

Answers list.

#### Returns

readonly `Answer`[]

___

### id

• `get` **id**(): `string`

Chat id.

#### Returns

`string`

___

### name

• `get` **name**(): `string`

Chat name.

#### Returns

`string`

___

### organization

• `get` **organization**(): [`Organization`](Organization.md)

Organization.

#### Returns

[`Organization`](Organization.md)

## Methods

### ask

▸ **ask**(`message`, `answerType`): `Promise`\<`Answer`\>

Ask new question in chat.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `answerType` | [`ChatAnswerType`](../enums/ChatAnswerType.md) |

#### Returns

`Promise`\<`Answer`\>
