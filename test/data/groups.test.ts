// import { AccessGroupDto } from "../../src/dto/accessGroupResponse"
// import { UserDto } from "../../src/dto/userInfoResponse"
// import { WorkspaceDto } from "../../src/dto/workspacesResponse"
// import { GroupImpl } from "../../src/storages/groups/groups.impl"
import { testInOrganization } from "../setup"

test("GroupImpl", async () => {
  await testInOrganization(async (app, org) => {

    const groupPromise = org.accessGroups.create("test group", "65c236036b32068ec9545914.", {isAdmin: true}, ["123"])

    await expect(groupPromise).resolves.not.toThrow()

    const group = await groupPromise

    // check exists
    expect(group).not.toBeUndefined()

    // check exists
    expect(group).not.toBeNull()

    // check get
    expect(org.accessGroups.get(group.id)).toBe(group)

  })

  // const group = new GroupImpl(context, organization)
  // await group.initFrom(groupId)

  // expect(group.id).toEqual(groupId)
  // // expect(group.group).toBeInstanceOf(AccessGroupDto)
  // expect(group.members).toBeInstanceOf(Array)


  // expect(() => group.id).toThrow("Access group is not loaded.")
  // expect(() => group.group).toThrow("Access group is not loaded.")
  // expect(() => group.members).toThrow("Access group is not loaded.")



  // const newName = "New Group Name"
  // await group.setName(newName)

  // expect(group.group.name).toEqual(newName)


  // it("should set permits for the group", async () => {
  //   const group = new GroupImpl(context, organization)

  //   const permits = { isAdmin: true }
  //   await group.setPermits(permits)

  //   // Add assertions based on your application logic for permits
  // })

  // it("should set workspaces for the group", async () => {
  //   const group = new GroupImpl(context, organization)

  //   const workspaces = ["workspace1", "workspace2"]
  //   await group.setWorkspaces(workspaces)

  //   // Add assertions based on your application logic for workspaces
  // })

  // it("should set member IDs for the group", async () => {
  //   const group = new GroupImpl(context, organization)

  //   const memberIds = ["user1", "user2"]
  //   await group.setMembersIds(memberIds)

  //   // Add assertions based on your application logic for member IDs
  // })

  // it("should dispose the group", () => {
  //   const group = new GroupImpl(context, organization)
  //   group.dispose()

  //   expect(group.isDisposed).toBeTruthy()
  // })
})
