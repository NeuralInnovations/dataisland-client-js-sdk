
import { UnitTest, appTest } from "../src/unitTest"
//import { dataIslandApp } from "../src"
//import { HOST, randomHash } from "./setup"


test("Anonymous", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {

    // jest.spyOn(document, 'cookie', 'set');

    // jest.spyOn(document, 'cookie', 'get');

    // // make random name
    // const randomName = `org-test-${randomHash(20)}`
  
    // // create app
    // const app = await dataIslandApp(randomName, async builder => {
    //   builder.useHost(HOST)
    // })

    // expect(app).not.toThrow()
  })})
  