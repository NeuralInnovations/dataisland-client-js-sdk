[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / BearerCredential

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

#### Defined in

[credentials.ts:68](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/credentials.ts#L68)

## Properties

### token

• `Readonly` **token**: `string`

#### Defined in

[credentials.ts:66](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/credentials.ts#L66)

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

[credentials.ts:73](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/credentials.ts#L73)
