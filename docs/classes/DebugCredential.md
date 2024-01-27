[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / DebugCredential

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

#### Defined in

[credentials.ts:46](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/credentials.ts#L46)

## Properties

### token

• `Readonly` **token**: `string`

#### Defined in

[credentials.ts:44](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/credentials.ts#L44)

## Methods

### onRegister

▸ **onRegister**(`lifetime`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifetime` | [`Lifetime`](Lifetime.md) |
| `context` | `Context` |

#### Returns

`void`

#### Overrides

[CredentialBase](CredentialBase.md).[onRegister](CredentialBase.md#onregister)

#### Defined in

[credentials.ts:51](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/credentials.ts#L51)
