[@neuralinnovations/dataisland-sdk - v0.4.2](../../README.md) / [Exports](../modules.md) / Chat

# Class: Chat

## Table of contents

### Constructors

- [constructor](Chat.md#constructor)

### Accessors

- [clientContext](Chat.md#clientcontext)
- [collection](Chat.md#collection)
- [createAt](Chat.md#createat)
- [id](Chat.md#id)
- [model](Chat.md#model)
- [modifiedAt](Chat.md#modifiedat)
- [name](Chat.md#name)
- [organization](Chat.md#organization)
- [resource](Chat.md#resource)

### Methods

- [ask](Chat.md#ask)
- [getAnswer](Chat.md#getanswer)
- [update](Chat.md#update)

## Constructors

### constructor

• **new Chat**(): [`Chat`](Chat.md)

#### Returns

[`Chat`](Chat.md)

## Accessors

### clientContext

• `get` **clientContext**(): `string`

Added client context.

#### Returns

`string`

___

### collection

• `get` **collection**(): readonly [`Answer`](Answer.md)[]

Answers list.

#### Returns

readonly [`Answer`](Answer.md)[]

___

### createAt

• `get` **createAt**(): `number`

CreateAt.

#### Returns

`number`

___

### id

• `get` **id**(): `string`

Chat id.

#### Returns

`string`

___

### model

• `get` **model**(): `string`

Model.

#### Returns

`string`

___

### modifiedAt

• `get` **modifiedAt**(): `number`

Modified at.

#### Returns

`number`

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

___

### resource

• `get` **resource**(): [`ChatResourceDto`](../interfaces/ChatResourceDto.md)

Chat resource info : type ChatType, related entities Ids.

#### Returns

[`ChatResourceDto`](../interfaces/ChatResourceDto.md)

## Methods

### ask

▸ **ask**(`message`, `answerType`): `Promise`\<`undefined` \| [`Answer`](Answer.md)\>

Ask new question in chat.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `answerType` | [`ChatAnswerType`](../enums/ChatAnswerType.md) |

#### Returns

`Promise`\<`undefined` \| [`Answer`](Answer.md)\>

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

___

### update

▸ **update**(): `Promise`\<`void`\>

Update chat

#### Returns

`Promise`\<`void`\>
