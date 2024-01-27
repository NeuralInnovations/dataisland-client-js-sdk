[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / CredentialBase

# Class: CredentialBase

DataIsland App credential.

## Hierarchy

- **`CredentialBase`**

  ↳ [`DefaultCredential`](DefaultCredential.md)

  ↳ [`BasicCredential`](BasicCredential.md)

  ↳ [`DebugCredential`](DebugCredential.md)

  ↳ [`BearerCredential`](BearerCredential.md)

## Table of contents

### Constructors

- [constructor](CredentialBase.md#constructor)

### Methods

- [onRegister](CredentialBase.md#onregister)

## Constructors

### constructor

• **new CredentialBase**(): [`CredentialBase`](CredentialBase.md)

#### Returns

[`CredentialBase`](CredentialBase.md)

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

#### Defined in

[credentials.ts:9](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/credentials.ts#L9)
