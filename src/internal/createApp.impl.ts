import { AppImplementation } from "./app.impl"
import { type AppBuilder } from "../appBuilder"
import { AppSdk } from "../appSdk"

export async function _createApp(
  name: string,
  setup?: (builder: AppBuilder) => Promise<void>
): Promise<AppSdk> {
  const app = new AppImplementation(name)
  await app.initialize(setup)
  return app
}
