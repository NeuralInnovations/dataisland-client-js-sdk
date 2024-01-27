[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / Group

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

#### Defined in

[storages/groups.ts:19](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/groups.ts#L19)

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Defined in

[storages/groups.ts:17](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/groups.ts#L17)

___

### members

• `get` **members**(): `UserDto`[]

#### Returns

`UserDto`[]

#### Defined in

[storages/groups.ts:21](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/groups.ts#L21)

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

#### Defined in

[events.ts:22](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L22)

___

### getWorkspaces

▸ **getWorkspaces**(): `Promise`\<`WorkspaceDto`[]\>

#### Returns

`Promise`\<`WorkspaceDto`[]\>

#### Defined in

[storages/groups.ts:23](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/groups.ts#L23)

___

### setMembersIds

▸ **setMembersIds**(`members`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `members` | `string`[] |

#### Returns

`Promise`\<`void`\>

#### Defined in

[storages/groups.ts:31](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/groups.ts#L31)

___

### setName

▸ **setName**(`name`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[storages/groups.ts:27](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/groups.ts#L27)

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

#### Defined in

[storages/groups.ts:29](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/groups.ts#L29)

___

### setWorkspaces

▸ **setWorkspaces**(`workspaces`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspaces` | `string`[] |

#### Returns

`Promise`\<`void`\>

#### Defined in

[storages/groups.ts:25](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/groups.ts#L25)

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

#### Defined in

[events.ts:35](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L35)
