[@neuralinnovations/dataisland-sdk - v0.6.56](../../README.md) / [Exports](../modules.md) / DataIslandApp

# Class: DataIslandApp

DataIsland App instance.

## Table of contents

### Constructors

- [constructor](DataIslandApp.md#constructor)

### Accessors

- [acquiring](DataIslandApp.md#acquiring)
- [administration](DataIslandApp.md#administration)
- [automaticDataCollectionEnabled](DataIslandApp.md#automaticdatacollectionenabled)
- [context](DataIslandApp.md#context)
- [credential](DataIslandApp.md#credential)
- [host](DataIslandApp.md#host)
- [libraries](DataIslandApp.md#libraries)
- [lifetime](DataIslandApp.md#lifetime)
- [name](DataIslandApp.md#name)
- [organizations](DataIslandApp.md#organizations)
- [userProfile](DataIslandApp.md#userprofile)

### Methods

- [invalidate](DataIslandApp.md#invalidate)
- [resolve](DataIslandApp.md#resolve)

## Constructors

### constructor

• **new DataIslandApp**(): [`DataIslandApp`](DataIslandApp.md)

#### Returns

[`DataIslandApp`](DataIslandApp.md)

## Accessors

### acquiring

• `get` **acquiring**(): `Acquiring`

Acquiring.

#### Returns

`Acquiring`

___

### administration

• `get` **administration**(): `Administration`

Administration.

#### Returns

`Administration`

___

### automaticDataCollectionEnabled

• `get` **automaticDataCollectionEnabled**(): `boolean`

The automaticDataCollectionEnabled of this app.

#### Returns

`boolean`

___

### context

• `get` **context**(): [`Context`](Context.md)

The context of this app.

#### Returns

[`Context`](Context.md)

___

### credential

• `get` **credential**(): `undefined` \| [`CredentialBase`](CredentialBase.md)

The credential of this app.

#### Returns

`undefined` \| [`CredentialBase`](CredentialBase.md)

• `set` **credential**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`CredentialBase`](CredentialBase.md) |

#### Returns

`void`

___

### host

• `get` **host**(): `string`

The host of this app.

#### Returns

`string`

___

### libraries

• `get` **libraries**(): [`Libraries`](Libraries.md)

Libraries.

#### Returns

[`Libraries`](Libraries.md)

___

### lifetime

• `get` **lifetime**(): [`Lifetime`](Lifetime.md)

The lifetime of this app.

#### Returns

[`Lifetime`](Lifetime.md)

___

### name

• `get` **name**(): `string`

The name of this app.

#### Returns

`string`

___

### organizations

• `get` **organizations**(): [`Organizations`](Organizations.md)

User's organizations.

#### Returns

[`Organizations`](Organizations.md)

___

### userProfile

• `get` **userProfile**(): [`UserProfile`](UserProfile.md)

User's profile.

#### Returns

[`UserProfile`](UserProfile.md)

## Methods

### invalidate

▸ **invalidate**(): `Promise`\<`void`\>

Invalidate the app and reload the data.

#### Returns

`Promise`\<`void`\>

___

### resolve

▸ **resolve**\<`T`\>(`type`): `undefined` \| `T`

Resolve a service from the app.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Constructor`\<`T`\> |

#### Returns

`undefined` \| `T`
