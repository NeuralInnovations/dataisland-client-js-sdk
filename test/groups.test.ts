import { GroupImpl } from "../src/storages/groups/groups.impl"
import { testInOrganization } from "./setup"
test("Groups", async () => {
  await testInOrganization(async (app, org) => {
    const groupPromise = org.accessGroups.create("Test group", { isAdmin: true }, ["123"])
    const mockGroupPromise = org.accessGroups.create("", { isAdmin: true }, ["123"])
    expect(mockGroupPromise).rejects.toThrow("Group create, name is empty")

    await expect(groupPromise).resolves.not.toThrow()

    const group = await groupPromise

    expect(group).not.toBeUndefined()
    expect(group).not.toBeNull()
    expect(group).toBeInstanceOf(GroupImpl)

    expect(group.id).not.toBeUndefined()
    expect(group.id).not.toBeNull()
    expect(group.id.trim()).not.toBe("")

    const groupImpl = new GroupImpl(app.context, org)

    expect(() => groupImpl.id).toThrow("Access group is not loaded.")
    expect(() => groupImpl.group.name).toThrow("Access group is not loaded.")
    expect(() => groupImpl.members).toThrow("Access group is not loaded.")


    expect(group.getWorkspaces()).resolves.not.toThrow()

    console.log("group.getWorkspaces()", group.getWorkspaces())
 

    expect(group.group.name).not.toBeUndefined()
    expect(group.group.name).not.toBeNull()
    expect(group.group.name.trim()).not.toBe("")
    expect(group.group.name).toBe("Test group")

    expect(group.members).not.toBeUndefined()
    expect(group.members).not.toBeNull()

    expect(org.accessGroups.get(group.id)).toBe(group)

    expect(org.accessGroups.collection.length).toBe(1)


    // setName
    const newName = "New Group Name"

    await group.setName(newName)
    
    await expect(group.group.name).toBe("New Group Name")

    await expect(group.setName("")).rejects.toThrow("Groups change, name is empty")

    // setPermits
    const permits = { isAdmin: true }
    await expect(group.setPermits(permits)).resolves.not.toThrow()

    // setWorkspaces
    const workspaces = ["workspace1", "workspace2", "workspace3"]
    await group.setWorkspaces(workspaces)
    await expect(group.setWorkspaces(workspaces)).resolves.not.toThrow("Group add workspaces, workspaces is undefined or null")
    expect(group.getWorkspaces()).resolves.not.toThrow()


    // setMembersIds
    const membersIds = ["1", "2"]
    await group.setMembersIds(membersIds)
    await expect(group.setMembersIds(workspaces)).resolves.not.toThrow("Group add members, members is undefined or null")
    
    // delete
    await expect(org.accessGroups.delete(group.id)).resolves.not.toThrow()

    
    expect(org.accessGroups.collection.length).toBe(0)
    expect((<GroupImpl>group).isDisposed).toBe(true)

  })
})
