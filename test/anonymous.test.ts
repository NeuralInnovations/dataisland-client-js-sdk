
import { UnitTest, appTest } from "../src/unitTest"
import { dataIslandApp } from "../src"
import { HOST, randomHash } from "./setup"

// const document = {
//   cookie: {
//     set: jest.fn(),
//     get: jest.fn()
//   }
// }


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
