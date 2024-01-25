import { testInOrganization, testInWorkspace } from "./setup"

test("Workspace create / delete", async () => {
  await testInOrganization(async (app, org) => {
    // save init length
    const initWorkspaceCount = org.workspaces.collection.length

    // create workspace
    const wsPromise = org.workspaces.create(
      "test-workspace",
      "test-workspace-description"
    )

    // check not throw
    await expect(wsPromise).resolves.not.toThrow()

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
  })
})

test("Workspace, change", async () => {
  await testInWorkspace(async (app, org, ws) => {

    expect(ws.name).not.toBe("new-name")

    // rename
    await ws.change("new-name", "new-description")

    // check name
    expect(ws.name).toBe("new-name")

    // check description
    expect(ws.description).toBe("new-description")

    // check name
    expect(ws.name).toBe("new-name")
  })
})
