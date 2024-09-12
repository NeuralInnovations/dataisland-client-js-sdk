[@neuralinnovations/dataisland-sdk - v0.0.1-dev81](../../README.md) / [Exports](../modules.md) / CustomCredential

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
| `token` | `string` |

#### Returns

[`CustomCredential`](CustomCredential.md)

#### Overrides

[CredentialBase](CredentialBase.md).[constructor](CredentialBase.md#constructor)

## Properties

### schema

• `Readonly` **schema**: `string`

___

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
