[@neuralinnovations/dataisland-sdk - v0.6.51](../../README.md) / [Exports](../modules.md) / Library

# Class: Library

Library.

## Table of contents

### Constructors

- [constructor](Library.md#constructor)

### Accessors

- [id](Library.md#id)
- [isRemote](Library.md#isremote)
- [name](Library.md#name)
- [remoteUrl](Library.md#remoteurl)

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

### isRemote

• `get` **isRemote**(): `boolean`

Is remote library

#### Returns

`boolean`

___

### name

• `get` **name**(): `string`

Library name.

#### Returns

`string`

___

### remoteUrl

• `get` **remoteUrl**(): `undefined` \| `string`

Remote library url

#### Returns

`undefined` \| `string`

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
