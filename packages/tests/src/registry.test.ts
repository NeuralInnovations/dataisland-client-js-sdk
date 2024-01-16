import { Registry } from 'dataisland-sdk/dist/internal/registry'

class TestClass {
  constructor(public readonly value: string) {}
}

test('Registry, test factory', () => {
  const registry = new Registry()

  const item = new TestClass('test1')
  registry.map(TestClass).asValue(item)
  expect(registry.get(TestClass)).toBe(item)

  let index = 0

  registry.map(TestClass).asFactory(TestClass, () => {
    index++
    return new TestClass(`test_${index}`)
  })

  expect(registry.get(TestClass)).toBeInstanceOf(TestClass)
  expect(registry.get(TestClass)).not.toBe(item)
  expect(registry.get(TestClass)).not.toBe(registry.get(TestClass))

  expect(registry.get(TestClass)?.value).toBe('test_5')
})

test('Registry, test value', () => {
  const registry = new Registry()

  const item = new TestClass('test1')
  registry.map(TestClass).asValue(item)
  expect(registry.get(TestClass)).toBeInstanceOf(TestClass)
  expect(registry.get(TestClass)).toBe(item)
})

test('Registry, test singleton', () => {
  const registry = new Registry()

  registry.map(TestClass).asSingleton(TestClass, () => new TestClass('test1'))
  const singleton = registry.get(TestClass)
  expect(singleton).toBeInstanceOf(TestClass)
  expect(singleton).toBe(registry.get(TestClass))
})
