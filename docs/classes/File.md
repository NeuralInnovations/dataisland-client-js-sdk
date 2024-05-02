[@neuralinnovations/dataisland-sdk - v0.0.1-dev46](../../README.md) / [Exports](../modules.md) / File

# Class: File

File.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`FilesEvent`](../enums/FilesEvent.md), [`File`](File.md)\>

  ↳ **`File`**

## Table of contents

### Constructors

- [constructor](File.md#constructor)

### Accessors

- [createdAt](File.md#createdat)
- [id](File.md#id)
- [modifiedAt](File.md#modifiedat)
- [name](File.md#name)
- [previewUrl](File.md#previewurl)
- [progress](File.md#progress)
- [status](File.md#status)
- [url](File.md#url)

### Methods

- [dispatch](File.md#dispatch)
- [subscribe](File.md#subscribe)

## Constructors

### constructor

• **new File**(): [`File`](File.md)

#### Returns

[`File`](File.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### createdAt

• `get` **createdAt**(): `number`

File date added.

#### Returns

`number`

___

### id

• `get` **id**(): `string`

File id.

#### Returns

`string`

___

### modifiedAt

• `get` **modifiedAt**(): `number`

File date modified.

#### Returns

`number`

___

### name

• `get` **name**(): `string`

File name.

#### Returns

`string`

___

### previewUrl

• `get` **previewUrl**(): `string`

Get temporary url.

#### Returns

`string`

___

### progress

• `get` **progress**(): [`FileProgressDto`](../interfaces/FileProgressDto.md)

File uploading progress

#### Returns

[`FileProgressDto`](../interfaces/FileProgressDto.md)

___

### status

• `get` **status**(): [`FileStatus`](../enums/FileStatus.md)

File uploading status

#### Returns

[`FileStatus`](../enums/FileStatus.md)

___

### url

• `get` **url**(): `string`

Get temporary url.

#### Returns

`string`

## Methods

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`FilesEvent`](../enums/FilesEvent.md), [`File`](File.md)\> |

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
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`FilesEvent`](../enums/FilesEvent.md), [`File`](File.md)\>) => `void` |
| `type?` | [`FilesEvent`](../enums/FilesEvent.md) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)
