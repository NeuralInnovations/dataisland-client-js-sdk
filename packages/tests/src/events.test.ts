import { EventDispatcher } from '../../app/src/events'

test('Events, test general', () => {
  enum ET {
    A,
    B
  }

  const dispatch = new EventDispatcher<ET, number>()

  let a1 = 0
  let a2 = 0
  let b1 = 0
  let b2 = 0

  const aDisposable1 = dispatch.subscribe((evt: { data: number }) => {
    a1 += evt.data
  }, ET.A)
  const aDisposable2 = dispatch.subscribe(evt => {
    if (evt.type === ET.A) a2 += evt.data
  })
  const bDisposable1 = dispatch.subscribe(evt => {
    b1 += evt.data
  }, ET.B)
  const bDisposable2 = dispatch.subscribe(evt => {
    if (evt.type === ET.B) b2 += evt.data
  })

  dispatch.dispatch({
    type: ET.A,
    data: 1
  })

  expect(a1).toBe(1)
  expect(a2).toBe(1)
  expect(b1).toBe(0)
  expect(b2).toBe(0)

  aDisposable1.dispose()

  dispatch.dispatch({
    type: ET.A,
    data: 2
  })
  dispatch.dispatch({
    type: ET.B,
    data: 3
  })

  expect(a1).toBe(1)
  expect(a2).toBe(3)
  expect(b1).toBe(3)
  expect(b2).toBe(3)

  aDisposable2.dispose()

  dispatch.dispatch({
    type: ET.A,
    data: 3
  })

  expect(a1).toBe(1)
  expect(a2).toBe(3)
  expect(b1).toBe(3)
  expect(b2).toBe(3)

  bDisposable1.dispose()
  bDisposable2.dispose()

  dispatch.dispatch({
    type: ET.B,
    data: 4
  })

  expect(a1).toBe(1)
  expect(a2).toBe(3)
  expect(b1).toBe(3)
  expect(b2).toBe(3)
})

test('Events, test this', () => {
  enum ET {
    A,
    B
  }

  const dispatch = new EventDispatcher<ET, number>()

  const a = {
    value: 0
  }
  const b = {
    value: 0
  }

  const aDisposable = dispatch.subscribe((evt: { data: number }) => {
    a.value += evt.data
  }, ET.A)
  const bDisposable = dispatch.subscribe((evt: { data: number }) => {
    b.value += evt.data
  }, ET.B)

  dispatch.dispatch({
    type: ET.A,
    data: 1
  })
  dispatch.dispatch({
    type: ET.B,
    data: 2
  })

  expect(a.value).toBe(1)
  expect(b.value).toBe(2)

  aDisposable.dispose()
  bDisposable.dispose()

  dispatch.dispatch({
    type: ET.A,
    data: 3
  })
  dispatch.dispatch({
    type: ET.B,
    data: 4
  })

  expect(a.value).toBe(1)
  expect(b.value).toBe(2)
})

test('Events, test unsubscribe', () => {
  const dispatch = new EventDispatcher<any, number>()

  let index = 0

  dispatch.subscribe(evt => {
    index += evt.data
    evt.unsubscribe()
  })
  dispatch.subscribe(evt => {
    index += evt.data
  })

  dispatch.dispatch({ data: 1 })

  expect(index).toBe(2)

  dispatch.dispatch({ data: 1 })

  expect(index).toBe(3)
})
