import type { Middleware } from './middleware'
import type { CredentialBase } from './credentials'

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
}
