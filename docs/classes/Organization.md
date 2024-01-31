[@neuralinnovations/dataisland-sdk - v0.0.1-dev10](../../README.md) / [Exports](../modules.md) / Organization

# Class: Organization

Organization.

## Table of contents

### Constructors

- [constructor](Organization.md#constructor)

### Accessors

- [accessGroups](Organization.md#accessgroups)
- [chats](Organization.md#chats)
- [description](Organization.md#description)
- [id](Organization.md#id)
- [name](Organization.md#name)
- [workspaces](Organization.md#workspaces)

### Methods

- [createInviteLink](Organization.md#createinvitelink)

## Constructors

### constructor

• **new Organization**(): [`Organization`](Organization.md)

#### Returns

[`Organization`](Organization.md)

## Accessors

### accessGroups

• `get` **accessGroups**(): [`Groups`](Groups.md)

Groups.

#### Returns

[`Groups`](Groups.md)

___

### chats

• `get` **chats**(): [`Chats`](Chats.md)

Chats.

#### Returns

[`Chats`](Chats.md)

___

### description

• `get` **description**(): `string`

Organization description.

#### Returns

`string`

___

### id

• `get` **id**(): `string`

Organization id.

#### Returns

`string`

___

### name

• `get` **name**(): `string`

Organization name.

#### Returns

`string`

___

### workspaces

• `get` **workspaces**(): [`Workspaces`](Workspaces.md)

Workspaces.

#### Returns

[`Workspaces`](Workspaces.md)

## Methods

### createInviteLink

▸ **createInviteLink**(`emails`, `accessGroups`): `Promise`\<`void`\>

Create invite link

#### Parameters

| Name | Type |
| :------ | :------ |
| `emails` | `string`[] |
| `accessGroups` | `string`[] |

#### Returns

`Promise`\<`void`\>
