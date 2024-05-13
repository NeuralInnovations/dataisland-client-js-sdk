import { DebugCredential, dataIslandApp } from "../src"
import { UnitTest, appTest } from "../src/unitTest"
import { HOST, newTestUserToken, randomHash } from "./setup"


test("Invites", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    // Make random name
    const randomName = `org-test-${randomHash(20)}`
  
    // Create first user app
    const firstUserApp = await dataIslandApp(randomName, async builder => {
      builder.useHost(HOST)
      builder.useCredential(new DebugCredential(newTestUserToken()))
    })
    // Create test organization and fin admin group
    const org = await firstUserApp.organizations.create(randomName, "Test description")
    const adminGroup = await org.accessGroups.collection.find(group => group.group.regulation.isRegulateOrganization)
    if (adminGroup) {
      const invite_code = await org.createInviteCode([adminGroup.id])

      // Create second user app
      const secondUserApp = await dataIslandApp(`${randomName}_Second`, async builder => {
        builder.useHost(HOST)
        builder.useCredential(new DebugCredential(newTestUserToken()))
      })

      await secondUserApp.organizations.applyInviteCode(invite_code)

      // Check duplicate invite for second user
      await expect(secondUserApp.organizations.applyInviteCode(invite_code)).rejects.toThrow("Invite code validation failed.")

      // Check if applying new code for already invited user will also fail
      const second_invite_code = await org.createInviteCode([adminGroup.id])
      await expect(secondUserApp.organizations.applyInviteCode(second_invite_code)).rejects.toThrow("Invite code validation failed.")
        
      // Check duplicate invite for first user
      await expect(firstUserApp.organizations.applyInviteCode(invite_code)).rejects.toThrow("Invite code validation failed.")

      // Check if new org is present on orgranizations list
      await expect(secondUserApp.organizations.collection.find(invitedOrg => invitedOrg.id == org.id)).not.toBeUndefined()
    } else {
      throw new Error(`Admin group is not found for ${org.id}`)
    }
  })})