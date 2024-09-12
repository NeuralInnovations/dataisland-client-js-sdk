[@neuralinnovations/dataisland-sdk - v0.0.1-dev82](../../README.md) / [Exports](../modules.md) / QueryFlows

# Class: QueryFlows

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`QueryFlowsEvent`](../enums/QueryFlowsEvent.md), [`QueryFlow`](QueryFlow.md)\>

  ↳ **`QueryFlows`**

## Table of contents

### Constructors

- [constructor](QueryFlows.md#constructor)

### Accessors

- [collection](QueryFlows.md#collection)

### Methods

- [create](QueryFlows.md#create)
- [delete](QueryFlows.md#delete)
- [dispatch](QueryFlows.md#dispatch)
- [subscribe](QueryFlows.md#subscribe)

## Constructors

### constructor

• **new QueryFlows**(): [`QueryFlows`](QueryFlows.md)

#### Returns

[`QueryFlows`](QueryFlows.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### collection

• `get` **collection**(): [`QueryFlow`](QueryFlow.md)[]

#### Returns

[`QueryFlow`](QueryFlow.md)[]

## Methods

### create

▸ **create**(`name`, `workspaceId`, `file`, `table`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `workspaceId` | `string` |
| `file` | `File` |
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
