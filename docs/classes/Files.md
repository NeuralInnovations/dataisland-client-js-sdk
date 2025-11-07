[@neuralinnovations/dataisland-sdk - v0.6.51](../../README.md) / [Exports](../modules.md) / Files

# Class: Files

Files storage.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`FilesEvent`](../enums/FilesEvent.md), [`File`](File.md)[]\>

  ↳ **`Files`**

## Table of contents

### Constructors

- [constructor](Files.md#constructor)

### Methods

- [delete](Files.md#delete)
- [dispatch](Files.md#dispatch)
- [get](Files.md#get)
- [query](Files.md#query)
- [subscribe](Files.md#subscribe)
- [upload](Files.md#upload)

## Constructors

### constructor

• **new Files**(): [`Files`](Files.md)

#### Returns

[`Files`](Files.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Methods

### delete

▸ **delete**(`ids`): `Promise`\<`void`\>

Delete files.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string`[] |

#### Returns

`Promise`\<`void`\>

___

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`FilesEvent`](../enums/FilesEvent.md), [`File`](File.md)[]\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### get

▸ **get**(`fileId`): `Promise`\<[`File`](File.md)\>

Get file by ID

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileId` | `string` |

#### Returns

`Promise`\<[`File`](File.md)\>

___

### query

▸ **query**(`query`, `page`, `limit`): `Promise`\<[`FilesPage`](FilesPage.md)\>

Query files.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `page` | `number` |
| `limit` | `number` |

#### Returns

`Promise`\<[`FilesPage`](FilesPage.md)\>

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`FilesEvent`](../enums/FilesEvent.md), [`File`](File.md)[]\>) => `void` |
| `type?` | [`FilesEvent`](../enums/FilesEvent.md) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)

___

### upload

▸ **upload**(`files`): `Promise`\<[`File`](File.md)[]\>

Upload file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `files` | `File`[] |

#### Returns

`Promise`\<[`File`](File.md)[]\>
