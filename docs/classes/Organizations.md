[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / Organizations

# Class: Organizations

Organizations storage.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`OrganizationsEvent`](../enums/OrganizationsEvent.md), [`Organization`](Organization.md)\>

  ↳ **`Organizations`**

## Table of contents

### Constructors

- [constructor](Organizations.md#constructor)

### Accessors

- [collection](Organizations.md#collection)
- [current](Organizations.md#current)

### Methods

- [create](Organizations.md#create)
- [delete](Organizations.md#delete)
- [dispatch](Organizations.md#dispatch)
- [get](Organizations.md#get)
- [subscribe](Organizations.md#subscribe)
- [tryGet](Organizations.md#tryget)

## Constructors

### constructor

• **new Organizations**(): [`Organizations`](Organizations.md)

#### Returns

[`Organizations`](Organizations.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### collection

• `get` **collection**(): readonly [`Organization`](Organization.md)[]

User's organizations.

#### Returns

readonly [`Organization`](Organization.md)[]

#### Defined in

[storages/organizations.ts:28](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/organizations.ts#L28)

___

### current

• `get` **current**(): `string`

Current organization.

#### Returns

`string`

#### Defined in

[storages/organizations.ts:33](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/organizations.ts#L33)

• `set` **current**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[storages/organizations.ts:34](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/organizations.ts#L34)

## Methods

### create

▸ **create**(`name`, `description`): `Promise`\<[`Organization`](Organization.md)\>

Create new organization.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |

#### Returns

`Promise`\<[`Organization`](Organization.md)\>

#### Defined in

[storages/organizations.ts:50](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/organizations.ts#L50)

___

### delete

▸ **delete**(`id`): `Promise`\<`void`\>

Delete organization.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[storages/organizations.ts:55](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/organizations.ts#L55)

___

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`OrganizationsEvent`](../enums/OrganizationsEvent.md), [`Organization`](Organization.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

#### Defined in

[events.ts:22](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L22)

___

### get

▸ **get**(`id`): [`Organization`](Organization.md)

Get organization by id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`Organization`](Organization.md)

#### Defined in

[storages/organizations.ts:39](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/organizations.ts#L39)

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`OrganizationsEvent`](../enums/OrganizationsEvent.md), [`Organization`](Organization.md)\>) => `void` |
| `type?` | [`OrganizationsEvent`](../enums/OrganizationsEvent.md) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)

#### Defined in

[events.ts:35](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L35)

___

### tryGet

▸ **tryGet**(`id`): `undefined` \| [`Organization`](Organization.md)

Try to get organization by id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| [`Organization`](Organization.md)

#### Defined in

[storages/organizations.ts:45](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/organizations.ts#L45)
