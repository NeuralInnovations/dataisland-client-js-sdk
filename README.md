# DataIsland Client SDK

The DataIsland Client SDK is a TypeScript library designed to seamlessly integrate DataIsland web services into websites.

## Table of contents

1. [Connect](#connect)
2. [Create app](#create-app)
3. [Use organizations](#use-organizations)
4. [Use chat](#use-chat)
5. [Use workspaces](#use-workspaces)
6. [Use files](#use-files)
7. [Use access groups](#use-access-groups)
8. [Use invites](#use-invites)

### Connect

For connecting this library to your website project simply install it using npm package manager.

`npm i @neuralinnovations/dataisland-sdk`

### Create app

You can initialize default app sdk instance using this code example.

```
const app = await dataIslandApp("your-app-name", async (builder: AppBuilder) => {
    builder.useHost(HOST)
    builder.useCredential(new BearerCredential(TOKEN))
  })
```

It is immpossible to create more than one app sdk intance with same name.

**HOST** is a DataIsland API url which can be passed using environment file.

Second required parameter for builder is Credentials. It is recomended to use Bearer credentials instance and pass your user Auth0 **TOKEN** in order to get access to API.

You can also add requests middlewares with builder options.

```
const app = await dataIslandApp("your-app-name", async (builder: AppBuilder) => {
      builder.useHost(YOUR_HOST)
      builder.useAutomaticDataCollectionEnabled(false)
      builder.useCredential(new BasicCredential("email", "password"))
      builder.registerMiddleware(async (req, next) => {
        req.headers.set("Your-header-name", "value")
        return await next(req)
      })
    })
```

### Use organizations

Organization is a top data structure object, which represents a company or some group of people using our services.
It contains of users ( admin or regular ), workspaces with files ( folders with access control features ) and chats.

By default all user organizations are fetched with user profile during app sdk start. But if there are no organizations linked to the user, you should run Create organization flow. This flow requires organization name and description data, and also first workspace name and description data provided by user.

**NOTE** There are two types of DataIsland web api servers, public and private. On public servers users can create their own organization after first registration, on private servers you must register using invite links.

Default organization creation code example:

```
// create organization
  const org = await app.organizations.create(
    "your-organization-name",
    "your-organization-description"
  )
```

### Use workspaces

Workspaces are folder-like objects used to store files and controll access to it using acces groups. During creation you must pass organization Id, name and description of new workspace and regulation options. You can pass existing group ID or ask to create new group for this workspace in regulation section. 

Default workspace creation example:

```
const workspace = await org.workspaces.create(
      "your-workspace-name",
      "your-workspace-description",
      regulation: {
        isCreateNewGroup: boolean - "Bool option for new group creation"
        newGroupName: string - "New group name"
        groupIds: string[] - "Array of selected accessed groups IDs"
      }
    )
```

### Use files

### Use chat

### Use access groups

### Use Invites
