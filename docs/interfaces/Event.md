[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / Event

# Interface: Event\<EventType, DataType\>

## Type parameters

| Name |
| :------ |
| `EventType` |
| `DataType` |

## Hierarchy

- [`Input`](Input.md)\<`EventType`, `DataType`\>

  ↳ **`Event`**

## Table of contents

### Properties

- [data](Event.md#data)
- [type](Event.md#type)
- [unsubscribe](Event.md#unsubscribe)

## Properties

### data

• **data**: `DataType`

#### Inherited from

[Input](Input.md).[data](Input.md#data)

#### Defined in

[events.ts:5](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L5)

___

### type

• `Optional` **type**: `EventType`

#### Inherited from

[Input](Input.md).[type](Input.md#type)

#### Defined in

[events.ts:4](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L4)

___

### unsubscribe

• **unsubscribe**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[events.ts:9](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/events.ts#L9)
