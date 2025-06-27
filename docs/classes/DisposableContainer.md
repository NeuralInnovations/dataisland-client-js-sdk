[@neuralinnovations/dataisland-sdk - v0.6.38](../../README.md) / [Exports](../modules.md) / DisposableContainer

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

___

### \_isDisposed

• `Private` **\_isDisposed**: `boolean` = `false`

___

### \_lifetime

• `Private` `Optional` **\_lifetime**: [`Lifetime`](Lifetime.md)

## Accessors

### isDisposed

• `get` **isDisposed**(): `boolean`

Gets whether this container is disposed.

#### Returns

`boolean`

___

### lifetime

• `get` **lifetime**(): [`Lifetime`](Lifetime.md)

Define new lifetime.

#### Returns

[`Lifetime`](Lifetime.md)

## Methods

### \_throwIfDisposed

▸ **_throwIfDisposed**(`message`): `void`

Throws an error if this container is disposed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

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

___

### defineNested

▸ **defineNested**(): [`DisposableContainer`](DisposableContainer.md)

Defines a nested disposable container.

#### Returns

[`DisposableContainer`](DisposableContainer.md)

___

### dispose

▸ **dispose**(): `void`

Disposes all disposables in this container. Last added, first disposed.

#### Returns

`void`

#### Implementation of

[Disposable](../interfaces/Disposable.md).[dispose](../interfaces/Disposable.md#dispose)
