[@neuralinnovations/dataisland-sdk - v0.0.1-dev35](../../README.md) / [Exports](../modules.md) / Workspaces

# Class: Workspaces

Organization's workspaces.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`WorkspacesEvent`](../enums/WorkspacesEvent.md), [`Workspace`](Workspace.md)\>

  ↳ **`Workspaces`**

## Table of contents

### Constructors

- [constructor](Workspaces.md#constructor)

### Accessors

- [collection](Workspaces.md#collection)

### Methods

- [contains](Workspaces.md#contains)
- [create](Workspaces.md#create)
- [delete](Workspaces.md#delete)
- [dispatch](Workspaces.md#dispatch)
- [get](Workspaces.md#get)
- [subscribe](Workspaces.md#subscribe)
- [tryGet](Workspaces.md#tryget)

## Constructors

### constructor

• **new Workspaces**(): [`Workspaces`](Workspaces.md)

#### Returns

[`Workspaces`](Workspaces.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### collection

• `get` **collection**(): readonly [`Workspace`](Workspace.md)[]

Workspaces.

#### Returns

readonly [`Workspace`](Workspace.md)[]

## Methods

### contains

▸ **contains**(`id`): `boolean`

Check if workspace exists.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

___

### create

▸ **create**(`name`, `description`, `regulation?`): `Promise`\<`undefined` \| [`Workspace`](Workspace.md)\>

Create workspace.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |
| `regulation?` | `Object` |
| `regulation.groupIds` | `string`[] |
| `regulation.isCreateNewGroup` | `boolean` |
| `regulation.newGroupName` | `string` |

#### Returns

`Promise`\<`undefined` \| [`Workspace`](Workspace.md)\>

___

### delete

▸ **delete**(`id`): `Promise`\<`void`\>

Delete workspace.

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
| `input` | [`Input`](../interfaces/Input.md)\<[`WorkspacesEvent`](../enums/WorkspacesEvent.md), [`Workspace`](Workspace.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### get

▸ **get**(`id`): [`Workspace`](Workspace.md)

Get workspace by id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`Workspace`](Workspace.md)

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`WorkspacesEvent`](../enums/WorkspacesEvent.md), [`Workspace`](Workspace.md)\>) => `void` |
| `type?` | [`WorkspacesEvent`](../enums/WorkspacesEvent.md) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)

___

### tryGet

▸ **tryGet**(`id`): `undefined` \| [`Workspace`](Workspace.md)

Try to get workspace by id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| [`Workspace`](Workspace.md)
