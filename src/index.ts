import { version } from '../package.json'
import { _createApp } from './internal/createApp.impl'
import { type AppBuilder } from './appBuilder'
import { type AppSdk } from './appSdk'

export * from './events'
export * from './types'
export * from './disposable'
export * from './types'
export * from './credentials'
export * from './appSdk'

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
        _appsNotReady.delete(name ?? DEFAULT_NAME)
      })
    _appsNotReady.set(name, appPromise)
  } else {
    if (setup !== undefined) {
      throw new Error(
        `App ${name} is initializing. You can't setup the same again.`
      )
    }
  }
  return await appPromise
}
