[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / DataIslandApp

# Class: DataIslandApp

DataIsland App instance.

## Table of contents

### Constructors

- [constructor](DataIslandApp.md#constructor)

### Accessors

- [automaticDataCollectionEnabled](DataIslandApp.md#automaticdatacollectionenabled)
- [context](DataIslandApp.md#context)
- [credential](DataIslandApp.md#credential)
- [host](DataIslandApp.md#host)
- [lifetime](DataIslandApp.md#lifetime)
- [name](DataIslandApp.md#name)
- [organizations](DataIslandApp.md#organizations)
- [userProfile](DataIslandApp.md#userprofile)

### Methods

- [resolve](DataIslandApp.md#resolve)

## Constructors

### constructor

• **new DataIslandApp**(): [`DataIslandApp`](DataIslandApp.md)

#### Returns

[`DataIslandApp`](DataIslandApp.md)

## Accessors

### automaticDataCollectionEnabled

• `get` **automaticDataCollectionEnabled**(): `boolean`

The automaticDataCollectionEnabled of this app.

#### Returns

`boolean`

#### Defined in

[dataIslandApp.ts:25](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/dataIslandApp.ts#L25)

___

### context

• `get` **context**(): `Context`

The context of this app.

#### Returns

`Context`

#### Defined in

[dataIslandApp.ts:42](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/dataIslandApp.ts#L42)

___

### credential

• `get` **credential**(): `undefined` \| [`CredentialBase`](CredentialBase.md)

The credential of this app.

#### Returns

`undefined` \| [`CredentialBase`](CredentialBase.md)

#### Defined in

[dataIslandApp.ts:35](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/dataIslandApp.ts#L35)

• `set` **credential**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`CredentialBase`](CredentialBase.md) |

#### Returns

`void`

#### Defined in

[dataIslandApp.ts:37](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/dataIslandApp.ts#L37)

___

### host

• `get` **host**(): `string`

The host of this app.

#### Returns

`string`

#### Defined in

[dataIslandApp.ts:20](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/dataIslandApp.ts#L20)

___

### lifetime

• `get` **lifetime**(): [`Lifetime`](Lifetime.md)

The lifetime of this app.

#### Returns

[`Lifetime`](Lifetime.md)

#### Defined in

[dataIslandApp.ts:30](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/dataIslandApp.ts#L30)

___

### name

• `get` **name**(): `string`

The name of this app.

#### Returns

`string`

#### Defined in

[dataIslandApp.ts:15](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/dataIslandApp.ts#L15)

___

### organizations

• `get` **organizations**(): [`Organizations`](Organizations.md)

User's organizations.

#### Returns

[`Organizations`](Organizations.md)

#### Defined in

[dataIslandApp.ts:47](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/dataIslandApp.ts#L47)

___

### userProfile

• `get` **userProfile**(): [`UserProfile`](UserProfile.md)

User's profile.

#### Returns

[`UserProfile`](UserProfile.md)

#### Defined in

[dataIslandApp.ts:52](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/dataIslandApp.ts#L52)

## Methods

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

#### Defined in

[dataIslandApp.ts:58](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/dataIslandApp.ts#L58)
