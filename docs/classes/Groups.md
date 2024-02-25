[@neuralinnovations/dataisland-sdk - v0.0.1-dev22](../../README.md) / [Exports](../modules.md) / Groups

# Class: Groups

Groups storage.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`GroupEvent`](../enums/GroupEvent.md), [`Group`](Group.md)\>

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
| `input` | [`Input`](../interfaces/Input.md)\<[`GroupEvent`](../enums/GroupEvent.md), [`Group`](Group.md)\> |

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
