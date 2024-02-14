import { GroupImpl } from "../src/storages/groups/groups.impl"
import { testInOrganization } from "./setup"

test("Groups", async () => {
  await testInOrganization(async (app, org) => {
    const groupPromise = org.accessGroups.create("Test group", { isAdmin: true }, ["123"])

    await expect(groupPromise).resolves.not.toThrow()

    const group = await groupPromise

    expect(group).not.toBeUndefined()
    expect(group).not.toBeNull()
    expect(group).toBeInstanceOf(GroupImpl)

    expect(group.id).not.toBeUndefined()
    expect(group.id).not.toBeNull()
    expect(group.id.trim()).not.toBe("")

    expect(group.group.name).not.toBeUndefined()
    expect(group.group.name).not.toBeNull()
    expect(group.group.name.trim()).not.toBe("")

    expect(org.accessGroups.get(group.id)).toBe(group)

    expect(org.accessGroups.collection.length).toBe(1)

    await expect(org.accessGroups.delete(group.id)).resolves.not.toThrow()

    expect(org.accessGroups.collection.length).toBe(0)
    expect((<GroupImpl>group).isDisposed).toBe(true)
  })
})
