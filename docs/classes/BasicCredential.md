[@neuralinnovations/dataisland-sdk - v0.0.1-dev56](../../README.md) / [Exports](../modules.md) / BasicCredential

# Class: BasicCredential

DataIsland App credential.

## Hierarchy

- [`CredentialBase`](CredentialBase.md)

  ↳ **`BasicCredential`**

## Table of contents

### Constructors

- [constructor](BasicCredential.md#constructor)

### Properties

- [email](BasicCredential.md#email)
- [password](BasicCredential.md#password)

### Methods

- [onRegister](BasicCredential.md#onregister)

## Constructors

### constructor

• **new BasicCredential**(`email`, `password`): [`BasicCredential`](BasicCredential.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `email` | `string` |
| `password` | `string` |

#### Returns

[`BasicCredential`](BasicCredential.md)

#### Overrides

[CredentialBase](CredentialBase.md).[constructor](CredentialBase.md#constructor)

## Properties

### email

• `Readonly` **email**: `string`

___

### password

• `Readonly` **password**: `string`

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
