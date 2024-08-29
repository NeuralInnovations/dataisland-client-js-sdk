[@neuralinnovations/dataisland-sdk - v0.0.1-dev76](../../README.md) / [Exports](../modules.md) / QueryFlow

# Class: QueryFlow

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`QueryFlowEvent`](../enums/QueryFlowEvent.md), [`QueryFlow`](QueryFlow.md)\>

  ↳ **`QueryFlow`**

## Table of contents

### Constructors

- [constructor](QueryFlow.md#constructor)

### Accessors

- [id](QueryFlow.md#id)
- [name](QueryFlow.md#name)
- [resultUrl](QueryFlow.md#resulturl)
- [status](QueryFlow.md#status)

### Methods

- [dispatch](QueryFlow.md#dispatch)
- [subscribe](QueryFlow.md#subscribe)

## Constructors

### constructor

• **new QueryFlow**(): [`QueryFlow`](QueryFlow.md)

#### Returns

[`QueryFlow`](QueryFlow.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

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

### resultUrl

• `get` **resultUrl**(): `string`

#### Returns

`string`

___

### status

• `get` **status**(): [`QueryFlowStatus`](../enums/QueryFlowStatus.md)

#### Returns

[`QueryFlowStatus`](../enums/QueryFlowStatus.md)

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
