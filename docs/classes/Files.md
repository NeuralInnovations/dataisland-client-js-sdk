[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / Files

# Class: Files

Files storage.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`FilesEvent`](../enums/FilesEvent.md), [`File`](File.md)\>

  ↳ **`Files`**

## Table of contents

### Constructors

- [constructor](Files.md#constructor)

### Methods

- [delete](Files.md#delete)
- [dispatch](Files.md#dispatch)
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

▸ **delete**(`id`): `Promise`\<`void`\>

Delete file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[storages/files.ts:31](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/files.ts#L31)

___

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

#### Defined in

[events.ts:22](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L22)

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

#### Defined in

[storages/files.ts:36](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/files.ts#L36)

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

#### Defined in

[events.ts:35](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L35)

___

### upload

▸ **upload**(`file`): `Promise`\<[`File`](File.md)\>

Get file by id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |

#### Returns

`Promise`\<[`File`](File.md)\>

#### Defined in

[storages/files.ts:25](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/files.ts#L25)
