[@neuralinnovations/dataisland-sdk - v0.5.2](../../README.md) / [Exports](../modules.md) / LibraryAdministration

# Class: LibraryAdministration

Library management, you must have permissions to manage libraries

## Table of contents

### Constructors

- [constructor](LibraryAdministration.md#constructor)

### Methods

- [addOrgToLibrary](LibraryAdministration.md#addorgtolibrary)
- [createLibrary](LibraryAdministration.md#createlibrary)
- [deleteLibrary](LibraryAdministration.md#deletelibrary)
- [deleteOrgFromLibrary](LibraryAdministration.md#deleteorgfromlibrary)
- [getLibraries](LibraryAdministration.md#getlibraries)

## Constructors

### constructor

• **new LibraryAdministration**(): [`LibraryAdministration`](LibraryAdministration.md)

#### Returns

[`LibraryAdministration`](LibraryAdministration.md)

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

▸ **createLibrary**(`name`, `description`, `region`, `isPublic`): `Promise`\<`string`\>

Create a new library

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |
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
