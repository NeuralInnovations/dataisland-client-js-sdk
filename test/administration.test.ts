import { UnitTest, appTest } from "../src/unitTest"
import { testInOrganization } from "./setup"

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
