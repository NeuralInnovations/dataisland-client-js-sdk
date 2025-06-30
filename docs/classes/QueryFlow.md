[@neuralinnovations/dataisland-sdk - v0.6.39](../../README.md) / [Exports](../modules.md) / QueryFlow

# Class: QueryFlow

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`QueryFlowEvent`](../enums/QueryFlowEvent.md), [`QueryFlow`](QueryFlow.md)\>

  ↳ **`QueryFlow`**

## Table of contents

### Constructors

- [constructor](QueryFlow.md#constructor)

### Accessors

- [error](QueryFlow.md#error)
- [id](QueryFlow.md#id)
- [name](QueryFlow.md#name)
- [progress](QueryFlow.md#progress)
- [state](QueryFlow.md#state)
- [urls](QueryFlow.md#urls)

### Methods

- [dispatch](QueryFlow.md#dispatch)
- [fetch](QueryFlow.md#fetch)
- [subscribe](QueryFlow.md#subscribe)

## Constructors

### constructor

• **new QueryFlow**(): [`QueryFlow`](QueryFlow.md)

#### Returns

[`QueryFlow`](QueryFlow.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### error

• `get` **error**(): `string`

#### Returns

`string`

___

### id

• `get` **id**(): `string`

#### Returns

`string`

___

### name

• `get` **name**(): `string`

#### Returns

`string`

___

### progress

• `get` **progress**(): `number`

#### Returns

`number`

___

### state

• `get` **state**(): [`QueryFlowState`](../enums/QueryFlowState.md)

#### Returns

[`QueryFlowState`](../enums/QueryFlowState.md)

___

### urls

• `get` **urls**(): `undefined` \| [`QueryFileUrlDto`](../interfaces/QueryFileUrlDto.md)[]

#### Returns

`undefined` \| [`QueryFileUrlDto`](../interfaces/QueryFileUrlDto.md)[]

## Methods

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`UPDATED`](../enums/QueryFlowEvent.md#updated), [`QueryFlow`](QueryFlow.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### fetch

▸ **fetch**(): `any`

#### Returns

`any`

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`UPDATED`](../enums/QueryFlowEvent.md#updated), [`QueryFlow`](QueryFlow.md)\>) => `void` |
| `type?` | [`UPDATED`](../enums/QueryFlowEvent.md#updated) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)
