[@neuralinnovations/dataisland-sdk - v0.0.1-dev87](../../README.md) / [Exports](../modules.md) / Group

# Class: Group

Group.

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
- [workspaces](Group.md#workspaces)

### Methods

- [dispatch](Group.md#dispatch)
- [removeMembers](Group.md#removemembers)
- [removeWorkspaces](Group.md#removeworkspaces)
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

• `get` **group**(): [`AccessGroupDto`](../interfaces/AccessGroupDto.md)

Group information.

#### Returns

[`AccessGroupDto`](../interfaces/AccessGroupDto.md)

___

### id

• `get` **id**(): `string`

Group id.

#### Returns

`string`

___

### members

• `get` **members**(): [`UserDto`](../interfaces/UserDto.md)[]

Group members.

#### Returns

[`UserDto`](../interfaces/UserDto.md)[]

___

### workspaces

• `get` **workspaces**(): readonly [`Workspace`](Workspace.md)[]

Group workspaces.

#### Returns

readonly [`Workspace`](Workspace.md)[]

## Methods

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`UPDATED`](../enums/GroupEvent.md#updated), [`Group`](Group.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### removeMembers

▸ **removeMembers**(`members`): `Promise`\<`void`\>

Remove members.

#### Parameters

| Name | Type |
| :------ | :------ |
| `members` | `string`[] |

#### Returns

`Promise`\<`void`\>

___

### removeWorkspaces

▸ **removeWorkspaces**(`workspaces`): `Promise`\<`void`\>

Remove workspaces.

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspaces` | `string`[] |

#### Returns

`Promise`\<`void`\>

___

### setMembersIds

▸ **setMembersIds**(`members`): `Promise`\<`void`\>

Set members.

#### Parameters

| Name | Type |
| :------ | :------ |
| `members` | `string`[] |

#### Returns

`Promise`\<`void`\>

___

### setName

▸ **setName**(`name`): `Promise`\<`void`\>

Set name.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<`void`\>

___

### setPermits

▸ **setPermits**(`permits`): `Promise`\<`void`\>

Set permits.

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

Set workspaces.

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
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`UPDATED`](../enums/GroupEvent.md#updated), [`Group`](Group.md)\>) => `void` |
| `type?` | [`UPDATED`](../enums/GroupEvent.md#updated) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)
