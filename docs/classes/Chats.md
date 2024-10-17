[@neuralinnovations/dataisland-sdk - v0.1.0](../../README.md) / [Exports](../modules.md) / Chats

# Class: Chats

Chats storage.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`ChatsEvent`](../enums/ChatsEvent.md), [`Chat`](Chat.md)\>

  ↳ **`Chats`**

## Table of contents

### Constructors

- [constructor](Chats.md#constructor)

### Accessors

- [collection](Chats.md#collection)
- [organization](Chats.md#organization)

### Methods

- [create](Chats.md#create)
- [createWithFile](Chats.md#createwithfile)
- [createWithLibraryFile](Chats.md#createwithlibraryfile)
- [createWithLibraryFolder](Chats.md#createwithlibraryfolder)
- [createWithWorkspace](Chats.md#createwithworkspace)
- [delete](Chats.md#delete)
- [dispatch](Chats.md#dispatch)
- [get](Chats.md#get)
- [subscribe](Chats.md#subscribe)
- [tryGet](Chats.md#tryget)

## Constructors

### constructor

• **new Chats**(): [`Chats`](Chats.md)

#### Returns

[`Chats`](Chats.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### collection

• `get` **collection**(): readonly [`Chat`](Chat.md)[]

Chats list.

#### Returns

readonly [`Chat`](Chat.md)[]

___

### organization

• `get` **organization**(): [`Organization`](Organization.md)

Organization.

#### Returns

[`Organization`](Organization.md)

## Methods

### create

▸ **create**(`model`, `clientContext`): `Promise`\<`undefined` \| [`Chat`](Chat.md)\>

Create new chat.

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `string` |
| `clientContext` | `string` |

#### Returns

`Promise`\<`undefined` \| [`Chat`](Chat.md)\>

___

### createWithFile

▸ **createWithFile**(`fileId`): `Promise`\<`undefined` \| [`Chat`](Chat.md)\>

Create chat with specific file

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileId` | `string` |

#### Returns

`Promise`\<`undefined` \| [`Chat`](Chat.md)\>

___

### createWithLibraryFile

▸ **createWithLibraryFile**(`libraryId`, `fileId`): `Promise`\<`undefined` \| [`Chat`](Chat.md)\>

Create chat with library file

#### Parameters

| Name | Type |
| :------ | :------ |
| `libraryId` | `string` |
| `fileId` | `string` |

#### Returns

`Promise`\<`undefined` \| [`Chat`](Chat.md)\>

___

### createWithLibraryFolder

▸ **createWithLibraryFolder**(`libraryId`, `folderIds`): `Promise`\<`undefined` \| [`Chat`](Chat.md)\>

Create chat with library folders

#### Parameters

| Name | Type |
| :------ | :------ |
| `libraryId` | `string` |
| `folderIds` | `string`[] |

#### Returns

`Promise`\<`undefined` \| [`Chat`](Chat.md)\>

___

### createWithWorkspace

▸ **createWithWorkspace**(`workspaceIds`, `clientContext`): `Promise`\<`undefined` \| [`Chat`](Chat.md)\>

Create chat with specific workspace

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspaceIds` | `string`[] |
| `clientContext` | `string` |

#### Returns

`Promise`\<`undefined` \| [`Chat`](Chat.md)\>

___

### delete

▸ **delete**(`id`): `Promise`\<`void`\>

Delete chat.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`void`\>

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

___

### get

▸ **get**(`id`): [`Chat`](Chat.md)

Get chat by id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`Chat`](Chat.md)

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

___

### tryGet

▸ **tryGet**(`id`): `undefined` \| [`Chat`](Chat.md)

Try to get chat by id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| [`Chat`](Chat.md)
