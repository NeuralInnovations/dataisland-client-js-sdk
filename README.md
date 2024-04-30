@neuralinnovations/dataisland-sdk/[Exports](./docs/modules.md)

![master](https://github.com/NeuralInnovations/dataisland-client-js-sdk/actions/workflows/tests.yml/badge.svg?branch=master)
![develop](https://github.com/NeuralInnovations/dataisland-client-js-sdk/actions/workflows/tests.yml/badge.svg?branch=develop)

# DataIsland Client SDK

The DataIsland Client SDK is a TypeScript library designed to seamlessly integrate DataIsland web services into websites.

## Table of contents

1. [Install](#install)
2. [Create app](#create-app)
3. [Use organizations](#use-organizations)
4. [Use chat](#use-chat)
5. [Use workspaces](#use-workspaces)
6. [Use files](#use-files)
7. [Use acquiring](#use-acquiring)
8. [Use access groups](#use-access-groups)
9. [Use statistics](#use-statistics)
10. [Use invites](#use-invites)
11. [References](docs/modules.md)

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

You can get workspace total file count with:

```
const count = workspace.totalCount()
```

1. [Workspace](docs/classes/Workspace.md) is a main object for files management. It contains of files, chats and access groups.
2. [Worskpaces](docs/classes/Workspaces.md) is a collection of workspaces.

---

### Use files

Files are part of workspaces and can be managed through workspace interface. You can upload, preview and delete files. Upload and delete operations are working with list parameters ( files list for upload, file ids list for delete )

Default file upload example:

```
const file = await workspace.files.upload([file])
```

The file uploading process always takes some time, so you can track its uploading status using subscription for files UPDATED event. Status tracking starts with "status" property of file. It can be UPLOADING, SUCCESS or FAILED. The "progress" property includes detailed view on file uploading progress, including a success indicator, the total count of file parts, the count of uploaded file parts, and an error field. The success indicator represents whether the last file part was uploaded successfully or not. If one of the parts fails, the uploading process is stopped, and the "error" field contains the text of the failure reason. Remeber to check file status before making a subscription, because it could be already SUCCESS or FAILED

```
if (file.status !== FileStatus.UPLOADING) {
 // Show results
} else {
  file.subscribe((event) => {
    const progress = event.data.progress
  })
}
```

You can get file simply using get method:

```
const file = await workspace.files.get(fileId)
```

File url's for preview or full view are available with url properties of file:

```
const url = file.url
const previewUrl = file.previewUrl
```

Delete file example:

```
await workspace.files.delete([file.id])
```

You can retrieve a list of files from a workspace using the "query" method. It involves several straightforward parameters: a search query for filtering files based on user input (if empty, no filter is applied), page number, and the number of files per page. The method returns an object containing the file list, selected page number, total page count, and other relevant information.

Here is an example:

```
const filesPage = await workspace.files.query(
            "you-user-search-input", 
            0 - page number,
            20 - files limit per page )
```

#### Events

You can subscribe to different file event in order to react for file status changes.

Available events:

* ADDED
* UPDATED
* REMOVED

Subscribe on event example:

```
workspace.files.subscribe((event) => { const file = event.data }, FilesEvent.ADDED)
```

---

### Use chat

Chat is object that stores one user-assistant chat with it's messages and other data. It can be easily created and deleted useing **chats** property of organization. Chat name is always generated by server. You also have to pass "model" during chat creation. Possible options are "search" and "chat".

```
const chat = await organization.chats.create("search")

await organization.chats.delete(your_chat_id)
```

You can access all chats list using **collection** property.

```
const chats = organization.chats.collection
```

Main chat functionality is answer handling. You can create and cancel answer in the chat. Answer is a data object which contains question, answer (tokens), and answer sources.

Here are some examples:

```
const answer = await chat.ask("Hello!", ChatAnswerType.SHORT)

await chat.getAnswer(answer.id).cancel()
```

Main statuses are RUNNING, SUCCESS, CANCELED, FAIL. You can use them to correctly draw answer in chat.

```
status = chat.getAnswer(answer.id).status
```

You can access answer for your question in "tokens" property, question is stored in "question' property.

```
const tokens = await chat.getAnswer(answer.id).tokens
const question = await chat.getAnswer(answer.id).question
```

Every step also includes Sources that were used during execution. Property "sources" contains all sources of all answer steps.

```
const sources = await chat.getAnswer(answer.id).sources
```

If you want to get chat history, you can access chat.collection property

```
const answers = chat.collection
```

#### Events

Chat object have a variety of events. You can track chat and answer creation and deletion. Answer also contains "update" event for updating answer view and stream answer tokens.

Chat events:

* ADDED
* REMOVED

Answer events:

* ADDED
* CANCELLED
* UPDATED

Event subscribe example:

```
chat.answer.subscribe((event) => { const answer = event.data }, AnswerEvent.UPDATED)
```

### Use acquiring

Users can buy subscriptions if they want to increase their limits. You can create an order for subscriptions passing key of selected plan. All available aubscription plans, as well as order creation and user active plan you can get in acquiring service.

```
const plans = app.acquiring.get_plans()
const subscription_request_data = app.acquiring.create_order(selected_plan_key)
const userPlan = app.acquiring.get_user_plan()
```

### Use access groups

You can manage users access to workspaces and different features using access groups functionality. Group control methods are available in organization **groups** property. Also you can change workspaces available for group, change permits and control users.

```
const group = await organization.accessGroups.create(
      "your_group_name",
      permits: {
        isAdmin: bool is user admin,
      },
      memberIds[] - array of group members ids,
)

await organization.accessGroups.delete(group.id)
```

### Use Statistics

Statistics access methods are stored in organization object. There are several methods for different statistics data, and all of them includes dateFrom and dateTo parameters. These parameters are numbers that represent current time in seconds ( UNIX Epoch) . Here are some examples:

```
const organizationStatistics = await org.statistics(dateFrom, dateTo)
const organizationMembersStatistics = await org.membersStatistics(dateFrom, dateTo)
const userStatistics = await org.userStatistic(userId, dateFrom, dateTo)
```

### Use Invites

You can invite users to organization with provided emails and selected access groups. Use invite users method of seleted organization.

```
await organization.inviteUsers(emails[], accessGroups[])
```

You can also use univarsal invite code, and then validate it to add user to group or organization.

```
await organization.createInviteCode(accessGroups[])
await organization.validateInviteCode(inviteCode)
```
