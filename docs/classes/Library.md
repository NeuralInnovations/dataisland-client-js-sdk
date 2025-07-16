[@neuralinnovations/dataisland-sdk - v0.6.43](../../README.md) / [Exports](../modules.md) / Library

# Class: Library

Library.

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

Library id.

#### Returns

`string`

___

### name

• `get` **name**(): `string`

Library name.

#### Returns

`string`

## Methods

### getFolder

▸ **getFolder**(`folderId`): `Promise`\<[`LibraryFolder`](LibraryFolder.md)\>

Get library folder by id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `folderId` | `string` |

#### Returns

`Promise`\<[`LibraryFolder`](LibraryFolder.md)\>

___

### query

▸ **query**(`query`, `page`, `limit`): `Promise`\<[`LibraryPage`](LibraryPage.md)\>

Get library folders by query.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `page` | `number` |
| `limit` | `number` |

#### Returns

`Promise`\<[`LibraryPage`](LibraryPage.md)\>

▸ **query**(`query`, `page`, `limit`, `folderId`): `Promise`\<[`LibraryPage`](LibraryPage.md)\>

Get library folders by query.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `page` | `number` |
| `limit` | `number` |
| `folderId` | `string` |

#### Returns

`Promise`\<[`LibraryPage`](LibraryPage.md)\>
