[@neuralinnovations/dataisland-sdk - v0.0.1-dev25](../../README.md) / [Exports](../modules.md) / Context

# Class: Context

DataIsland App context.

## Table of contents

### Constructors

- [constructor](Context.md#constructor)

### Properties

- [appName](Context.md#appname)
- [lifetime](Context.md#lifetime)
- [registry](Context.md#registry)

### Methods

- [execute](Context.md#execute)
- [resolve](Context.md#resolve)

## Constructors

### constructor

• **new Context**(`registry`, `lifetime`, `appName`): [`Context`](Context.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `Registry` |
| `lifetime` | [`Lifetime`](Lifetime.md) |
| `appName` | `string` |

#### Returns

[`Context`](Context.md)

## Properties

### appName

• `Readonly` **appName**: `string`

___

### lifetime

• `Readonly` **lifetime**: [`Lifetime`](Lifetime.md)

___

### registry

• `Private` `Readonly` **registry**: `Registry`

## Methods

### execute

▸ **execute**\<`T`\>(`command`): `Promise`\<`void`\>

Execute a command.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Command` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `command` | `T` | to execute |

#### Returns

`Promise`\<`void`\>

___

### resolve

▸ **resolve**\<`T`\>(`type`): `undefined` \| `T`

Resolve a service from the context.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `Constructor`\<`T`\> | of the service |

#### Returns

`undefined` \| `T`
