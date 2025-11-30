
import { appTest, UnitTest } from "../src/unitTest"
import { testInOrganization } from "./setup"

test("Insta account add with video editing settings", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInOrganization(async (app, org) => {
      const updatePromise = org.instaAccounts.update()
      await expect(updatePromise).resolves.not.toThrow()

      const watermark = new File([new Blob(["wm"])], "watermark.png", { type: "image/png" })
      const createPromise = org.instaAccounts.add(
        "test_user",
        "password",
        "2fa_key",
        "proxy",
        "additional",
        "conversation",
        "folder",
        ["0 0 * * *"],
        "UTC",
        ["0 12 * * *"],
        "UTC",
        {
          minSpeedChange: 0.8,
          maxSpeedChange: 1.2,
          watermarkFile: watermark
        }
      )

      await expect(createPromise).resolves.not.toThrow()
    })
  })
})
