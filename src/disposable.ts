/**
 * Represents an object that can be disposed.
 */
export interface Disposable {
  dispose(): void
}

/**
 * Represents a lifetime.
 */
export class Lifetime {
  constructor(private readonly container: DisposableContainer) {
  }

  /**
   * Define a new nested disposable to this lifetime.
   */
  public defineNested(): DisposableContainer {
    return this.container.defineNested()
  }

  /**
   * Shows whether this lifetime is disposed.
   */
  public get isDisposed(): boolean {
    return this.container.isDisposed
  }

  /**
   * Adds a disposable to this lifetime.
   */
  public add(disposable: Disposable): this {
    this.container.add(disposable)
    return this
  }

  /**
   * Adds a callback to this lifetime.
   */
  public addCallback(callback: () => void, target?: unknown): this {
    this.container.addCallback(callback, target)
    return this
  }
}

/**
 * A container for disposables.
 * Last added, first disposed.
 * @example
 * const container = new DisposableContainer();
 * container.add(someDisposable);
 * container.addCallback(() => console.log('disposed'));
 * container.dispose();
 */
export class DisposableContainer implements Disposable {
  private _disposables: Disposable[] = []
  private _isDisposed = false
  private _lifetime?: Lifetime

  /**
   * Gets whether this container is disposed.
   */
  public get isDisposed(): boolean {
    return this._isDisposed
  }

  /**
   * Define new lifetime.
   */
  public get lifetime(): Lifetime {
    return this._lifetime ?? (this._lifetime = new Lifetime(this))
  }

  /**
   * Adds a disposable to this container.
   * @param disposable The disposable to add.
   * @returns The disposable container.
   */
  public add(disposable: Disposable): Disposable {
    this._throwIfDisposed("Cannot add disposable to disposed container.")

    this._disposables.push(disposable)
    return disposable
  }

  /**
   * Adds a callback to be executed when this container is disposed.
   * @param callback The callback to execute.
   * @param target The target to bind the callback to.
   * @returns The disposable container.
   */
  public addCallback(callback: () => void, target?: unknown): Disposable {
    this._throwIfDisposed("Cannot add callback to disposed container.")

    return this.add({
      dispose() {
        callback.call(target)
      }
    })
  }

  /**
   * Defines a nested disposable container.
   */
  defineNested(): DisposableContainer {
    this._throwIfDisposed("Cannot define nested disposable for disposed container.")

    const nested = new DisposableContainer()
    this._disposables.push(nested)
    nested.addCallback(() => {
      const index = this._disposables.indexOf(nested)
      if (index > -1) {
        this._disposables.splice(index, 1)
      }
    }, this)
    return nested
  }

  /**
   * Disposes all disposables in this container. Last added, first disposed.
   */
  public dispose(): void {
    // return if already disposed
    if (this._isDisposed) {
      return
    }

    // mark as disposed
    this._isDisposed = true

    // dispose all disposables
    this._disposables
      .slice()
      .reverse()
      .forEach(it => {
        it.dispose()
      })

    // clear disposables
    this._disposables = []
  }

  /**
   * Throws an error if this container is disposed.
   */
  private _throwIfDisposed(message: string): void {
    if (this._isDisposed) {
      throw new Error("Object disposed, but you try to use it: " + message)
    }
  }
}

/**
 * Creates a disposable.
 * @param action The action to execute when disposed.
 * @param target The target to bind the action to.
 * @returns The disposable.
 */
export function disposable(action: () => void, target: unknown): Disposable {
  return new DisposableContainer().addCallback(() => {
    action.call(target)
  })
}
