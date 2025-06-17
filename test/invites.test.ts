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
    await org.accessGroups.reload()
    const notAdminGroup = await org.accessGroups.collection.find(group => !group.group.regulation.isRegulateOrganization)
    if (notAdminGroup) {
      const invite_code = await org.createInviteCode([notAdminGroup.id])

      const user_codes = await firstUserApp.userProfile.getUserInvites()
      await expect(user_codes.inviteLinks[0].code).toBe(invite_code)

      const org_codes = await org.getOrganizationInvites()
      await expect(org_codes.inviteLinks[0].code).toBe(invite_code)

      // Create second user app
      const secondUserApp = await dataIslandApp(`${randomName}_Second`, async builder => {
        builder.useHost(HOST)
        builder.useCredential(new DebugCredential(newTestUserToken()))
      })

      const applyResponse = await secondUserApp.organizations.applyInviteCode(invite_code)

      await expect(applyResponse.organizationId).toBe(org.id)

      // Check duplicate invite for second user
      const second_response = await secondUserApp.organizations.applyInviteCode(invite_code)
      expect(second_response.isAddedToOrganization).toBe(false)

      // Check if applying new code for already invited user will also fail
      const second_invite_code = await org.createInviteCode([notAdminGroup.id])
      const new_second_response = await secondUserApp.organizations.applyInviteCode(second_invite_code)
      expect(new_second_response.isAddedToOrganization).toBe(false)

      // Check duplicate invite for first user
      const first_user_duplicate = await firstUserApp.organizations.applyInviteCode(invite_code)
      expect(first_user_duplicate.isAddedToOrganization).toBe(false)

      const secondUserOrg = secondUserApp.organizations.collection.find(invitedOrg => invitedOrg.id == org.id)
      // Check if new org is present on orgranizations list
      await expect(secondUserOrg).not.toBeUndefined()

      await expect(secondUserApp.organizations.leaveOrganization(secondUserOrg!.id)).resolves.not.toThrow()

      // Apply second invite code once more
      await secondUserApp.organizations.applyInviteCode(second_invite_code)

      await expect(org.deleteOrganizationMember([secondUserApp.userProfile.id])).resolves.not.toThrow()

      await expect(org.deleteInviteCode(invite_code)).resolves.not.toThrow()

    } else {
      throw new Error(`Not Admin group is not found for ${org.id}`)
    }
  })})
