[@neuralinnovations/dataisland-sdk - v0.0.1-dev7](../../README.md) / [Exports](../modules.md) / Groups

# Class: Groups

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`GroupEvent`](../enums/GroupEvent.md), [`Group`](Group.md)\>

  ↳ **`Groups`**

## Table of contents

### Constructors

- [constructor](Groups.md#constructor)

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

## Methods

### create

▸ **create**(`name`, `organizationId`, `permits`, `memberIds`): `Promise`\<[`Group`](Group.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `organizationId` | `string` |
| `permits` | `Object` |
| `permits.isAdmin` | `boolean` |
| `memberIds` | `string`[] |

#### Returns

`Promise`\<[`Group`](Group.md)\>

___

### delete

▸ **delete**(`id`): `Promise`\<`void`\>

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

▸ **get**(`id`): `Promise`\<`undefined` \| [`Group`](Group.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`undefined` \| [`Group`](Group.md)\>

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