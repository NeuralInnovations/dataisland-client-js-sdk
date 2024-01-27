import { dataIslandApp, DebugCredential } from "../src"
import { HOST, randomHash, TOKEN } from "./setup"
import { OrganizationImpl } from "../src/storages/organization.impl"

test("Organization", async () => {
  // make random name
  const randomName = `org-test-${randomHash()}`

  // create app
  const app = await dataIslandApp(randomName, async builder => {
    builder.useHost(HOST)
    builder.useCredential(new DebugCredential(TOKEN))
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

  // delete organization
  await expect(app.organizations.delete(org.id)).resolves.not.toThrow()
  expect((<OrganizationImpl>org).isDisposed).toBe(true)

  // check init length
  expect(app.organizations.collection.length).toBe(initLength)

  // check organization must be undefined because it was deleted
  expect(app.organizations.tryGet(org.id)).toBeUndefined()
})
