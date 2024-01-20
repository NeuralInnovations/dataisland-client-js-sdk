import { type Disposable, DisposableContainer } from './disposable'

export interface Input<ET, DT> {
  type?: ET
  data: DT
}

export interface Event<ET, DT> extends Input<ET, DT> {
  unsubscribe: () => void
}

export interface EventSubscriber<ET, DT> {
  subscribe: (callback: (event: Event<ET, DT>) => void, type?: ET) => Disposable
}

export class EventDispatcher<ET, DT> implements EventSubscriber<ET, DT> {
  private _listeners: Array<{
    callback: (value: Event<ET, DT>) => void
    disposable: Disposable
  }> = []

  dispatch(input: Input<ET, DT>): void {
    this._listeners.slice().forEach(it => {
      const value = {
        type: input.type,
        data: input.data,
        unsubscribe: () => {
          it.disposable.dispose()
        }
      } satisfies Event<ET, DT>
      it.callback(value)
    })
  }

  subscribe(callback: (event: Event<ET, DT>) => void, type?: ET): Disposable {
    const container = new DisposableContainer()
    if (type !== undefined) {
      const cb = callback
      const listener = (evt: Event<ET, DT>): void => {
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
