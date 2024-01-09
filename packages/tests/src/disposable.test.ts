import { DisposableContainer } from 'data-island/dist/disposable'

test('DisposableContainer', () => {
  const disposable = new DisposableContainer()
  expect(disposable.isDisposed).toBe(false)
  expect(disposable.lifetime.isDisposed).toBe(false)
  disposable.dispose()
  expect(disposable.isDisposed).toBe(true)
  expect(disposable.lifetime.isDisposed).toBe(true)
})

test('DisposableContainer, dispose order', () => {
  const indexes: number[] = []
  const disposable = new DisposableContainer()
  disposable.addCallback(() => {
    indexes.push(1)
  })

  const nested = disposable.defineNested()
  nested.addCallback(() => {
    indexes.push(2)
  })

  nested.lifetime.addCallback(() => {
    indexes.push(3)
  })

  nested.lifetime.defineNested().addCallback(() => {
    indexes.push(4)
  })

  nested.lifetime.defineNested().addCallback(() => {
    indexes.push(5)
  })

  disposable.dispose()

  expect(indexes).toEqual([5, 4, 3, 2, 1])
})
