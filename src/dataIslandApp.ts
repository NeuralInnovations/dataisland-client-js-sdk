import type { Lifetime } from "./disposable"
import type { CredentialBase } from "./credentials"
import { Context } from "./context"
import type { Constructor } from "./internal/registry"
import { Organizations } from "./storages/organizations/organizations"
import { UserProfile } from "./storages/user/userProfile"

/**
 * DataIsland App instance.
 */
export abstract class DataIslandApp {
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

  /**
   * User's organizations.
   */
  abstract get organizations(): Organizations

  /**
   * User's profile.
   */
  abstract get userProfile(): UserProfile

  /**
   * Resolve a service from the app.
   * @param type
   */
  abstract resolve<T>(type: Constructor<T>): T | undefined
}
