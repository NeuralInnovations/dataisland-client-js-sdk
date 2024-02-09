
import { testInOrganization } from "./setup"
test("Groups", async () => {
  await testInOrganization(async (app, org) => {
    const groupPromise = org.accessGroups.create("Test group", {isAdmin: true}, ["123"])

    await expect(groupPromise).resolves.not.toThrow()

    const group = await groupPromise

    console.log("group", group)

    expect(group).not.toBeUndefined()

    expect(group).not.toBeNull()

    expect(org.accessGroups.get(group.id)).toBe(group)

    if (!group) {
      expect(() => group).toThrow("Access group is not loaded.")
    }

  })
})
