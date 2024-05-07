[@neuralinnovations/dataisland-sdk - v0.0.1-dev49](../README.md) / Exports

# @neuralinnovations/dataisland-sdk - v0.0.1-dev49

## Table of contents

### Enumerations

- [AnswerEvent](enums/AnswerEvent.md)
- [AnswerStatus](enums/AnswerStatus.md)
- [ChatAnswerType](enums/ChatAnswerType.md)
- [ChatsEvent](enums/ChatsEvent.md)
- [FileStatus](enums/FileStatus.md)
- [FilesEvent](enums/FilesEvent.md)
- [GroupEvent](enums/GroupEvent.md)
- [GroupsEvent](enums/GroupsEvent.md)
- [LimitActionType](enums/LimitActionType.md)
- [OrderState](enums/OrderState.md)
- [OrganizationEvent](enums/OrganizationEvent.md)
- [OrganizationsEvent](enums/OrganizationsEvent.md)
- [StepStatus](enums/StepStatus.md)
- [StepType](enums/StepType.md)
- [UserEvent](enums/UserEvent.md)
- [WorkspaceEvent](enums/WorkspaceEvent.md)
- [WorkspacesEvent](enums/WorkspacesEvent.md)

### Classes

- [AnonymousCredential](classes/AnonymousCredential.md)
- [Answer](classes/Answer.md)
- [AppBuilder](classes/AppBuilder.md)
- [BasicCredential](classes/BasicCredential.md)
- [BearerCredential](classes/BearerCredential.md)
- [Chat](classes/Chat.md)
- [Chats](classes/Chats.md)
- [Context](classes/Context.md)
- [CredentialBase](classes/CredentialBase.md)
- [DataIslandApp](classes/DataIslandApp.md)
- [DebugCredential](classes/DebugCredential.md)
- [DefaultCredential](classes/DefaultCredential.md)
- [DisposableContainer](classes/DisposableContainer.md)
- [EventDispatcher](classes/EventDispatcher.md)
- [File](classes/File.md)
- [Files](classes/Files.md)
- [FilesPage](classes/FilesPage.md)
- [Group](classes/Group.md)
- [Groups](classes/Groups.md)
- [Lifetime](classes/Lifetime.md)
- [Organization](classes/Organization.md)
- [Organizations](classes/Organizations.md)
- [StepTypeInfo](classes/StepTypeInfo.md)
- [UserProfile](classes/UserProfile.md)
- [Workspace](classes/Workspace.md)
- [Workspaces](classes/Workspaces.md)

### Interfaces

- [AccessGroupDto](interfaces/AccessGroupDto.md)
- [AccessGroupResponse](interfaces/AccessGroupResponse.md)
- [AccessGroupsResponse](interfaces/AccessGroupsResponse.md)
- [AcquiringPlan](interfaces/AcquiringPlan.md)
- [AcquiringPlansResponse](interfaces/AcquiringPlansResponse.md)
- [AcquiringSegmentData](interfaces/AcquiringSegmentData.md)
- [AnswerDto](interfaces/AnswerDto.md)
- [AnswerSourcesResponse](interfaces/AnswerSourcesResponse.md)
- [AnswerStepDto](interfaces/AnswerStepDto.md)
- [BadRequest](interfaces/BadRequest.md)
- [ChatDto](interfaces/ChatDto.md)
- [ChatListResponse](interfaces/ChatListResponse.md)
- [CurrentLimitItem](interfaces/CurrentLimitItem.md)
- [CurrentLimitRecordData](interfaces/CurrentLimitRecordData.md)
- [CurrentLimitsData](interfaces/CurrentLimitsData.md)
- [Disposable](interfaces/Disposable.md)
- [Event](interfaces/Event.md)
- [EventSubscriber](interfaces/EventSubscriber.md)
- [FetchAnswerResponse](interfaces/FetchAnswerResponse.md)
- [FetchTokensResponse](interfaces/FetchTokensResponse.md)
- [FileDto](interfaces/FileDto.md)
- [FileListResponse](interfaces/FileListResponse.md)
- [FileProgressDto](interfaces/FileProgressDto.md)
- [FileUrlDto](interfaces/FileUrlDto.md)
- [GetOrderStateResponse](interfaces/GetOrderStateResponse.md)
- [Input](interfaces/Input.md)
- [InviteCodeResponse](interfaces/InviteCodeResponse.md)
- [MembersResponse](interfaces/MembersResponse.md)
- [OrderData](interfaces/OrderData.md)
- [OrderResponse](interfaces/OrderResponse.md)
- [OrganizationDto](interfaces/OrganizationDto.md)
- [OrganizationProfileDto](interfaces/OrganizationProfileDto.md)
- [OrganizationSegmentData](interfaces/OrganizationSegmentData.md)
- [OrganizationWorkspaces](interfaces/OrganizationWorkspaces.md)
- [PermitsDto](interfaces/PermitsDto.md)
- [ProfileDto](interfaces/ProfileDto.md)
- [RegulationDto](interfaces/RegulationDto.md)
- [SegmentActionData](interfaces/SegmentActionData.md)
- [SegmentData](interfaces/SegmentData.md)
- [SegmentItemData](interfaces/SegmentItemData.md)
- [SegmentsData](interfaces/SegmentsData.md)
- [SourceDto](interfaces/SourceDto.md)
- [StatisticsData](interfaces/StatisticsData.md)
- [StatisticsResponse](interfaces/StatisticsResponse.md)
- [UserAcquiringPlan](interfaces/UserAcquiringPlan.md)
- [UserDto](interfaces/UserDto.md)
- [UserInfoResponse](interfaces/UserInfoResponse.md)
- [UserLimitData](interfaces/UserLimitData.md)
- [UserLimitRecordData](interfaces/UserLimitRecordData.md)
- [UserLimitsData](interfaces/UserLimitsData.md)
- [UserSettings](interfaces/UserSettings.md)
- [UsersStatisticsResponse](interfaces/UsersStatisticsResponse.md)
- [UsetStatisticsData](interfaces/UsetStatisticsData.md)
- [WorkspaceDto](interfaces/WorkspaceDto.md)
- [WorkspaceProfileDto](interfaces/WorkspaceProfileDto.md)
- [WorkspacesResponse](interfaces/WorkspacesResponse.md)

