import { DataIslandAppImpl } from "./app.impl"
import { type AppBuilder } from "../appBuilder"
import { DataIslandApp } from "../dataIslandApp"

export async function _createApp(
  name: string,
  setup?: (builder: AppBuilder) => Promise<void>
): Promise<DataIslandApp> {
  const app = new DataIslandAppImpl(name)
  await app.initialize(setup)
  return app
}
