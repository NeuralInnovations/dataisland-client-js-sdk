import { version } from "../package.json"
import { _createApp } from "./internal/createApp.impl"
import { type AppBuilder } from "./appBuilder"
import { type DataIslandApp } from "./dataIslandApp"

export * from "./events"
export * from "./disposable"
export * from "./credentials"
export * from "./dataIslandApp"
export * from "./storages/organizations"
export * from "./storages/organization"
export * from "./storages/workspaces"
export * from "./storages/workspace"
export * from "./storages/groups"
export * from "./storages/userProfile"
export * from "./storages/files"
export * from "./storages/file"
export * from "./storages/filesPage"
export * from "./storages/chats"
export * from "./storages/chat"

const _appsNotReady = new Map<string, Promise<DataIslandApp>>()
const _appsReady = new Map<string, DataIslandApp>()

/**
 * Current SDK version.
 */
export const SDK_VERSION = version

/**
 * Default DataIsland App name.
 */
export const DEFAULT_NAME = "[DEFAULT]"

/**
 * Default DataIsland App host.
 */
export const DEFAULT_HOST = "https://api.dataisland.com.ua"

/**
 * Returns a list of DataIsland App instances.
 */
export function dataIslandInstances(): DataIslandApp[] {
  return Array.from(_appsReady.values())
}

/**
 * Returns a DataIsland App instance.
 * @param name Optional The name of the app.
 * @param setup Optional setup function.
 * @returns A DataIsland App instance.
 * @example
 * ```js
 * import { dataIslandApp, DEFAULT_NAME } from '@neuralinnovations/dataisland-sdk'
 *
 * const app = await dataIslandApp(DEFAULT_NAME, builder => {
 *  builder.useHost("https://dataisland.com.ua")
 *  builder.useAutomaticDataCollectionEnabled(true)
 *  builder.useCredential(new BasicCredential("email", "password"))
 *  })
 * ```
 */
export async function dataIslandApp(
  name?: string,
  setup?: (builder: AppBuilder) => Promise<void>
): Promise<DataIslandApp> {
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
        `DataIsland ${name} is initializing. You can't setup the same again.`
      )
    }
  }
  return await appPromise
}

export { File } from "./storages/file"
export { FilesPage } from "./storages/filesPage"
