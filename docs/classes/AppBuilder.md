[@neuralinnovations/dataisland-sdk - v0.6.45](../../README.md) / [Exports](../modules.md) / AppBuilder

# Class: AppBuilder

DataIsland App builder.

## Table of contents

### Constructors

- [constructor](AppBuilder.md#constructor)

### Accessors

- [env](AppBuilder.md#env)

### Methods

- [registerCommand](AppBuilder.md#registercommand)
- [registerMiddleware](AppBuilder.md#registermiddleware)
- [registerService](AppBuilder.md#registerservice)
- [useAutomaticDataCollectionEnabled](AppBuilder.md#useautomaticdatacollectionenabled)
- [useCredential](AppBuilder.md#usecredential)
- [useHost](AppBuilder.md#usehost)

## Constructors

### constructor

• **new AppBuilder**(): [`AppBuilder`](AppBuilder.md)

#### Returns

[`AppBuilder`](AppBuilder.md)

## Accessors

### env

• `get` **env**(): `Record`\<`string`, `any`\>

Set custom data.

#### Returns

`Record`\<`string`, `any`\>

## Methods

### registerCommand

▸ **registerCommand**\<`T`\>(`messageType`, `commandFactory`): [`AppBuilder`](AppBuilder.md)

Register a command to the app.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Command` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageType` | `Constructor`\<`T`\> |
| `commandFactory` | (`context`: [`Context`](Context.md)) => `CommandHandler`\<`T`\> \| (`context`: [`Context`](Context.md)) => (`context`: [`Context`](Context.md)) => `Promise`\<`void`\> |

#### Returns

[`AppBuilder`](AppBuilder.md)

___

### registerMiddleware

▸ **registerMiddleware**(`middleware`): [`AppBuilder`](AppBuilder.md)

Add a middleware to the app.

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | [`Middleware`](../modules.md#middleware) |

#### Returns

[`AppBuilder`](AppBuilder.md)

___

### registerService

▸ **registerService**\<`T`\>(`type`, `factory`): [`AppBuilder`](AppBuilder.md)

Register a service to the app.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Service` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Constructor`\<`T`\> |
| `factory` | (`context`: `ServiceContext`) => `T` |

#### Returns

[`AppBuilder`](AppBuilder.md)

___

### useAutomaticDataCollectionEnabled

▸ **useAutomaticDataCollectionEnabled**(`value`): [`AppBuilder`](AppBuilder.md)

GDPR compliant

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

[`AppBuilder`](AppBuilder.md)

___

### useCredential

▸ **useCredential**(`credential`): [`AppBuilder`](AppBuilder.md)

Credential of the app.

#### Parameters

| Name | Type |
| :------ | :------ |
| `credential` | [`CredentialBase`](CredentialBase.md) |

#### Returns

[`AppBuilder`](AppBuilder.md)

___

### useHost

▸ **useHost**(`host`): [`AppBuilder`](AppBuilder.md)

Host of the app.

#### Parameters

| Name | Type |
| :------ | :------ |
| `host` | `string` |

#### Returns

[`AppBuilder`](AppBuilder.md)
