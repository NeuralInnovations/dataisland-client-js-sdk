[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / DisposableContainer

# Class: DisposableContainer

A container for disposables.
Last added, first disposed.

**`Example`**

```ts
const container = new DisposableContainer();
container.add(someDisposable);
container.addCallback(() => console.log('disposed'));
container.dispose();
```

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Table of contents

### Constructors

- [constructor](DisposableContainer.md#constructor)

### Properties

- [\_disposables](DisposableContainer.md#_disposables)
- [\_isDisposed](DisposableContainer.md#_isdisposed)
- [\_lifetime](DisposableContainer.md#_lifetime)

### Accessors

- [isDisposed](DisposableContainer.md#isdisposed)
- [lifetime](DisposableContainer.md#lifetime)

### Methods

- [\_throwIfDisposed](DisposableContainer.md#_throwifdisposed)
- [add](DisposableContainer.md#add)
- [addCallback](DisposableContainer.md#addcallback)
- [defineNested](DisposableContainer.md#definenested)
- [dispose](DisposableContainer.md#dispose)

## Constructors

### constructor

• **new DisposableContainer**(): [`DisposableContainer`](DisposableContainer.md)

#### Returns

[`DisposableContainer`](DisposableContainer.md)

## Properties

### \_disposables

• `Private` **\_disposables**: [`Disposable`](../interfaces/Disposable.md)[] = `[]`

#### Defined in

[disposable.ts:56](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L56)

___

### \_isDisposed

• `Private` **\_isDisposed**: `boolean` = `false`

#### Defined in

[disposable.ts:57](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L57)

___

### \_lifetime

• `Private` `Optional` **\_lifetime**: [`Lifetime`](Lifetime.md)

#### Defined in

[disposable.ts:58](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L58)

## Accessors

### isDisposed

• `get` **isDisposed**(): `boolean`

Gets whether this container is disposed.

#### Returns

`boolean`

#### Defined in

[disposable.ts:63](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L63)

___

### lifetime

• `get` **lifetime**(): [`Lifetime`](Lifetime.md)

Define new lifetime.

#### Returns

[`Lifetime`](Lifetime.md)

#### Defined in

[disposable.ts:70](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L70)

## Methods

### \_throwIfDisposed

▸ **_throwIfDisposed**(): `void`

Throws an error if this container is disposed.

#### Returns

`void`

#### Defined in

[disposable.ts:133](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L133)

___

### add

▸ **add**(`disposable`): [`Disposable`](../interfaces/Disposable.md)

Adds a disposable to this container.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `disposable` | [`Disposable`](../interfaces/Disposable.md) | The disposable to add. |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

The disposable container.

#### Defined in

[disposable.ts:79](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L79)

___

### addCallback

▸ **addCallback**(`callback`, `target?`): [`Disposable`](../interfaces/Disposable.md)

Adds a callback to be executed when this container is disposed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | () => `void` | The callback to execute. |
| `target?` | `unknown` | The target to bind the callback to. |

#### Returns

[`Disposable`](../interfaces/Disposable.md)

The disposable container.

#### Defined in

[disposable.ts:91](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L91)

___

### defineNested

▸ **defineNested**(): [`DisposableContainer`](DisposableContainer.md)

Defines a nested disposable container.

#### Returns

[`DisposableContainer`](DisposableContainer.md)

#### Defined in

[disposable.ts:103](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L103)

___

### dispose

▸ **dispose**(): `void`

Disposes all disposables in this container. Last added, first disposed.

#### Returns

`void`

#### Implementation of

[Disposable](../interfaces/Disposable.md).[dispose](../interfaces/Disposable.md#dispose)

#### Defined in

[disposable.ts:118](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/disposable.ts#L118)
