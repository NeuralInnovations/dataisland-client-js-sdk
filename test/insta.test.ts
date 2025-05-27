import {appTest, UnitTest} from "../src/unitTest"
import {testInOrganization} from "./setup"


test.skip("Insta", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInOrganization(async (app, org) => {
      const updatePromise = org.instaAccounts.update()

      await expect(updatePromise).resolves.not.toThrow()

      expect(org.instaAccounts.accounts.length).toBe(0)
      expect(org.instaAccounts.posts.length).toBe(0)

      const createPromise = org.instaAccounts.add(
        "test",
        "password",
        "2fa",
        "",
        "",
        "")

      await expect(createPromise).resolves.not.toThrow()

      expect(org.instaAccounts.accounts.length).toBe(1)

    })})
})
