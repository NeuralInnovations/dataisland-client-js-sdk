import { type AppSdk } from './index'
import { AppImplementation } from './internal/app.implementation'
import { type AppBuilder } from './appBuilder'

export async function _createApp(
  name: string,
  setup?: (builder: AppBuilder) => Promise<void>
): Promise<AppSdk> {
  const app = new AppImplementation(name)
  await app.initialize(setup)
  return app
}
