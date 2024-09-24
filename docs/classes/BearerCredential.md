[@neuralinnovations/dataisland-sdk - v0.0.1-dev83](../../README.md) / [Exports](../modules.md) / BearerCredential

# Class: BearerCredential

DataIsland App credential.

## Hierarchy

- [`CredentialBase`](CredentialBase.md)

  ↳ **`BearerCredential`**

## Table of contents

### Constructors

- [constructor](BearerCredential.md#constructor)

### Properties

- [token](BearerCredential.md#token)

### Methods

- [onRegister](BearerCredential.md#onregister)

## Constructors

### constructor

• **new BearerCredential**(`token`): [`BearerCredential`](BearerCredential.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

[`BearerCredential`](BearerCredential.md)

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
