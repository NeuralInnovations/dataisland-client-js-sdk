[@neuralinnovations/dataisland-sdk - v0.0.1-dev63](../../README.md) / [Exports](../modules.md) / DebugCredential

# Class: DebugCredential

DataIsland App credential.

## Hierarchy

- [`CredentialBase`](CredentialBase.md)

  ↳ **`DebugCredential`**

## Table of contents

### Constructors

- [constructor](DebugCredential.md#constructor)

### Properties

- [token](DebugCredential.md#token)

### Methods

- [onRegister](DebugCredential.md#onregister)

## Constructors

### constructor

• **new DebugCredential**(`token`): [`DebugCredential`](DebugCredential.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

[`DebugCredential`](DebugCredential.md)

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
