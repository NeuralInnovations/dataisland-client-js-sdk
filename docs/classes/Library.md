[@neuralinnovations/dataisland-sdk - v0.0.1-dev76](../../README.md) / [Exports](../modules.md) / Library

# Class: Library

## Table of contents

### Constructors

- [constructor](Library.md#constructor)

### Accessors

- [id](Library.md#id)
- [name](Library.md#name)

### Methods

- [getFolder](Library.md#getfolder)
- [query](Library.md#query)

## Constructors

### constructor

• **new Library**(): [`Library`](Library.md)

#### Returns

[`Library`](Library.md)

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

## Methods

### getFolder

▸ **getFolder**(`folderId`): `Promise`\<[`LibraryFolder`](LibraryFolder.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `folderId` | `string` |

#### Returns

`Promise`\<[`LibraryFolder`](LibraryFolder.md)\>

___

### query

▸ **query**(`query`, `page`, `limit`): `Promise`\<[`LibraryPage`](LibraryPage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `page` | `number` |
| `limit` | `number` |

#### Returns

`Promise`\<[`LibraryPage`](LibraryPage.md)\>
