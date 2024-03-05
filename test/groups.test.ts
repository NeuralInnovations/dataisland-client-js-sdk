import { testInOrganization } from "./setup"
import { GroupImpl } from "../src/storages/groups/group.impl"
import { appTest, UnitTest } from "../src/unitTest"

test("Groups", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInOrganization(async (app, org) => {
      const initialGroupsCount = org.accessGroups.collection.length

      const groupPromise = org.accessGroups.create("Test group", { isAdmin: true }, ["123"])
      const mockGroupPromise = org.accessGroups.create("", { isAdmin: true }, ["123"])
      await expect(mockGroupPromise).rejects.toThrow("Group create, name is empty")

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

      expect(group.workspaces).not.toBeUndefined()
      expect(group.workspaces).not.toBeNull()

      expect(group.group.name).not.toBeUndefined()
      expect(group.group.name).not.toBeNull()
      expect(group.group.name.trim()).not.toBe("")
      expect(group.group.name).toBe("Test group")

      expect(group.members).not.toBeUndefined()
      expect(group.members).not.toBeNull()

      expect(org.accessGroups.get(group.id)).toBe(group)

      expect(org.accessGroups.collection.length).toBe(initialGroupsCount + 1)

      // setName
      const newName = "New Group Name"

      await group.setName(newName)

      expect(group.group.name).toBe("New Group Name")

      await expect(group.setName("")).rejects.toThrow("Groups change, name is empty")

      // setPermits
      const permits = { isAdmin: true }
      await expect(group.setPermits(permits)).resolves.not.toThrow()

      // setWorkspaces
      const workspaces = ["workspace1", "workspace2", "workspace3"]
      await group.setWorkspaces(workspaces)
      await expect(group.setWorkspaces(workspaces)).resolves.not.toThrow("Group add workspaces, workspaces is undefined or null")
      expect(group.workspaces).not.toBeUndefined()
      expect(group.workspaces).not.toBeNull()

      // setMembersIds
      expect(group.members.length).toBe(0)
      await expect(group.setMembersIds([app.userProfile.id, app.userProfile.id])).resolves.not.toThrow()
      await expect(group.removeMembers([group.members[0].id])).rejects.toThrow("Can't delete all group's members.")

      await expect(group.setMembersIds(workspaces)).resolves.not.toThrow("Group add members, members is undefined or null")

      // delete
      await expect(org.accessGroups.delete(group.id)).resolves.not.toThrow()

      expect(org.accessGroups.collection.length).toBe(initialGroupsCount)

      expect((<GroupImpl>group).isDisposed).toBe(true)
    })
  })
})
