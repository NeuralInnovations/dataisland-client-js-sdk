import { version } from '../../../package.json'
import { _createApp } from './internal'
import { type AppBuilder } from './appBuilder'

export type { Events } from './events'
export type { Collection } from './types'
export * from './types'
export type { Disposable } from './disposable'

const _apps = new Map<string, AppSdk>()

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
   * Auth.
   */
  auth: () => Promise<void>
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
  if (name === undefined || name === null) {
    name = DEFAULT_NAME
  }

  let app = _apps.get(name)
  if (app === undefined) {
    app = await _createApp(name, setup)
    _apps.set(name, app)
  }
  return app
}