### Type Aliases

- [AnswerId](modules.md#answerid)
- [ChatId](modules.md#chatid)
- [FileId](modules.md#fileid)
- [GroupId](modules.md#groupid)
- [Middleware](modules.md#middleware)
- [OrganizationId](modules.md#organizationid)
- [StepId](modules.md#stepid)
- [UploadFile](modules.md#uploadfile)
- [UserId](modules.md#userid)
- [WorkspaceId](modules.md#workspaceid)

### Variables

- [DEFAULT\_HOST](modules.md#default_host)
- [DEFAULT\_NAME](modules.md#default_name)
- [SDK\_VERSION](modules.md#sdk_version)

### Functions

- [dataIslandApp](modules.md#dataislandapp)
- [dataIslandInstances](modules.md#dataislandinstances)
- [disposable](modules.md#disposable)
- [isEmptyNullOrUndefined](modules.md#isemptynullorundefined)
- [isNullOrUndefined](modules.md#isnullorundefined)

## Type Aliases

### AnswerId

Ƭ **AnswerId**: `string`

___

### ChatId

Ƭ **ChatId**: `string`

___

### FileId

Ƭ **FileId**: `string`

___

### GroupId

Ƭ **GroupId**: `string`

Group id.

___

### Middleware

Ƭ **Middleware**: (`req`: `Request`, `next`: (`req`: `Request`) => `Promise`\<`Response`\>) => `Promise`\<`Response`\>

DataIsland App request middleware.

#### Type declaration

▸ (`req`, `next`): `Promise`\<`Response`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request` |
| `next` | (`req`: `Request`) => `Promise`\<`Response`\> |

##### Returns

`Promise`\<`Response`\>

___

### OrganizationId

Ƭ **OrganizationId**: `string`

Organization id.

___

### StepId

Ƭ **StepId**: `string`

___

### UploadFile

Ƭ **UploadFile**: `globalThis.File`

Upload file.

___

### UserId

Ƭ **UserId**: `string`

___

### WorkspaceId

Ƭ **WorkspaceId**: `string`

## Variables

### DEFAULT\_HOST

• `Const` **DEFAULT\_HOST**: ``"https://api.dataisland.com.ua"``

Default DataIsland App host.

___

### DEFAULT\_NAME

• `Const` **DEFAULT\_NAME**: ``"[DEFAULT]"``

Default DataIsland App name.

___

### SDK\_VERSION

• `Const` **SDK\_VERSION**: `string` = `version`

Current SDK version.

## Functions

### dataIslandApp

▸ **dataIslandApp**(`name?`, `setup?`): `Promise`\<[`DataIslandApp`](classes/DataIslandApp.md)\>

Returns a DataIsland App instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | Optional The name of the app. |
| `setup?` | (`builder`: [`AppBuilder`](classes/AppBuilder.md)) => `Promise`\<`void`\> | Optional setup function. |

#### Returns

`Promise`\<[`DataIslandApp`](classes/DataIslandApp.md)\>

A DataIsland App instance.

**`Example`**

```js
import { dataIslandApp, DEFAULT_NAME } from '@neuralinnovations/dataisland-sdk'

const app = await dataIslandApp(DEFAULT_NAME, builder => {
 builder.useHost("https://dataisland.com.ua")
 builder.useAutomaticDataCollectionEnabled(true)
 builder.useCredential(new BasicCredential("email", "password"))
 })
```

___

### dataIslandInstances

▸ **dataIslandInstances**(): [`DataIslandApp`](classes/DataIslandApp.md)[]

Returns a list of DataIsland App instances.

#### Returns

[`DataIslandApp`](classes/DataIslandApp.md)[]

___

### disposable

▸ **disposable**(`action`, `target`): [`Disposable`](interfaces/Disposable.md)

Creates a disposable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | () => `void` | The action to execute when disposed. |
| `target` | `unknown` | The target to bind the action to. |

#### Returns

[`Disposable`](interfaces/Disposable.md)

The disposable.

___

### isEmptyNullOrUndefined

▸ **isEmptyNullOrUndefined**(`object`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `unknown` |

#### Returns

`boolean`

___

### isNullOrUndefined

▸ **isNullOrUndefined**(`object`): object is undefined \| null

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `unknown` |

#### Returns

object is undefined \| null
