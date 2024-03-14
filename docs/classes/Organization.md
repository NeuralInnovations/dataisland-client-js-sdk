[@neuralinnovations/dataisland-sdk - v0.0.1-dev29](../../README.md) / [Exports](../modules.md) / Organization

# Class: Organization

Organization.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`OrganizationEvent`](../enums/OrganizationEvent.md), [`Organization`](Organization.md)\>

  ↳ **`Organization`**

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

- [change](Organization.md#change)
- [createInviteLink](Organization.md#createinvitelink)
- [dispatch](Organization.md#dispatch)
- [members](Organization.md#members)
- [subscribe](Organization.md#subscribe)

## Constructors

### constructor

• **new Organization**(): [`Organization`](Organization.md)

#### Returns

[`Organization`](Organization.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

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

### change

▸ **change**(`name`, `description`): `Promise`\<`void`\>

Change organization name and description.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |

#### Returns

`Promise`\<`void`\>

___

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

___

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`CHANGED`](../enums/OrganizationEvent.md#changed), [`Organization`](Organization.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### members

▸ **members**(): `Promise`\<[`UserDto`](../interfaces/UserDto.md)[]\>

Get organization members

#### Returns

`Promise`\<[`UserDto`](../interfaces/UserDto.md)[]\>

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`CHANGED`](../enums/OrganizationEvent.md#changed), [`Organization`](Organization.md)\>) => `void` |
| `type?` | [`CHANGED`](../enums/OrganizationEvent.md#changed) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)
