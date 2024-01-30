[@neuralinnovations/dataisland-sdk - v0.0.1-dev9](../../README.md) / [Exports](../modules.md) / File

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

___

### name

• `get` **name**(): `string`

File name.

#### Returns

`string`

## Methods

### status

▸ **status**(): `Promise`\<`FileProgressDto`\>

Get file status.

#### Returns

`Promise`\<`FileProgressDto`\>

___

### url

▸ **url**(): `Promise`\<`string`\>

Get temporary url.

#### Returns

`Promise`\<`string`\>
