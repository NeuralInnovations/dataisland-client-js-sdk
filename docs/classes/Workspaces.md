[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / Workspaces

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

#### Defined in

[storages/workspaces.ts:24](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/workspaces.ts#L24)

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

#### Defined in

[storages/workspaces.ts:42](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/workspaces.ts#L42)

___

### create

▸ **create**(`name`, `description`): `Promise`\<[`Workspace`](Workspace.md)\>

Create workspace.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |

#### Returns

`Promise`\<[`Workspace`](Workspace.md)\>

#### Defined in

[storages/workspaces.ts:47](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/workspaces.ts#L47)

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

#### Defined in

[storages/workspaces.ts:52](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/workspaces.ts#L52)

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

#### Defined in

[events.ts:22](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L22)

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

#### Defined in

[storages/workspaces.ts:30](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/workspaces.ts#L30)

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

#### Defined in

[events.ts:35](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L35)

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

#### Defined in

[storages/workspaces.ts:36](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/workspaces.ts#L36)
