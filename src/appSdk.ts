import type { Lifetime } from './disposable'
import type { CredentialBase } from './credentials'
import { Context } from './context'

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
   * The context of this app.
   */
  abstract get context(): Context
}
