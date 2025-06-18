[@neuralinnovations/dataisland-sdk - v0.6.34](../../README.md) / [Exports](../modules.md) / QueryFlows

# Class: QueryFlows

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`QueryFlowsEvent`](../enums/QueryFlowsEvent.md), [`QueryFlow`](QueryFlow.md)\>

  ↳ **`QueryFlows`**

## Table of contents

### Constructors

- [constructor](QueryFlows.md#constructor)

### Methods

- [create](QueryFlows.md#create)
- [delete](QueryFlows.md#delete)
- [dispatch](QueryFlows.md#dispatch)
- [getQueryFlows](QueryFlows.md#getqueryflows)
- [subscribe](QueryFlows.md#subscribe)

## Constructors

### constructor

• **new QueryFlows**(): [`QueryFlows`](QueryFlows.md)

#### Returns

[`QueryFlows`](QueryFlows.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Methods

### create

▸ **create**(`name`, `workspaceIds`, `table`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `workspaceIds` | `string`[] |
| `table` | `File` |

#### Returns

`Promise`\<`string`\>

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
| `input` | [`Input`](../interfaces/Input.md)\<[`QueryFlowsEvent`](../enums/QueryFlowsEvent.md), [`QueryFlow`](QueryFlow.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### getQueryFlows

▸ **getQueryFlows**(): `Promise`\<[`QueryFlow`](QueryFlow.md)[]\>

#### Returns

`Promise`\<[`QueryFlow`](QueryFlow.md)[]\>

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`QueryFlowsEvent`](../enums/QueryFlowsEvent.md), [`QueryFlow`](QueryFlow.md)\>) => `void` |
| `type?` | [`QueryFlowsEvent`](../enums/QueryFlowsEvent.md) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)
