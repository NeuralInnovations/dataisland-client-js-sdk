[@neuralinnovations/dataisland-sdk - v0.6.55](../../README.md) / [Exports](../modules.md) / Organization

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
- [chatbotAccounts](Organization.md#chatbotaccounts)
- [chats](Organization.md#chats)
- [description](Organization.md#description)
- [icon](Organization.md#icon)
- [id](Organization.md#id)
- [instaAccounts](Organization.md#instaaccounts)
- [isAdmin](Organization.md#isadmin)
- [isAllowedInLibraries](Organization.md#isallowedinlibraries)
- [messengerAccounts](Organization.md#messengeraccounts)
- [name](Organization.md#name)
- [prompts](Organization.md#prompts)
- [queryFlows](Organization.md#queryflows)
- [slackWebhookUrl](Organization.md#slackwebhookurl)
- [workspaces](Organization.md#workspaces)

### Methods

- [change](Organization.md#change)
- [createApiKey](Organization.md#createapikey)
- [createInviteCode](Organization.md#createinvitecode)
- [createQuiz](Organization.md#createquiz)
- [deleteApiKey](Organization.md#deleteapikey)
- [deleteInviteCode](Organization.md#deleteinvitecode)
- [deleteOrganizationMember](Organization.md#deleteorganizationmember)
- [dispatch](Organization.md#dispatch)
- [fireChanged](Organization.md#firechanged)
- [getApiKeys](Organization.md#getapikeys)
- [getOrganizationInvites](Organization.md#getorganizationinvites)
- [inviteUsers](Organization.md#inviteusers)
- [limitSegments](Organization.md#limitsegments)
- [members](Organization.md#members)
- [membersStatistics](Organization.md#membersstatistics)
- [organizationLimits](Organization.md#organizationlimits)
- [statistics](Organization.md#statistics)
- [subscribe](Organization.md#subscribe)
- [uploadIcon](Organization.md#uploadicon)
- [userLimits](Organization.md#userlimits)
- [userStatistic](Organization.md#userstatistic)

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

### chatbotAccounts

• `get` **chatbotAccounts**(): `ChatbotAccounts`

Chatbot accounts

#### Returns

`ChatbotAccounts`

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

### icon

• `get` **icon**(): `string`

ID of organization icon

#### Returns

`string`

___

### id

• `get` **id**(): `string`

Organization id.

#### Returns

`string`

___

### instaAccounts

• `get` **instaAccounts**(): `InstaAccounts`

Insta accounts

#### Returns

`InstaAccounts`

___

### isAdmin

• `get` **isAdmin**(): `boolean`

Is admin organization

#### Returns

`boolean`

___

### isAllowedInLibraries

• `get` **isAllowedInLibraries**(): `boolean`

If organizations allowed in libraries

#### Returns

`boolean`

___

### messengerAccounts

• `get` **messengerAccounts**(): `MessengerAccounts`

Messenger accounts

#### Returns

`MessengerAccounts`

___

### name

• `get` **name**(): `string`

Organization name.

#### Returns

`string`

___

### prompts

• `get` **prompts**(): `OrganizationPrompts`

Get organization prompts

#### Returns

`OrganizationPrompts`

___

### queryFlows

• `get` **queryFlows**(): [`QueryFlows`](QueryFlows.md)

Query flows

#### Returns

[`QueryFlows`](QueryFlows.md)

___

### slackWebhookUrl

• `get` **slackWebhookUrl**(): `string`

Webhook url for slack notifictions

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

▸ **change**(`name`, `description`, `slackWebhookUrl`): `Promise`\<`void`\>

Change organization name and description.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |
| `slackWebhookUrl` | `string` |

#### Returns

`Promise`\<`void`\>

___

### createApiKey

▸ **createApiKey**(`name`, `accessGroups`): `Promise`\<[`OrganizationApiKey`](../interfaces/OrganizationApiKey.md)\>

Create new Api key for organization

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `accessGroups` | `string`[] |

#### Returns

`Promise`\<[`OrganizationApiKey`](../interfaces/OrganizationApiKey.md)\>

___

### createInviteCode

▸ **createInviteCode**(`accessGroups`, `validateDomain?`): `Promise`\<`string`\>

Create invite code for users outside organization

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessGroups` | `string`[] |
| `validateDomain?` | `string` |

#### Returns

`Promise`\<`string`\>

___

### createQuiz

▸ **createQuiz**(`workspaces`, `query`, `questionsCount`, `optionsCount`, `fileId`): `Promise`\<[`QuizData`](../interfaces/QuizData.md)\>

Create quiz for given topic

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `workspaces` | `string`[] | workspaces to search for topic |
| `query` | `string` | search query and quiz topic |
| `questionsCount` | `number` | count of quiz tests |
| `optionsCount` | `number` | count of one question options |
| `fileId` | `string` | file id in case of test-on-file |

#### Returns

`Promise`\<[`QuizData`](../interfaces/QuizData.md)\>

___

### deleteApiKey

▸ **deleteApiKey**(`key`): `Promise`\<`void`\>

Delete api key

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`\<`void`\>

___

### deleteInviteCode

▸ **deleteInviteCode**(`code`): `Promise`\<`void`\>

Delete invite code

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`Promise`\<`void`\>

___

### deleteOrganizationMember

▸ **deleteOrganizationMember**(`userIds`): `Promise`\<`void`\>

Delete users from organization by id

#### Parameters

| Name | Type |
| :------ | :------ |
| `userIds` | `string`[] |

#### Returns

`Promise`\<`void`\>

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

### fireChanged

▸ **fireChanged**(): `void`

Fire changed event.

#### Returns

`void`

___

### getApiKeys

▸ **getApiKeys**(): `Promise`\<[`OrganizationApiKey`](../interfaces/OrganizationApiKey.md)[]\>

Get all organization api keys

#### Returns

`Promise`\<[`OrganizationApiKey`](../interfaces/OrganizationApiKey.md)[]\>

___

### getOrganizationInvites

▸ **getOrganizationInvites**(): `Promise`\<[`InviteResponse`](../interfaces/InviteResponse.md)\>

Get all invite links for organization

#### Returns

`Promise`\<[`InviteResponse`](../interfaces/InviteResponse.md)\>

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

▸ **limitSegments**(): `Promise`\<[`SegmentData`](../interfaces/SegmentData.md)[]\>

Get all available segments data

#### Returns

`Promise`\<[`SegmentData`](../interfaces/SegmentData.md)[]\>

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
| `dateFrom` | `Date` |
| `dateTo` | `Date` |

#### Returns

`Promise`\<[`UsersStatisticsResponse`](../interfaces/UsersStatisticsResponse.md)\>

___

### organizationLimits

▸ **organizationLimits**(): `Promise`\<[`SegmentData`](../interfaces/SegmentData.md)\>

Get default organization limits

#### Returns

`Promise`\<[`SegmentData`](../interfaces/SegmentData.md)\>

___

### statistics

▸ **statistics**(`dateFrom`, `dateTo`): `Promise`\<[`StatisticsResponse`](../interfaces/StatisticsResponse.md)\>

Get organization statistics

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateFrom` | `Date` |
| `dateTo` | `Date` |

#### Returns

`Promise`\<[`StatisticsResponse`](../interfaces/StatisticsResponse.md)\>

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

### uploadIcon

▸ **uploadIcon**(`icon`): `Promise`\<`string`\>

Upload an icon for organization

#### Parameters

| Name | Type |
| :------ | :------ |
| `icon` | `File` |

#### Returns

`Promise`\<`string`\>

___

### userLimits

▸ **userLimits**(): `Promise`\<[`CurrentLimitsData`](../interfaces/CurrentLimitsData.md)\>

Get user limits data

#### Returns

`Promise`\<[`CurrentLimitsData`](../interfaces/CurrentLimitsData.md)\>

___

### userStatistic

▸ **userStatistic**(`userid`, `dateFrom`, `dateTo`): `Promise`\<[`StatisticsResponse`](../interfaces/StatisticsResponse.md)\>

Get statistics for user

#### Parameters

| Name | Type |
| :------ | :------ |
| `userid` | `string` |
| `dateFrom` | `Date` |
| `dateTo` | `Date` |

#### Returns

`Promise`\<[`StatisticsResponse`](../interfaces/StatisticsResponse.md)\>
