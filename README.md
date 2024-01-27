@neuralinnovations/dataisland-sdk/[Exports](./docs/modules.md)

# DataIsland Client SDK

The DataIsland Client SDK is a TypeScript library designed to seamlessly integrate DataIsland web services into websites.

## Table of contents

1. [Install](#install)
2. [Create app](#create-app)
3. [Use organizations](#use-organizations)
4. [Use chat](#use-chat)
5. [Use workspaces](#use-workspaces)
6. [Use files](#use-files)
7. [Use access groups](#use-access-groups)
8. [Use invites](#use-invites)
9. [References](docs/modules.md)

---

### Install

For connecting this library to your website project simply install it using npm package manager.

```shell
npm i @neuralinnovations/dataisland-sdk
```

---

### Create app

You can initialize default app sdk instance using this code example.

```typescript
// default production app sdk instance
// it is an instance of DataIslandApp
const dataIslandSdk = await dataIslandApp()

// specific app sdk instance 
// use this if you have more than one app 
// or using custom api server
const yourAppNameSdk = await dataIslandApp('your-app-name', async (builder: AppBuilder) => {
  builder.useHost(HOST)
  builder.useCredential(new BearerCredential(TOKEN))
})
```

[DataIslandApp](docs/classes/DataIslandApp.md) is a application instance. It contains of user profile, organizations and context.

_It is immpossible to create more than one app sdk intance with same name._

**HOST** is a DataIsland API url which can be passed using environment file.

Second required parameter for builder is Credentials. It is recomended to use Bearer credentials instance and pass your user **TOKEN** in order to get access to API.

You can also add requests middlewares with builder options.

```typescript
// The app is an instance of DataIslandApp
const app = await dataIslandApp('your-app-name', async (builder: AppBuilder) => {
  builder.useHost(YOUR_HOST)
  builder.useAutomaticDataCollectionEnabled(false)
  builder.useCredential(new BasicCredential('email', 'password'))
  builder.registerMiddleware(async (req, next) => {
    req.headers.set('Your-header-name', 'value')
    return await next(req)
  })
})
```

[DataIslandApp](docs/classes/DataIslandApp.md) is a application instance. It contains of user profile, organizations and context.

---

### Use organizations

Organization is a top data structure object, which represents a company or some group of people using our services.
It contains of users ( admin or regular ), workspaces with files ( folders with access control features ) and chats.

By default all user organizations are fetched with user profile during app sdk start. But if there are no organizations linked to the user, you should run Create organization flow. This flow requires organization name and description data, and also first workspace name and description data provided by user.

**NOTE** There are two types of DataIsland web api servers, public and private. On public servers users can create their own organization after first registration, on private servers you must register using invite links.

Default organization creation code example:

```typescript
// create organization
// app is an instance of DataIslandApp
// app.organizations is an instance of Organizations (collection of organizations)
// return value is an instance of Organization
const org = await app.organizations.create(
  'your-organization-name',
  'your-organization-description'
)
```
1. [Organization](docs/classes/Organization.md) is a main object for user data management. It contains of users, workspaces and chats.
2. [Organizations](docs/classes/Organizations.md) is a collection of organizations.

---

### Use workspaces

Workspaces are folder-like objects used to store files and controll access to it using acces groups. During creation you must pass organization Id, name and description of new workspace and regulation options. You can pass existing group ID or ask to create new group for this workspace in regulation section. 

Default workspace creation example:

```typescript
// create workspace
// org is an instance of Organization
// org.workspaces is an instance of Workspaces (collection of workspaces)
// return value is an instance of Workspace
//
// isCreateNewGroup: boolean - "Bool option for new group creation"
// newGroupName: string - "New group name"
// groupIds: string[] - "Array of selected accessed groups IDs"
const workspace = await org.workspaces.create(
  // name of new workspace
  'your-workspace-name',
  // description of new workspace
  'your-workspace-description',
  // regulation options
  {
    // create new group for this workspace
    isCreateNewGroup: true,
    // new group name
    newGroupName: 'your-new-group-name',
    // array of selected groups IDs
    groupIds: []
  }
)
```
1. [Workspace](docs/classes/Workspace.md) is a main object for files management. It contains of files, chats and access groups.

2. [Worskpaces](docs/classes/Workspaces.md) is a collection of workspaces.

---

### Use files

### Use chat

### Use access groups

### Use Invites
