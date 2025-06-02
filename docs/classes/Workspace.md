[@neuralinnovations/dataisland-sdk - v0.6.26](../../README.md) / [Exports](../modules.md) / Workspace

# Class: Workspace

Workspace.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`WorkspaceEvent`](../enums/WorkspaceEvent.md), [`Workspace`](Workspace.md)\>

  ↳ **`Workspace`**

## Table of contents

### Constructors

- [constructor](Workspace.md#constructor)

### Accessors

- [description](Workspace.md#description)
- [files](Workspace.md#files)
- [id](Workspace.md#id)
- [isShared](Workspace.md#isshared)
- [name](Workspace.md#name)
- [organization](Workspace.md#organization)

### Methods

- [change](Workspace.md#change)
- [dispatch](Workspace.md#dispatch)
- [filesCount](Workspace.md#filescount)
- [share](Workspace.md#share)
- [subscribe](Workspace.md#subscribe)

## Constructors

### constructor

• **new Workspace**(): [`Workspace`](Workspace.md)

#### Returns

[`Workspace`](Workspace.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### description

• `get` **description**(): `string`

Workspace description.

#### Returns

`string`

___

### files

• `get` **files**(): [`Files`](Files.md)

Workspace files.

#### Returns

[`Files`](Files.md)

___

### id

• `get` **id**(): `string`

Workspace id.

#### Returns

`string`

___

### isShared

• `get` **isShared**(): `boolean`

#### Returns

`boolean`

___

### name

• `get` **name**(): `string`

Workspace name.

#### Returns

`string`

___

### organization

• `get` **organization**(): [`Organization`](Organization.md)

Organization.

#### Returns

[`Organization`](Organization.md)

## Methods

### change

▸ **change**(`name`, `description`): `Promise`\<`void`\>

Change workspace name and description.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |

#### Returns

`Promise`\<`void`\>

___

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`CHANGED`](../enums/WorkspaceEvent.md#changed), [`Workspace`](Workspace.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### filesCount

▸ **filesCount**(): `Promise`\<`number`\>

Workspace files count.

#### Returns

`Promise`\<`number`\>

___

### share

▸ **share**(`isShared`): `Promise`\<`void`\>

Make workspace available for the library implementation

#### Parameters

| Name | Type |
| :------ | :------ |
| `isShared` | `boolean` |

#### Returns

`Promise`\<`void`\>

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`CHANGED`](../enums/WorkspaceEvent.md#changed), [`Workspace`](Workspace.md)\>) => `void` |
| `type?` | [`CHANGED`](../enums/WorkspaceEvent.md#changed) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)
