/**
 * Represents an object that can be disposed.
 */
export interface Disposable {
  dispose: () => void
}

/**
 * A container for disposables.
 * @example
 * const container = new DisposableContainer();
 * container.add(someDisposable);
 * container.addCallback(() => console.log('disposed'));
 * container.dispose();
 */
export class DisposableContainer implements Disposable {
  private _disposables: Disposable[] = []
  private _isDisposed = false

  /**
   * Adds a disposable to this container.
   * @param disposable The disposable to add.
   * @returns The disposable container.
   */
  public add(disposable: Disposable): Disposable {
    this._throwIfDisposed()
    this._disposables.push(disposable)
    return disposable
  }

  /**
   * Adds a callback to be executed when this container is disposed.
   * @param callback The callback to execute.
   * @param target The target to bind the callback to.
   * @returns The disposable container.
   */
  public addCallback(callback: () => void, target?: any): Disposable {
    this._throwIfDisposed()
    return this.add({
      dispose() {
        callback.call(target)
      }
    })
  }

  /**
   * Disposes all disposables in this container.
   */
  public dispose(): void {
    this._throwIfDisposed()
    this._isDisposed = true
    this._disposables.forEach(it => {
      it.dispose()
    })
    this._disposables = []
  }

  /**
   * Throws an error if this container is disposed.
   */
  private _throwIfDisposed(): void {
    if (this._isDisposed) {
      throw new Error('Object disposed')
    }
  }
}

/**
 * Creates a disposable.
 * @param action The action to execute when disposed.
 * @param target The target to bind the action to.
 * @returns The disposable.
 */
export function disposable(action: () => void, target: any): Disposable {
  return new DisposableContainer().addCallback(() => {
    action.call(target)
  })
}
