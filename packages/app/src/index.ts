import { version } from '../../../package.json'
import { _createApp } from './internal/createApp.impl'
import { type AppBuilder } from './appBuilder'
import { type Constructor } from './internal/registry'
import { type Lifetime } from './disposable'

export type { Events } from './events'
export type { Collection } from './types'
export * from './types'
export type { Disposable } from './disposable'

const _appsNotReady = new Map<string, Promise<AppSdk>>()
const _appsReady = new Map<string, AppSdk>()

/**
 * Current SDK version.
 */
export const SDK_VERSION = version

/**
 * Default DataIsland App name.
 */
export const DEFAULT_NAME = '[DEFAULT]'

/**
 * Default DataIsland App host.
 */
export const DEFAULT_HOST = 'https://dataisland.com.ua'

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
   * Gets the service registered with the given type.
   */
  resolve: <T>(type: Constructor<T>) => T | undefined
}

export function sdks(): AppSdk[] {
  return Array.from(_appsReady.values())
}

/**
 * Returns a DataIsland App instance.
 * @param name Optional The name of the app.
 * @param setup Optional setup function.
 * @returns A DataIsland App instance.
 * @example
 * ```js
 * import { appSdk } from 'data-island'
 *
 * const app = await appSdk("my-app", builder => {
 *  builder.useHost("https://dataisland.com.ua")
 *  builder.useAutomaticDataCollectionEnabled(true)
 *  builder.useCredential(new BasicCredential("email", "password"))
 *  })
 * ```
 */
export async function appSdk(
  name?: string,
  setup?: (builder: AppBuilder) => Promise<void>
): Promise<AppSdk> {
  name = name ?? DEFAULT_NAME

  let appPromise = _appsNotReady.get(name)
  if (appPromise === undefined) {
    appPromise = _createApp(name, setup)
    appPromise
      .then(app => {
        _appsReady.set(name ?? DEFAULT_NAME, app)
      })
      .catch(reason => {
        console.error(`Error: ${reason}`)
      })
    _appsNotReady.set(name, appPromise)
  }
  return await appPromise
}
