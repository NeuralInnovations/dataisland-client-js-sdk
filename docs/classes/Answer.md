[@neuralinnovations/dataisland-sdk - v0.6.8](../../README.md) / [Exports](../modules.md) / Answer

# Class: Answer

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`AnswerEvent`](../enums/AnswerEvent.md), [`Answer`](Answer.md)\>

  ↳ **`Answer`**

## Table of contents

### Constructors

- [constructor](Answer.md#constructor)

### Accessors

- [id](Answer.md#id)
- [question](Answer.md#question)
- [sources](Answer.md#sources)
- [status](Answer.md#status)
- [timestamp](Answer.md#timestamp)
- [tokens](Answer.md#tokens)

### Methods

- [cancel](Answer.md#cancel)
- [dispatch](Answer.md#dispatch)
- [getAllSources](Answer.md#getallsources)
- [subscribe](Answer.md#subscribe)

## Constructors

### constructor

• **new Answer**(): [`Answer`](Answer.md)

#### Returns

[`Answer`](Answer.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### id

• `get` **id**(): `string`

Answer id.

#### Returns

`string`

___

### question

• `get` **question**(): `string`

Answer data object

#### Returns

`string`

___

### sources

• `get` **sources**(): [`SourceDto`](../interfaces/SourceDto.md)[]

Answer sources.

#### Returns

[`SourceDto`](../interfaces/SourceDto.md)[]

___

### status

• `get` **status**(): [`AnswerStatus`](../enums/AnswerStatus.md)

Answer status.

#### Returns

[`AnswerStatus`](../enums/AnswerStatus.md)

___

### timestamp

• `get` **timestamp**(): `number`

Answer time.

#### Returns

`number`

___

### tokens

• `get` **tokens**(): `string`

Answer tokens

#### Returns

`string`

## Methods

### cancel

▸ **cancel**(): `Promise`\<`void`\>

Cancel answer

#### Returns

`Promise`\<`void`\>

___

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`AnswerEvent`](../enums/AnswerEvent.md), [`Answer`](Answer.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### getAllSources

▸ **getAllSources**(): `Promise`\<[`SourceDto`](../interfaces/SourceDto.md)[]\>

Get all debug sources

#### Returns

`Promise`\<[`SourceDto`](../interfaces/SourceDto.md)[]\>

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`AnswerEvent`](../enums/AnswerEvent.md), [`Answer`](Answer.md)\>) => `void` |
| `type?` | [`AnswerEvent`](../enums/AnswerEvent.md) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)
