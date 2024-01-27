[@neuralinnovations/dataisland-sdk - v0.0.1-dev7](../../README.md) / [Exports](../modules.md) / Group

# Class: Group

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`GroupEvent`](../enums/GroupEvent.md), [`Group`](Group.md)\>

  ↳ **`Group`**

## Table of contents

### Constructors

- [constructor](Group.md#constructor)

### Accessors

- [group](Group.md#group)
- [id](Group.md#id)
- [members](Group.md#members)

### Methods

- [dispatch](Group.md#dispatch)
- [getWorkspaces](Group.md#getworkspaces)
- [setMembersIds](Group.md#setmembersids)
- [setName](Group.md#setname)
- [setPermits](Group.md#setpermits)
- [setWorkspaces](Group.md#setworkspaces)
- [subscribe](Group.md#subscribe)

## Constructors

### constructor

• **new Group**(): [`Group`](Group.md)

#### Returns

[`Group`](Group.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### group

• `get` **group**(): `AccessGroupDto`

#### Returns

`AccessGroupDto`

___

### id

• `get` **id**(): `string`

#### Returns

`string`

___

### members

• `get` **members**(): `UserDto`[]

#### Returns

`UserDto`[]

## Methods

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`GroupEvent`](../enums/GroupEvent.md), [`Group`](Group.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### getWorkspaces

▸ **getWorkspaces**(): `Promise`\<`WorkspaceDto`[]\>

#### Returns

`Promise`\<`WorkspaceDto`[]\>

___

### setMembersIds

▸ **setMembersIds**(`members`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `members` | `string`[] |

#### Returns

`Promise`\<`void`\>

___

### setName

▸ **setName**(`name`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<`void`\>

___

### setPermits

▸ **setPermits**(`permits`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `permits` | `Object` |
| `permits.isAdmin` | `boolean` |

#### Returns

`Promise`\<`void`\>

___

### setWorkspaces

▸ **setWorkspaces**(`workspaces`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspaces` | `string`[] |

#### Returns

`Promise`\<`void`\>

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`GroupEvent`](../enums/GroupEvent.md), [`Group`](Group.md)\>) => `void` |
| `type?` | [`GroupEvent`](../enums/GroupEvent.md) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)