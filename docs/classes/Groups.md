[@neuralinnovations/dataisland-sdk - v0.6.45](../../README.md) / [Exports](../modules.md) / Groups

# Class: Groups

Groups storage.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`GroupsEvent`](../enums/GroupsEvent.md), [`Group`](Group.md)\>

  ↳ **`Groups`**

## Table of contents

### Constructors

- [constructor](Groups.md#constructor)

### Accessors

- [collection](Groups.md#collection)

### Methods

- [create](Groups.md#create)
- [delete](Groups.md#delete)
- [dispatch](Groups.md#dispatch)
- [get](Groups.md#get)
- [reload](Groups.md#reload)
- [subscribe](Groups.md#subscribe)

## Constructors

### constructor

• **new Groups**(): [`Groups`](Groups.md)

#### Returns

[`Groups`](Groups.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### collection

• `get` **collection**(): readonly [`Group`](Group.md)[]

Collection.

#### Returns

readonly [`Group`](Group.md)[]

## Methods

### create

▸ **create**(`name`, `permits`, `memberIds`): `Promise`\<[`Group`](Group.md)\>

Create new group.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `permits` | `Object` |
| `permits.isAdmin` | `boolean` |
| `memberIds` | `string`[] |

#### Returns

`Promise`\<[`Group`](Group.md)\>

___

### delete

▸ **delete**(`id`): `Promise`\<`void`\>

delete group by id.

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
| `input` | [`Input`](../interfaces/Input.md)\<[`GroupsEvent`](../enums/GroupsEvent.md), [`Group`](Group.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### get

▸ **get**(`id`): `undefined` \| [`Group`](Group.md)

Get group by id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| [`Group`](Group.md)

___

### reload

▸ **reload**(): `Promise`\<`void`\>

Reload groups

#### Returns

`Promise`\<`void`\>

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`GroupsEvent`](../enums/GroupsEvent.md), [`Group`](Group.md)\>) => `void` |
| `type?` | [`GroupsEvent`](../enums/GroupsEvent.md) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)
