[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / BasicCredential

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

#### Defined in

[credentials.ts:23](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/credentials.ts#L23)

## Properties

### email

• `Readonly` **email**: `string`

#### Defined in

[credentials.ts:20](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/credentials.ts#L20)

___

### password

• `Readonly` **password**: `string`

#### Defined in

[credentials.ts:21](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/credentials.ts#L21)

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

[credentials.ts:29](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/credentials.ts#L29)
