import {
  CustomCredential,
  dataIslandApp,
  DebugCredential, OrganizationApiKey,
  OrganizationsEvent,
  ResourceType,
  UploadFile
} from "../src"
import {HOST, newTestUserToken, randomHash, testInOrganization} from "./setup"
import {OrganizationImpl} from "../src/storages/organizations/organization.impl"
import {
  DeleteUserFullCommand
} from "../src/commands/deleteUserFullCommandHandler"
import {appTest, UnitTest} from "../src/unitTest"
import fs from "fs"

test.skip("Delete all organizations", async () => {
  const app = await dataIslandApp("delete-all", async builder => {
    builder.useHost(HOST)
    builder.useCredential(new DebugCredential(newTestUserToken()))
  })
  for (const organization of app.organizations.collection) {
    await app.organizations.delete(organization.id)
  }
})

test("Organization", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    // make random name
    const randomName = `org-test-${randomHash(20)}`

    // create app
    const app = await dataIslandApp(randomName, async builder => {
      builder.useHost(HOST)
      builder.useCredential(new DebugCredential(newTestUserToken()))
    })

    // save init length
    const initLength = app.organizations.collection.length

    // create organization
    const org = await app.organizations.create(
      randomName,
      "this is a unitTest description"
    )

    // check organization
    expect(org).not.toBeUndefined()
    expect(org).not.toBeNull()
    expect(org).toBeInstanceOf(OrganizationImpl)

    expect(org.id).not.toBeUndefined()
    expect(org.id).not.toBeNull()
    expect(org.id.trim()).not.toBe("")

    // check name
    expect(org.name).not.toBeUndefined()
    expect(org.name).not.toBeNull()
    expect(org.name.trim()).not.toBe("")

    // check description
    expect(org.description).not.toBeUndefined()
    expect(org.description).not.toBeNull()
    expect(org.description.trim()).not.toBe("")

    // check organizations
    expect(app.organizations.get(org.id)).toBe(org)
    expect(app.organizations.tryGet(org.id)).toBe(org)
    expect(app.organizations.collection.length).toBe(initLength + 1)

    const members = await app.organizations.get(org.id).members()

    expect(members.length).toBeGreaterThan(0)

    const test_description = "this is a updated unitTest description"
    // create organization
    await app.organizations.get(org.id).change(
      randomName,
      test_description
    )

    const buffer = fs.readFileSync("test/data/test_icon.png")
    const icon_obj: UploadFile = new File([new Blob([buffer])], "test_icon.png", {
      type: "image/png"
    })

    const iconId = await app.organizations.get(org.id).uploadIcon(icon_obj)

    const iconDataDirect = await app.organizations.getIconData(iconId)
    const iconDataNewest = await app.organizations.getNewestIcon(org.id, ResourceType.Organization)

    expect(iconDataDirect.iconId).toBe(iconDataNewest.iconId)

    await app.userProfile.fetch()

    expect(app.organizations.get(org.id).icon).toBe(iconId)

    await expect(app.organizations.deleteIcon(iconId)).resolves.not.toThrow()

    expect(org.description.trim()).toBe(test_description)

    await expect(org.statistics(new Date().getSeconds() - 100, new Date().getSeconds())).resolves.not.toThrow()
    await expect(org.membersStatistics(new Date().getSeconds() - 100, new Date().getSeconds())).resolves.not.toThrow()

    await expect(org.organizationLimits()).resolves.not.toThrow()
    await expect(org.limitSegments()).resolves.not.toThrow()
    await expect(org.userLimits()).resolves.not.toThrow()

    // delete organization
    await expect(app.organizations.delete(org.id)).resolves.not.toThrow()
    //expect((<OrganizationImpl>org).isDisposed).toBe(true)

    // check init length
    expect(app.organizations.collection.length).toBe(initLength)

    // check organization must be undefined because it was deleted
    expect(app.organizations.tryGet(org.id)).toBeUndefined()

    await testInOrganization(async (app, org) => {

      const organizations = app.organizations

      await expect(organizations.delete("123")).rejects.toThrow("Organization delete, id: 123 is not found")
      await expect(organizations.delete("")).rejects.toThrow("Organization delete, id is empty")

      const dispatchSpy = jest.spyOn(organizations, "dispatch")

      organizations.current = org.id
      expect(organizations.current).toBe(org.id)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: OrganizationsEvent.CURRENT_CHANGED,
        data: organizations.tryGet(org.id)
      })

    })

    await app.context.execute(new DeleteUserFullCommand())
  })
})

test("API keys and custom credentials test", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInOrganization(async (app, org) => {
      const accessGroupId = org.accessGroups.collection[0].id
      const apiKeyOrg: OrganizationApiKey = await org.createApiKey("testKey", [accessGroupId])
      const apiKey = apiKeyOrg.apiKey
      expect(apiKey).not.toBeNull()
      expect(apiKey).not.toBeUndefined()

      let keys = await org.getApiKeys()

      expect(keys[0].apiKey).toBe(apiKey)
      expect(keys[0].accessGroupInfo[0].id).toBe(accessGroupId)

      const token = await (org as OrganizationImpl).getTokenFromKey(apiKey, "test", "test", "test")

      const randomName = `org-${randomHash(20)}`
      const customCredentialsApp = await dataIslandApp(randomName, async builder => {
        builder.useHost(HOST)
        builder.useCredential(new CustomCredential(token.authSchemaName, token.userJwtToken))
        builder.registerMiddleware(async (req, next) => {
          // const url = req.url
          // console.log("REQUEST", url, req.method)
          const response = await next(req)
          // console.log("RESPONSE", url, response.status)
          return response
        })
      })

      await expect(customCredentialsApp.userProfile.fetch()).resolves.not.toThrow()

      await org.deleteApiKey(apiKey)

      keys = await org.getApiKeys()

      expect(keys.length).toBe(0)
    })
  })
})
