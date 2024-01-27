[@neuralinnovations/dataisland-sdk](../../README.md) / [Exports](../modules.md) / File

# Class: File

File.

## Table of contents

### Constructors

- [constructor](File.md#constructor)

### Accessors

- [id](File.md#id)
- [name](File.md#name)

### Methods

- [status](File.md#status)
- [url](File.md#url)

## Constructors

### constructor

• **new File**(): [`File`](File.md)

#### Returns

[`File`](File.md)

## Accessors

### id

• `get` **id**(): `string`

File id.

#### Returns

`string`

#### Defined in

[storages/file.ts:12](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/file.ts#L12)

___

### name

• `get` **name**(): `string`

File name.

#### Returns

`string`

#### Defined in

[storages/file.ts:17](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/file.ts#L17)

## Methods

### status

▸ **status**(): `Promise`\<`FileProgressDto`\>

Get file status.

#### Returns

`Promise`\<`FileProgressDto`\>

#### Defined in

[storages/file.ts:27](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/file.ts#L27)

___

### url

▸ **url**(): `Promise`\<`string`\>

Get temporary url.

#### Returns

`Promise`\<`string`\>

#### Defined in

[storages/file.ts:22](https://github.com/NeuralInnovations/dataisland-client-js-sdk/blob/99d310d/src/storages/file.ts#L22)
