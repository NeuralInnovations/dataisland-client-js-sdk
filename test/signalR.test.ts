import { appTest, UnitTest } from "../src/unitTest"
import { testInOrganization, testInWorkspace } from "./setup"

const delay = (ms: number) => {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })
}

test("signalR", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInOrganization(async (app, org) => {
      const workspace = await org.workspaces.create("test1", "test1")
      await delay(200)
      await org.workspaces.delete(workspace.id)
      await delay(200)
    })
  })
})
