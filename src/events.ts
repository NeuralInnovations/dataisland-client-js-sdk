import { type Disposable, DisposableContainer } from "./disposable"

export interface Input<EventType, DataType> {
  type?: EventType
  data: DataType
}

export interface Event<EventType, DataType> extends Input<EventType, DataType> {
  unsubscribe: () => void
}

export interface EventSubscriber<EventType, DataType> {
  subscribe: (callback: (event: Event<EventType, DataType>) => void, type?: EventType) => Disposable
}

export class EventDispatcher<EventType, DataType> implements EventSubscriber<EventType, DataType> {
  private _listeners: Array<{
    callback: (value: Event<EventType, DataType>) => void
    disposable: Disposable
  }> = []

  dispatch(input: Input<EventType, DataType>): void {
    this._listeners.slice().forEach(it => {
      const value = {
        type: input.type,
        data: input.data,
        unsubscribe: () => {
          it.disposable.dispose()
        }
      } satisfies Event<EventType, DataType>
      it.callback(value)
    })
  }

  subscribe(callback: (event: Event<EventType, DataType>) => void, type?: EventType): Disposable {
    const container = new DisposableContainer()
    if (type !== undefined) {
      const cb = callback
      const listener = (evt: Event<EventType, DataType>): void => {
        if (evt.type === type) {
          cb(evt)
        }
      }
      const value = {
        callback: listener,
        disposable: container
      }
      container.addCallback(() => {
        this._listeners = this._listeners.filter(it => it !== value)
      }, this)

      this._listeners.push(value)

      return container
    }

    const value = {
      callback,
      disposable: container
    }
    container.addCallback(() => {
      this._listeners = this._listeners.filter(it => it !== value)
    }, this)
    this._listeners.push(value)
    return container
  }
}
