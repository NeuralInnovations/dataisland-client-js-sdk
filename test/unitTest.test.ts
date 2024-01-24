import { AppSdkUnitTest, UnitTest } from "../src/unitTest"

test("SDK, unitTest", async () => {
  expect(AppSdkUnitTest.current).toBe(UnitTest.DO_NOTHING)
  expect(
    await AppSdkUnitTest.test(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, () => {
      expect(AppSdkUnitTest.current).toBe(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG)
    })
  )
  expect(
    await AppSdkUnitTest.test(
      UnitTest.DO_NOT_PRINT_INITIALIZED_LOG,
      async () => {
        expect(AppSdkUnitTest.current).toBe(
          UnitTest.DO_NOT_PRINT_INITIALIZED_LOG
        )
      }
    )
  )
  expect(AppSdkUnitTest.current).toBe(UnitTest.DO_NOTHING)
})
