[@neuralinnovations/dataisland-sdk - v0.0.1-dev56](../../README.md) / [Exports](../modules.md) / Context

# Class: Context

DataIsland App context.

## Table of contents

### Constructors

- [constructor](Context.md#constructor)

### Properties

- [app](Context.md#app)
- [lifetime](Context.md#lifetime)
- [registry](Context.md#registry)

### Methods

- [execute](Context.md#execute)
- [resolve](Context.md#resolve)

## Constructors

### constructor

• **new Context**(`registry`, `lifetime`, `app`): [`Context`](Context.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `Registry` |
| `lifetime` | [`Lifetime`](Lifetime.md) |
| `app` | [`DataIslandApp`](DataIslandApp.md) |

#### Returns

[`Context`](Context.md)

## Properties

### app

• `Readonly` **app**: [`DataIslandApp`](DataIslandApp.md)

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
