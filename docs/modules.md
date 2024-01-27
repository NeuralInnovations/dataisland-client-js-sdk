[@neuralinnovations/dataisland-sdk](../README.md) / Exports

# @neuralinnovations/dataisland-sdk

## Table of contents

### Enumerations

- [ChatAnswer](enums/ChatAnswer.md)
- [ChatsEvent](enums/ChatsEvent.md)
- [FilesEvent](enums/FilesEvent.md)
- [GroupEvent](enums/GroupEvent.md)
- [OrganizationsEvent](enums/OrganizationsEvent.md)
- [UserEvent](enums/UserEvent.md)
- [WorkspaceEvent](enums/WorkspaceEvent.md)
- [WorkspacesEvent](enums/WorkspacesEvent.md)

### Classes

- [BasicCredential](classes/BasicCredential.md)
- [BearerCredential](classes/BearerCredential.md)
- [Chat](classes/Chat.md)
- [Chats](classes/Chats.md)
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
- [UserProfile](classes/UserProfile.md)
- [Workspace](classes/Workspace.md)
- [Workspaces](classes/Workspaces.md)

### Interfaces

- [Disposable](interfaces/Disposable.md)
- [Event](interfaces/Event.md)
- [EventSubscriber](interfaces/EventSubscriber.md)
- [Input](interfaces/Input.md)

### Type Aliases

- [ChatId](modules.md#chatid)
- [FileId](modules.md#fileid)
- [GroupId](modules.md#groupid)
- [OrganizationId](modules.md#organizationid)
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

## Type Aliases

### ChatId

Ƭ **ChatId**: `string`

#### Defined in

[storages/chat.ts:1](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/chat.ts#L1)

___

### FileId

Ƭ **FileId**: `string`

#### Defined in

[storages/file.ts:3](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/file.ts#L3)

___

### GroupId

Ƭ **GroupId**: `string`

#### Defined in

[storages/groups.ts:7](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/groups.ts#L7)

___

### OrganizationId

Ƭ **OrganizationId**: `string`

Organization id.

#### Defined in

[storages/organizations.ts:7](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/organizations.ts#L7)

___

### UploadFile

Ƭ **UploadFile**: `globalThis.File`

Upload file.

#### Defined in

[storages/files.ts:16](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/files.ts#L16)

___

### UserId

Ƭ **UserId**: `string`

#### Defined in

[storages/userProfile.ts:3](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/userProfile.ts#L3)

___

### WorkspaceId

Ƭ **WorkspaceId**: `string`

#### Defined in

[storages/workspaces.ts:4](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/workspaces.ts#L4)

## Variables

### DEFAULT\_HOST

• `Const` **DEFAULT\_HOST**: ``"https://api.dataisland.com.ua"``

Default DataIsland App host.

#### Defined in

[index.ts:38](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/index.ts#L38)

___

### DEFAULT\_NAME

• `Const` **DEFAULT\_NAME**: ``"[DEFAULT]"``

Default DataIsland App name.

#### Defined in

[index.ts:33](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/index.ts#L33)

___

### SDK\_VERSION

• `Const` **SDK\_VERSION**: `string` = `version`

Current SDK version.

#### Defined in

[index.ts:28](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/index.ts#L28)

## Functions

### dataIslandApp

▸ **dataIslandApp**(`name?`, `setup?`): `Promise`\<[`DataIslandApp`](classes/DataIslandApp.md)\>

Returns a DataIsland App instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | Optional The name of the app. |
| `setup?` | (`builder`: `AppBuilder`) => `Promise`\<`void`\> | Optional setup function. |

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

#### Defined in

[index.ts:63](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/index.ts#L63)

___

### dataIslandInstances

▸ **dataIslandInstances**(): [`DataIslandApp`](classes/DataIslandApp.md)[]

Returns a list of DataIsland App instances.

#### Returns

[`DataIslandApp`](classes/DataIslandApp.md)[]

#### Defined in

[index.ts:43](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/index.ts#L43)

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

#### Defined in

[disposable.ts:146](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L146)
