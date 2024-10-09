[@neuralinnovations/dataisland-sdk - v0.0.1-dev86](../../README.md) / [Exports](../modules.md) / LibraryManagement

# Class: LibraryManagement

Library management, you must have permissions to manage libraries

## Table of contents

### Constructors

- [constructor](LibraryManagement.md#constructor)

### Methods

- [addOrgToLibrary](LibraryManagement.md#addorgtolibrary)
- [createLibrary](LibraryManagement.md#createlibrary)
- [deleteLibrary](LibraryManagement.md#deletelibrary)
- [deleteOrgFromLibrary](LibraryManagement.md#deleteorgfromlibrary)
- [getLibraries](LibraryManagement.md#getlibraries)

## Constructors

### constructor

• **new LibraryManagement**(): [`LibraryManagement`](LibraryManagement.md)

#### Returns

[`LibraryManagement`](LibraryManagement.md)

## Methods

### addOrgToLibrary

▸ **addOrgToLibrary**(`libraryId`, `organizationId`): `Promise`\<`void`\>

Add permission for an organization to share its data through the library

#### Parameters

| Name | Type |
| :------ | :------ |
| `libraryId` | `string` |
| `organizationId` | `string` |

#### Returns

`Promise`\<`void`\>

___

### createLibrary

▸ **createLibrary**(`name`, `region`, `isPublic`): `Promise`\<`string`\>

Create a new library

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `region` | `number` |
| `isPublic` | `boolean` |

#### Returns

`Promise`\<`string`\>

___

### deleteLibrary

▸ **deleteLibrary**(`libraryId`): `Promise`\<`void`\>

Delete a library by id

#### Parameters

| Name | Type |
| :------ | :------ |
| `libraryId` | `string` |

#### Returns

`Promise`\<`void`\>

___

### deleteOrgFromLibrary

▸ **deleteOrgFromLibrary**(`libraryId`, `organizationId`): `Promise`\<`void`\>

Delete permission for an organization to share its data through the library

#### Parameters

| Name | Type |
| :------ | :------ |
| `libraryId` | `string` |
| `organizationId` | `string` |

#### Returns

`Promise`\<`void`\>

___

### getLibraries

▸ **getLibraries**(): `Promise`\<[`LibraryDto`](../interfaces/LibraryDto.md)[]\>

Get all libraries

#### Returns

`Promise`\<[`LibraryDto`](../interfaces/LibraryDto.md)[]\>
