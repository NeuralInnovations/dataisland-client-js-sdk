[@neuralinnovations/dataisland-sdk - v0.0.1-dev86](../../README.md) / [Exports](../modules.md) / Libraries

# Class: Libraries

Libraries

## Table of contents

### Constructors

- [constructor](Libraries.md#constructor)

### Accessors

- [collection](Libraries.md#collection)
- [management](Libraries.md#management)

### Methods

- [getLibraryById](Libraries.md#getlibrarybyid)

## Constructors

### constructor

• **new Libraries**(): [`Libraries`](Libraries.md)

#### Returns

[`Libraries`](Libraries.md)

## Accessors

### collection

• `get` **collection**(): readonly [`Library`](Library.md)[]

Collection of libraries

#### Returns

readonly [`Library`](Library.md)[]

___

### management

• `get` **management**(): [`LibraryManagement`](LibraryManagement.md)

You must have permissions to manage libraries

#### Returns

[`LibraryManagement`](LibraryManagement.md)

## Methods

### getLibraryById

▸ **getLibraryById**(`libraryId`): `undefined` \| [`Library`](Library.md)

Get library by id

#### Parameters

| Name | Type |
| :------ | :------ |
| `libraryId` | `string` |

#### Returns

`undefined` \| [`Library`](Library.md)
