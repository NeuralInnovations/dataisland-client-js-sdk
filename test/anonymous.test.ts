import { UnitTest, appTest } from "../src/unitTest"
import { dataIslandApp } from "../src"
import { HOST, randomHash } from "./setup"

test.skip("Anonymous", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {

    // make random name
    const randomName = `org-test-${randomHash(20)}`

    // create app
    const app = dataIslandApp(randomName, async builder => {
      builder.useHost(HOST)
    })

    await expect(app).resolves.not.toThrow()
  })
})
