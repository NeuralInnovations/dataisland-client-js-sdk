[@neuralinnovations/dataisland-sdk - v0.0.1-dev31](../../README.md) / [Exports](../modules.md) / Chat

# Class: Chat

## Table of contents

### Constructors

- [constructor](Chat.md#constructor)

### Accessors

- [collection](Chat.md#collection)
- [fileId](Chat.md#fileid)
- [id](Chat.md#id)
- [name](Chat.md#name)
- [organization](Chat.md#organization)

### Methods

- [ask](Chat.md#ask)
- [getAnswer](Chat.md#getanswer)

## Constructors

### constructor

• **new Chat**(): [`Chat`](Chat.md)

#### Returns

[`Chat`](Chat.md)

## Accessors

### collection

• `get` **collection**(): readonly [`Answer`](Answer.md)[]

Answers list.

#### Returns

readonly [`Answer`](Answer.md)[]

___

### fileId

• `get` **fileId**(): `string`

Connected file ID.

#### Returns

`string`

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

▸ **ask**(`message`, `answerType`): `Promise`\<[`Answer`](Answer.md)\>

Ask new question in chat.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `answerType` | [`ChatAnswerType`](../enums/ChatAnswerType.md) |

#### Returns

`Promise`\<[`Answer`](Answer.md)\>

___

### getAnswer

▸ **getAnswer**(`id`): [`Answer`](Answer.md)

Get answer by id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | answer id |

#### Returns

[`Answer`](Answer.md)
