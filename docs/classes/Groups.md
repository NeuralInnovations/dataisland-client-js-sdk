[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / Groups

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

#### Defined in

[storages/groups.ts:37](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/groups.ts#L37)

___

### delete

▸ **delete**(`id`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[storages/groups.ts:41](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/groups.ts#L41)

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

#### Defined in

[events.ts:22](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L22)

___

### get

▸ **get**(`id`): `Promise`\<`undefined` \| [`Group`](Group.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`undefined` \| [`Group`](Group.md)\>

#### Defined in

[storages/groups.ts:39](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/groups.ts#L39)

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
