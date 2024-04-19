[@neuralinnovations/dataisland-sdk - v0.0.1-dev36](../../README.md) / [Exports](../modules.md) / AnonymousCredential

# Class: AnonymousCredential

DataIsland App credential.

## Hierarchy

- [`CredentialBase`](CredentialBase.md)

  ↳ **`AnonymousCredential`**

## Table of contents

### Constructors

- [constructor](AnonymousCredential.md#constructor)

### Properties

- [token](AnonymousCredential.md#token)

### Methods

- [onRegister](AnonymousCredential.md#onregister)

## Constructors

### constructor

• **new AnonymousCredential**(`token`): [`AnonymousCredential`](AnonymousCredential.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

[`AnonymousCredential`](AnonymousCredential.md)

#### Overrides

[CredentialBase](CredentialBase.md).[constructor](CredentialBase.md#constructor)

## Properties

### token

• `Readonly` **token**: `string`

## Methods

### onRegister

▸ **onRegister**(`lifetime`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifetime` | [`Lifetime`](Lifetime.md) |
| `context` | [`Context`](Context.md) |

#### Returns

`void`

#### Overrides

[CredentialBase](CredentialBase.md).[onRegister](CredentialBase.md#onregister)
