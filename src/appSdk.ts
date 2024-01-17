import type { Lifetime } from './disposable'
import type { CredentialBase } from './credentials'
import type { Constructor } from './internal/registry'

/**
 * DataIsland App instance.
 */
export abstract class AppSdk {
  /**
   * The name of this app.
   */
  abstract get name(): string

  /**
   * The host of this app.
   */
  abstract get host(): string

  /**
   * The automaticDataCollectionEnabled of this app.
   */
  abstract get automaticDataCollectionEnabled(): boolean

  /**
   * The lifetime of this app.
   */
  abstract get lifetime(): Lifetime

  /**
   * The credential of this app.
   */
  abstract get credential(): CredentialBase | undefined

  abstract set credential(value: CredentialBase)

  /**
   * Gets the service registered with the given type.
   */
  abstract resolve: <T>(type: Constructor<T>) => T | undefined
}
