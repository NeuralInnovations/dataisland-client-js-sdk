[@neuralinnovations/dataisland-sdk - v0.0.1-dev19](../../README.md) / [Exports](../modules.md) / Lifetime

# Class: Lifetime

Represents a lifetime.

## Table of contents

### Constructors

- [constructor](Lifetime.md#constructor)

### Properties

- [container](Lifetime.md#container)

### Accessors

- [isDisposed](Lifetime.md#isdisposed)

### Methods

- [add](Lifetime.md#add)
- [addCallback](Lifetime.md#addcallback)
- [defineNested](Lifetime.md#definenested)

## Constructors

### constructor

• **new Lifetime**(`container`): [`Lifetime`](Lifetime.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | [`DisposableContainer`](DisposableContainer.md) |

#### Returns

[`Lifetime`](Lifetime.md)

## Properties

### container

• `Private` `Readonly` **container**: [`DisposableContainer`](DisposableContainer.md)

## Accessors

### isDisposed

• `get` **isDisposed**(): `boolean`

Shows whether this lifetime is disposed.

#### Returns

`boolean`

## Methods

### add

▸ **add**(`disposable`): `this`

Adds a disposable to this lifetime.

#### Parameters

| Name | Type |
| :------ | :------ |
| `disposable` | [`Disposable`](../interfaces/Disposable.md) |

#### Returns

`this`

___

### addCallback

▸ **addCallback**(`callback`, `target?`): `this`

Adds a callback to this lifetime.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |
| `target?` | `unknown` |

#### Returns

`this`

___

### defineNested

▸ **defineNested**(): [`DisposableContainer`](DisposableContainer.md)

Define a new nested disposable to this lifetime.

#### Returns

[`DisposableContainer`](DisposableContainer.md)
