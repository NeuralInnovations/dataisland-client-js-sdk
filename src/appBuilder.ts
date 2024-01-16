import type { Middleware } from './middleware'
import type { CredentialBase } from './credentials'
import type { Service, ServiceContext } from './services/service'
import type { Constructor } from './internal/registry'

/**
 * DataIsland App builder.
 */
export abstract class AppBuilder {
  /**
   * Add a middleware to the app.
   */
  abstract addMiddleware(middleware: Middleware): AppBuilder

  /**
   * Host of the app.
   */
  abstract useHost(host: string): AppBuilder

  /**
   * GDPR compliant
   */
  abstract useAutomaticDataCollectionEnabled(value: boolean): AppBuilder

  /**
   * Credential of the app.
   */
  abstract useCredential(credential: CredentialBase): AppBuilder

  /**
   * Register a service to the app.
   * @param type
   * @param factory
   */
  abstract registerService<T extends Service>(
    type: Constructor<T>,
    factory: (context: ServiceContext) => T
  ): AppBuilder
}
