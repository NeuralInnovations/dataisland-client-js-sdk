[@neuralinnovations/dataisland-sdk - v0.4.1](../../README.md) / [Exports](../modules.md) / CustomCredential

# Class: CustomCredential

DataIsland App credential.

## Hierarchy

- [`CredentialBase`](CredentialBase.md)

  ↳ **`CustomCredential`**

## Table of contents

### Constructors

- [constructor](CustomCredential.md#constructor)

### Properties

- [schema](CustomCredential.md#schema)
- [token](CustomCredential.md#token)

### Methods

- [onRegister](CustomCredential.md#onregister)

## Constructors

### constructor

• **new CustomCredential**(`schema`, `token`): [`CustomCredential`](CustomCredential.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `string` |
| `token` | `string` \| [`TokenProvider`](../modules.md#tokenprovider) |

#### Returns

[`CustomCredential`](CustomCredential.md)

#### Overrides

[CredentialBase](CredentialBase.md).[constructor](CredentialBase.md#constructor)

## Properties

### schema

• `Readonly` **schema**: `string`

___

### token

• `Readonly` **token**: `string` \| [`TokenProvider`](../modules.md#tokenprovider)

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
