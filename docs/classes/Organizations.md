[@neuralinnovations/dataisland-sdk - v0.4.3](../../README.md) / [Exports](../modules.md) / Organizations

# Class: Organizations

Organizations storage.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`OrganizationsEvent`](../enums/OrganizationsEvent.md), [`Organization`](Organization.md)\>

  ↳ **`Organizations`**

## Table of contents

### Constructors

- [constructor](Organizations.md#constructor)

### Accessors

- [collection](Organizations.md#collection)
- [current](Organizations.md#current)

### Methods

- [applyInviteCode](Organizations.md#applyinvitecode)
- [create](Organizations.md#create)
- [delete](Organizations.md#delete)
- [deleteIcon](Organizations.md#deleteicon)
- [dispatch](Organizations.md#dispatch)
- [get](Organizations.md#get)
- [getIconData](Organizations.md#geticondata)
- [getNewestIcon](Organizations.md#getnewesticon)
- [leaveOrganization](Organizations.md#leaveorganization)
- [subscribe](Organizations.md#subscribe)
- [tryGet](Organizations.md#tryget)
- [uploadIconGlobal](Organizations.md#uploadiconglobal)

## Constructors

### constructor

• **new Organizations**(): [`Organizations`](Organizations.md)

#### Returns

[`Organizations`](Organizations.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### collection

• `get` **collection**(): readonly [`Organization`](Organization.md)[]

User's organizations.

#### Returns

readonly [`Organization`](Organization.md)[]

___

### current

• `get` **current**(): `string`

Current organization.

#### Returns

`string`

• `set` **current**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

## Methods

### applyInviteCode

▸ **applyInviteCode**(`code`): `Promise`\<[`ApplyInviteCodeResponse`](../interfaces/ApplyInviteCodeResponse.md)\>

Apply invite code for user

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`Promise`\<[`ApplyInviteCodeResponse`](../interfaces/ApplyInviteCodeResponse.md)\>

___

### create

▸ **create**(`name`, `description`): `Promise`\<[`Organization`](Organization.md)\>

Create new organization.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |

#### Returns

`Promise`\<[`Organization`](Organization.md)\>

___

### delete

▸ **delete**(`id`): `Promise`\<`void`\>

Delete organization.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`void`\>

___

### deleteIcon

▸ **deleteIcon**(`id`): `Promise`\<`void`\>

Delete icon by ID

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`void`\>

___

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`OrganizationsEvent`](../enums/OrganizationsEvent.md), [`Organization`](Organization.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### get

▸ **get**(`id`): [`Organization`](Organization.md)

Get organization by id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`Organization`](Organization.md)

___

### getIconData

▸ **getIconData**(`id`): `Promise`\<[`IconDto`](../interfaces/IconDto.md)\>

Get icon url and name for given id

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`IconDto`](../interfaces/IconDto.md)\>

___

### getNewestIcon

▸ **getNewestIcon**(`resourceId`, `resourceType`): `Promise`\<[`IconDto`](../interfaces/IconDto.md)\>

Get latest icon for provided resource

#### Parameters

| Name | Type |
| :------ | :------ |
| `resourceId` | `string` |
| `resourceType` | [`ResourceType`](../enums/ResourceType.md) |

#### Returns

`Promise`\<[`IconDto`](../interfaces/IconDto.md)\>

___

### leaveOrganization

▸ **leaveOrganization**(`organizationId`): `Promise`\<`void`\>

leave organization

#### Parameters

| Name | Type |
| :------ | :------ |
| `organizationId` | `string` |

#### Returns

`Promise`\<`void`\>

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`OrganizationsEvent`](../enums/OrganizationsEvent.md), [`Organization`](Organization.md)\>) => `void` |
| `type?` | [`OrganizationsEvent`](../enums/OrganizationsEvent.md) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)

___

### tryGet

▸ **tryGet**(`id`): `undefined` \| [`Organization`](Organization.md)

Try to get organization by id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| [`Organization`](Organization.md)

___

### uploadIconGlobal

▸ **uploadIconGlobal**(`organizationId`, `resourceId`, `resourceType`, `icon`): `Promise`\<`string`\>

Upload icon for any available resource ( organization, user, workspace, chat )

#### Parameters

| Name | Type |
| :------ | :------ |
| `organizationId` | `string` |
| `resourceId` | `string` |
| `resourceType` | [`ResourceType`](../enums/ResourceType.md) |
| `icon` | `File` |

#### Returns

`Promise`\<`string`\>
