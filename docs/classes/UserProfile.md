[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / UserProfile

# Class: UserProfile

## Hierarchy

- [`EventDispatcher`](EventDispatcher.md)\<[`UserEvent`](../enums/UserEvent.md), [`UserProfile`](UserProfile.md)\>

  ↳ **`UserProfile`**

## Table of contents

### Constructors

- [constructor](UserProfile.md#constructor)

### Accessors

- [createdAt](UserProfile.md#createdat)
- [email](UserProfile.md#email)
- [id](UserProfile.md#id)
- [isDeleted](UserProfile.md#isdeleted)
- [modifiedAt](UserProfile.md#modifiedat)
- [name](UserProfile.md#name)

### Methods

- [dispatch](UserProfile.md#dispatch)
- [subscribe](UserProfile.md#subscribe)

## Constructors

### constructor

• **new UserProfile**(): [`UserProfile`](UserProfile.md)

#### Returns

[`UserProfile`](UserProfile.md)

#### Inherited from

[EventDispatcher](EventDispatcher.md).[constructor](EventDispatcher.md#constructor)

## Accessors

### createdAt

• `get` **createdAt**(): `Date`

Created at.

#### Returns

`Date`

#### Defined in

[storages/userProfile.ts:36](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/userProfile.ts#L36)

___

### email

• `get` **email**(): `string`

User email.

#### Returns

`string`

#### Defined in

[storages/userProfile.ts:26](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/userProfile.ts#L26)

___

### id

• `get` **id**(): `string`

User id.

#### Returns

`string`

#### Defined in

[storages/userProfile.ts:16](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/userProfile.ts#L16)

___

### isDeleted

• `get` **isDeleted**(): `boolean`

Is user deleted.

#### Returns

`boolean`

#### Defined in

[storages/userProfile.ts:31](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/userProfile.ts#L31)

___

### modifiedAt

• `get` **modifiedAt**(): `Date`

Modified at.

#### Returns

`Date`

#### Defined in

[storages/userProfile.ts:41](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/userProfile.ts#L41)

___

### name

• `get` **name**(): `string`

User name.

#### Returns

`string`

#### Defined in

[storages/userProfile.ts:21](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/userProfile.ts#L21)

## Methods

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

#### Defined in

[events.ts:22](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L22)

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

#### Defined in

[events.ts:35](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L35)
