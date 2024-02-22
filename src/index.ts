import { version } from "../package.json"
import { _createApp } from "./internal/createApp.impl"
import { type AppBuilder } from "./appBuilder"
import { type DataIslandApp } from "./dataIslandApp"

export * from "./events"
export * from "./disposable"
export * from "./credentials"
export * from "./dataIslandApp"
export * from "./appBuilder"
export * from "./context"
export * from "./middleware"
export * from "./dto/chatResponse"
export * from "./dto/accessGroupResponse"
export * from "./dto/userInfoResponse"
export * from "./dto/workspacesResponse"
export * from "./storages/organizations/organizations"
export * from "./storages/organizations/organization"
export * from "./storages/workspaces/workspaces"
export * from "./storages/workspaces/workspace"
export * from "./storages/groups/groups"
export * from "./storages/user/userProfile"
export * from "./storages/files/files"
export * from "./storages/files/file"
export * from "./storages/files/filesPage"
export * from "./storages/chats/chats"
export * from "./storages/chats/chat"

// map of apps that are not ready to be used
const _appsNotReady = new Map<string, Promise<DataIslandApp>>()
// map of apps that are ready to be used
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
