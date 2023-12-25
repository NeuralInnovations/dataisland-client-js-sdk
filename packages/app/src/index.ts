import { version } from '../../../package.json'
import { _createApp } from './internal'

export type { Events } from './events'
export type { Collection } from './types'
export * from './types'
export type { Disposable } from './disposable'

const _apps = new Map<string, App>()

/**
 * Current SDK version.
 */
export const SDK_VERSION = version

/**
 * Default DataIsland App name.
 */
export const DEFAULT_NAME = '[DEFAULT]'

/**
 * DataIsland App settings.
 */
export interface Settings {
  name: string | undefined
  host: string | undefined
  /**
   * GDPR compliant
   */
  automaticDataCollectionEnabled: boolean | undefined
}

/**
 * DataIsland App instance.
 */
export interface App {
  get name(): string

  get host(): string

  get settings(): Settings
}

/**
 * Returns a DataIsland App instance.
 * @param settings Optional settings. If none present, uses default settings.
 */
export function app(settings?: Settings | undefined): App {
  let name = DEFAULT_NAME
  if (settings !== undefined) {
    name = settings.name ?? DEFAULT_NAME
  }

  let app = _apps.get(name)
  if (app === undefined) {
    app = _createApp(name, settings)
    _apps.set(name, app)
  }
  return app
}
