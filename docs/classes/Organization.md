[@neuralinnovations/dataisland-sdk - v0.0.1-dev41](../../README.md) / [Exports](../modules.md) / Organization

# Class: Organization

Organization.

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`OrganizationEvent`](../enums/OrganizationEvent.md), [`Organization`](Organization.md)\>

  ↳ **`Organization`**

## Table of contents

### Constructors

- [constructor](Organization.md#constructor)

### Accessors

- [accessGroups](Organization.md#accessgroups)
- [chats](Organization.md#chats)
- [description](Organization.md#description)
- [id](Organization.md#id)
- [name](Organization.md#name)
- [workspaces](Organization.md#workspaces)

### Methods

- [change](Organization.md#change)
- [createInviteCode](Organization.md#createinvitecode)
- [dispatch](Organization.md#dispatch)
- [inviteUsers](Organization.md#inviteusers)
- [limitSegments](Organization.md#limitsegments)
- [members](Organization.md#members)
- [membersStatistics](Organization.md#membersstatistics)
- [organizationLimits](Organization.md#organizationlimits)
- [statistics](Organization.md#statistics)
- [subscribe](Organization.md#subscribe)
- [userLimits](Organization.md#userlimits)
- [userStatistic](Organization.md#userstatistic)
- [validateInviteCode](Organization.md#validateinvitecode)

## Constructors

### constructor

• **new Organization**(): [`Organization`](Organization.md)

#### Returns

[`Organization`](Organization.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### accessGroups

• `get` **accessGroups**(): [`Groups`](Groups.md)

Groups.

#### Returns

[`Groups`](Groups.md)

___

### chats

• `get` **chats**(): [`Chats`](Chats.md)

Chats.

#### Returns

[`Chats`](Chats.md)

___

### description

• `get` **description**(): `string`

Organization description.

#### Returns

`string`

___

### id

• `get` **id**(): `string`

Organization id.

#### Returns

`string`

___

### name

• `get` **name**(): `string`

Organization name.

#### Returns

`string`

___

### workspaces

• `get` **workspaces**(): [`Workspaces`](Workspaces.md)

Workspaces.

#### Returns

[`Workspaces`](Workspaces.md)

## Methods

### change

▸ **change**(`name`, `description`): `Promise`\<`void`\>

Change organization name and description.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |

#### Returns

`Promise`\<`void`\>

___

### createInviteCode

▸ **createInviteCode**(`accessGroups`): `Promise`\<`string`\>

Create invite code for users outside organization

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessGroups` | `string`[] |

#### Returns

`Promise`\<`string`\>

___

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`CHANGED`](../enums/OrganizationEvent.md#changed), [`Organization`](Organization.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### inviteUsers

▸ **inviteUsers**(`emails`, `accessGroups`): `Promise`\<`void`\>

Invite users with given emails to organization

#### Parameters

| Name | Type |
| :------ | :------ |
| `emails` | `string`[] |
| `accessGroups` | `string`[] |

#### Returns

`Promise`\<`void`\>

___

### limitSegments

▸ **limitSegments**(): `Promise`\<`SegmentData`[]\>

Get all available segments data

#### Returns

`Promise`\<`SegmentData`[]\>

___

### members

▸ **members**(): `Promise`\<[`UserDto`](../interfaces/UserDto.md)[]\>

Get organization members

#### Returns

`Promise`\<[`UserDto`](../interfaces/UserDto.md)[]\>

___

### membersStatistics

▸ **membersStatistics**(`dateFrom`, `dateTo`): `Promise`\<[`UsersStatisticsResponse`](../interfaces/UsersStatisticsResponse.md)\>

Get organization statistics

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateFrom` | `number` |
| `dateTo` | `number` |

#### Returns

`Promise`\<[`UsersStatisticsResponse`](../interfaces/UsersStatisticsResponse.md)\>

___

### organizationLimits

▸ **organizationLimits**(): `Promise`\<`SegmentData`\>

Get default organization limits

#### Returns

`Promise`\<`SegmentData`\>

___

### statistics

▸ **statistics**(`dateFrom`, `dateTo`): `Promise`\<`StatisticsResponse`\>

Get organization statistics

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateFrom` | `number` |
| `dateTo` | `number` |

#### Returns

`Promise`\<`StatisticsResponse`\>

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`CHANGED`](../enums/OrganizationEvent.md#changed), [`Organization`](Organization.md)\>) => `void` |
| `type?` | [`CHANGED`](../enums/OrganizationEvent.md#changed) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)

___

### userLimits

▸ **userLimits**(): `Promise`\<[`CurrentLimitsData`](../interfaces/CurrentLimitsData.md)\>

Get user limits data

#### Returns

`Promise`\<[`CurrentLimitsData`](../interfaces/CurrentLimitsData.md)\>

___

### userStatistic

▸ **userStatistic**(`userid`, `dateFrom`, `dateTo`): `Promise`\<`StatisticsResponse`\>

Get statistics for user

#### Parameters

| Name | Type |
| :------ | :------ |
| `userid` | `string` |
| `dateFrom` | `number` |
| `dateTo` | `number` |

#### Returns

`Promise`\<`StatisticsResponse`\>

___

### validateInviteCode

▸ **validateInviteCode**(`code`): `Promise`\<`void`\>

Validate invite code for user

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`Promise`\<`void`\>
