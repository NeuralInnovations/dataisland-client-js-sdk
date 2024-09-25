[@neuralinnovations/dataisland-sdk - v0.0.1-dev84](../../README.md) / [Exports](../modules.md) / LibraryFolder

# Class: LibraryFolder

## Table of contents

### Constructors

- [constructor](LibraryFolder.md#constructor)

### Accessors

- [description](LibraryFolder.md#description)
- [folderId](LibraryFolder.md#folderid)
- [iconId](LibraryFolder.md#iconid)
- [libraryId](LibraryFolder.md#libraryid)
- [name](LibraryFolder.md#name)

### Methods

- [itemsCount](LibraryFolder.md#itemscount)
- [query](LibraryFolder.md#query)

## Constructors

### constructor

• **new LibraryFolder**(): [`LibraryFolder`](LibraryFolder.md)

#### Returns

[`LibraryFolder`](LibraryFolder.md)

## Accessors

### description

• `get` **description**(): `string`

#### Returns

`string`

___

### folderId

• `get` **folderId**(): `string`

#### Returns

`string`

___

### iconId

• `get` **iconId**(): `string`

#### Returns

`string`

___

### libraryId

• `get` **libraryId**(): `string`

#### Returns

`string`

___

### name

• `get` **name**(): `string`

#### Returns

`string`

## Methods

### itemsCount

▸ **itemsCount**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

___

### query

▸ **query**(`query`, `page`, `limit`): `Promise`\<[`LibraryPage`](LibraryPage.md)\>

Query files.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `page` | `number` |
| `limit` | `number` |

#### Returns

`Promise`\<[`LibraryPage`](LibraryPage.md)\>
