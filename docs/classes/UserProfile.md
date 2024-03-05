[@neuralinnovations/dataisland-sdk - v0.0.1-dev23](../../README.md) / [Exports](../modules.md) / UserProfile

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
