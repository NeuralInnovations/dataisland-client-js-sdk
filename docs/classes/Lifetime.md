[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / Lifetime

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

#### Defined in

[disposable.ts:12](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L12)

## Properties

### container

• `Private` `Readonly` **container**: [`DisposableContainer`](DisposableContainer.md)

#### Defined in

[disposable.ts:12](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L12)

## Accessors

### isDisposed

• `get` **isDisposed**(): `boolean`

Shows whether this lifetime is disposed.

#### Returns

`boolean`

#### Defined in

[disposable.ts:25](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L25)

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

#### Defined in

[disposable.ts:32](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L32)

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

#### Defined in

[disposable.ts:40](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L40)

___

### defineNested

▸ **defineNested**(): [`DisposableContainer`](DisposableContainer.md)

Define a new nested disposable to this lifetime.

#### Returns

[`DisposableContainer`](DisposableContainer.md)

#### Defined in

[disposable.ts:18](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L18)
