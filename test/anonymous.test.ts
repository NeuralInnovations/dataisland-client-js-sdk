import { dataIslandApp } from "../src"
import { UnitTest, appTest } from "../src/unitTest"
import { HOST, randomHash } from "./setup"


test("Anonymous", async () => {
    await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
      // make random name
      const randomName = `org-test-${randomHash(20)}`
  
      // create app
      const app = await dataIslandApp(randomName, async builder => {
        builder.useHost(HOST)
      })

      expect(app).not.toThrow()
    })})
  