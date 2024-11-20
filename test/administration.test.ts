import { UnitTest, appTest } from "../src/unitTest"
import {testInOrganization, testInWorkspace} from "./setup"

test("Administration libraries", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInOrganization(async (app, org) => {
      expect(org).not.toBeUndefined()

      const libraryId = await app.administration.libraries.createLibrary("name", "description", 1, true)
      const libraries = await app.administration.libraries.getLibraries()
      expect(libraries.length).toBeGreaterThan(0)
      await app.administration.libraries.deleteLibrary(libraryId)
    })
  })
})

test("Administration statistics", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInOrganization(async (app, org) => {
      expect(org).not.toBeUndefined()

      const organizations = await app.administration.statistic.getOrganizations(new Date(0), new Date(Date.now()))
      expect(organizations.organizationStats).not.toBeUndefined()
      expect(organizations.organizationStats).not.toBeNull()
      expect(organizations.organizationStats.length).toBeGreaterThan(0)

      const members = await app.administration.statistic.getOrganizationMembers(org.id, new Date(0), new Date(Date.now()))
      expect(members.membersStats).not.toBeUndefined()
      expect(members.membersStats).not.toBeNull()
    })
  })
})

test("Administration cheats", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInWorkspace(async (app, org, ws) => {
      expect(org).not.toBeUndefined()
      expect(ws).not.toBeUndefined()

      const testEmail = "test@test.com"

      await expect(app.administration.cheats.addEmailToWhitelist(testEmail, 10)).resolves.not.toThrow()

      const emails = await app.administration.cheats.getWhitelistEmails()
      expect(emails.emails.find(mail => mail === testEmail)).not.toBeUndefined()

      await expect(app.administration.cheats.removeEmailFromWhitelist(testEmail)).resolves.not.toThrow()

      const files = await app.administration.cheats.getBrokenFilesInfo(org.id, ws.id)
      expect(files.files.length).toBe(0)

      await expect(app.administration.cheats.deleteBrokenFiles(org.id, ws.id, true, true)).resolves.not.toThrow()

      await expect(app.administration.cheats.cleanRedisCache(true)).resolves.not.toThrow()
    })
  })
})
