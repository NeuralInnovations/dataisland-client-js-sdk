import { appTest, appTestCurrent, UnitTest } from "../src/unitTest"

test("SDK, unitTest", async () => {
  expect(appTestCurrent()).toBe(UnitTest.DO_NOTHING)
  expect(
    await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, () => {
      expect(appTestCurrent()).toBe(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG)
    })
  )
  expect(
    await appTest(
      UnitTest.DO_NOT_PRINT_INITIALIZED_LOG,
      async () => {
        expect(appTestCurrent()).toBe(
          UnitTest.DO_NOT_PRINT_INITIALIZED_LOG
        )
      }
    )
  )
  expect(appTestCurrent()).toBe(UnitTest.DO_NOTHING)
})
