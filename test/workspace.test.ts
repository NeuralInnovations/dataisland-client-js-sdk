import {
  OrganizationImpl
} from "../src/storages/organizations/organization.impl"
import { WorkspaceImpl } from "../src/storages/workspaces/workspace.impl"
import { testInOrganization, testInWorkspace } from "./setup"
import { appTest, UnitTest } from "../src/unitTest"

test("Workspace create / delete", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInOrganization(async (app, org) => {
      // save init length
      const initWorkspaceCount = org.workspaces.collection.length

      // create workspace
      const wsPromise = org.workspaces.create(
        "test-workspace",
        "test-workspace-description",
        {
          isCreateNewGroup: true,
          newGroupName: "Group 1",
          groupIds: ["group1"]
        }
      )
      // check not throw
      await expect(wsPromise).resolves.not.toThrow()
      await expect(org.workspaces.create("", "test-workspace-description")).rejects.toThrow("Name is required, must be not empty")
      await expect(org.workspaces.create("test-workspace", "")).rejects.toThrow("Description is required, must be not empty")

      // check to throw
      await expect(org.workspaces.create("test-workspace", "test-workspace-description", {
        isCreateNewGroup: true,
        newGroupName: "Group 1",
        groupIds: []
      })).rejects.toThrow("groupIds is required, must be not empty")

      // get workspace
      const ws = await wsPromise

      // check exists
      expect(ws).not.toBeUndefined()

      // check exists
      expect(ws).not.toBeNull()

      // check name
      expect(ws.name).toBe("test-workspace")

      // check description
      expect(ws.description).toBe("test-workspace-description")

      // check collection length
      expect(app.organizations.get(org.id).workspaces.collection.length).toBe(
        initWorkspaceCount + 1
      )

      // check collection length
      expect(org.workspaces.collection.length).toBe(initWorkspaceCount + 1)

      // check get
      expect(org.workspaces.get(ws.id)).toBe(ws)

      // check tryGet
      expect(org.workspaces.tryGet(ws.id)).toBe(ws)

      // check contains
      expect(org.workspaces.contains(ws.id)).toBe(true)

      // check delete
      await expect(org.workspaces.delete(ws.id)).resolves.not.toThrow()

      expect(org.workspaces.contains(ws.id)).toBe(false)

      const organization = new OrganizationImpl(app.context)
      const workspace = new WorkspaceImpl(organization, app.context)
      expect(() => {
        workspace.id
      }).toThrow("Workspace is not loaded.")
      expect(() => {
        workspace.name
      }).toThrow("Workspace is not loaded.")
      expect(() => {
        workspace.description
      }).toThrow("Workspace is not loaded.")
    })
  })
})

test("Workspace, change", async () => {
  await appTest(UnitTest.DO_NOT_START_SDK, async () => {
    await testInWorkspace(async (app, org, ws) => {
      const newName = "new-name"
      const newDescription = "new-name"

      expect(ws.name).not.toBe(newName)

      // rename
      await ws.change(newName, newDescription)

      // check name
      expect(ws.name).toBe(newName)

      // check description
      expect(ws.description).toBe(newDescription)

      const organization = new OrganizationImpl(app.context)
      const workspaceImpl = new WorkspaceImpl(organization, app.context)
      await expect(workspaceImpl.change(newName, newDescription)).rejects.toThrow("Workspace is not loaded.")
    })
  })
})
