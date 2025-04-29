[@neuralinnovations/dataisland-sdk - v0.6.13](../../README.md) / [Exports](../modules.md) / UserProfile

# Class: UserProfile

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`UserEvent`](../enums/UserEvent.md), [`UserProfile`](UserProfile.md)\>

  ↳ **`UserProfile`**

## Table of contents

### Constructors

- [constructor](UserProfile.md#constructor)

### Accessors

- [binanceId](UserProfile.md#binanceid)
- [createdAt](UserProfile.md#createdat)
- [educationalInstitution](UserProfile.md#educationalinstitution)
- [email](UserProfile.md#email)
- [id](UserProfile.md#id)
- [isAnonymous](UserProfile.md#isanonymous)
- [isDeleted](UserProfile.md#isdeleted)
- [modifiedAt](UserProfile.md#modifiedat)
- [name](UserProfile.md#name)

### Methods

- [addTelegramAccount](UserProfile.md#addtelegramaccount)
- [deleteUser](UserProfile.md#deleteuser)
- [dispatch](UserProfile.md#dispatch)
- [fetch](UserProfile.md#fetch)
- [getUserInvites](UserProfile.md#getuserinvites)
- [subscribe](UserProfile.md#subscribe)
- [updateUser](UserProfile.md#updateuser)

## Constructors

### constructor

• **new UserProfile**(): [`UserProfile`](UserProfile.md)

#### Returns

[`UserProfile`](UserProfile.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### binanceId

• `get` **binanceId**(): `string`

Additional binance ID

#### Returns

`string`

___

### createdAt

• `get` **createdAt**(): `Date`

Created at.

#### Returns

`Date`

___

### educationalInstitution

• `get` **educationalInstitution**(): `string`

Additional educational institution

#### Returns

`string`

___

### email

• `get` **email**(): `string`

User email.

#### Returns

`string`

___

### id

• `get` **id**(): `string`

User id.

#### Returns

`string`

___

### isAnonymous

• `get` **isAnonymous**(): `boolean`

Is user anonymous

#### Returns

`boolean`

___

### isDeleted

• `get` **isDeleted**(): `boolean`

Is user deleted.

#### Returns

`boolean`

___

### modifiedAt

• `get` **modifiedAt**(): `Date`

Modified at.

#### Returns

`Date`

___

### name

• `get` **name**(): `string`

User name.

#### Returns

`string`

## Methods

### addTelegramAccount

▸ **addTelegramAccount**(`data`): `Promise`\<`void`\>

Connect telegram account to DataIsland User

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `object` |

#### Returns

`Promise`\<`void`\>

___

### deleteUser

▸ **deleteUser**(): `Promise`\<`boolean`\>

Delete User

#### Returns

`Promise`\<`boolean`\>

___

### dispatch

▸ **dispatch**(`input`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Input`](../interfaces/Input.md)\<[`CHANGED`](../enums/UserEvent.md#changed), [`UserProfile`](UserProfile.md)\> |

#### Returns

`void`

#### Inherited from

[EventDispatcher](EventDispatcher.md).[dispatch](EventDispatcher.md#dispatch)

___

### fetch

▸ **fetch**(): `Promise`\<`void`\>

Fetch user profile

#### Returns

`Promise`\<`void`\>

___

### getUserInvites

▸ **getUserInvites**(): `Promise`\<[`InviteResponse`](../interfaces/InviteResponse.md)\>

Get all invite links for user

#### Returns

`Promise`\<[`InviteResponse`](../interfaces/InviteResponse.md)\>

___

### subscribe

▸ **subscribe**(`callback`, `type?`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`event`: [`Event`](../interfaces/Event.md)\<[`CHANGED`](../enums/UserEvent.md#changed), [`UserProfile`](UserProfile.md)\>) => `void` |
| `type?` | [`CHANGED`](../enums/UserEvent.md#changed) |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[subscribe](EventDispatcher.md#subscribe)

___

### updateUser

▸ **updateUser**(`newName`, `newId`, `newEducationalInstitution`): `Promise`\<`void`\>

Update user profile

#### Parameters

| Name | Type |
| :------ | :------ |
| `newName` | `string` |
| `newId` | `string` |
| `newEducationalInstitution` | `string` |

#### Returns

`Promise`\<`void`\>
