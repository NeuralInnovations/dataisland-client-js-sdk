import type { Lifetime } from './disposable'
import type { CredentialBase } from './credentials'
import type { Constructor } from './internal/registry'

/**
 * DataIsland App instance.
 */
export interface AppSdk {
  /**
   * The name of this app.
   */
  get name(): string

  /**
   * The host of this app.
   */
  get host(): string

  /**
   * The automaticDataCollectionEnabled of this app.
   */
  get automaticDataCollectionEnabled(): boolean

  /**
   * The lifetime of this app.
   */
  get lifetime(): Lifetime

  /**
   * The credential of this app.
   */
  get credential(): CredentialBase | undefined

  set credential(value: CredentialBase)

  /**
   * Gets the service registered with the given type.
   */
  resolve: <T>(type: Constructor<T>) => T | undefined
}
