import { UserEvent, UserInfoResponse } from "../src"
import { UserProfileImpl } from "../src/storages/user/userProfile.impl" // Update the import path based on your project structure

describe("UserProfileImpl", () => {
  let userProfile: UserProfileImpl

  beforeEach(() => {
    userProfile = new UserProfileImpl()
  })

  const mockUserInfoResponse: UserInfoResponse = {
    adminInOrganization: ["123"],
    organizations: [],
    user: {
      id: "user123",
      profile: {
        name: "John Doe",
        email: "john.doe@example.com"
      },
      isDeleted: false,
      created_at: 0,
      modified_at: 0
    }
  }

  it("should initialize from UserInfoResponse", async () => {
    userProfile.initFrom(mockUserInfoResponse)
    expect(userProfile.id).toEqual("user123")
    expect(userProfile.name).toEqual("John Doe")
    expect(userProfile.email).toEqual("john.doe@example.com")
    expect(userProfile.isDeleted).toBeFalsy()
    expect(userProfile.createdAt).toEqual(new Date(0))
    expect(userProfile.modifiedAt).toEqual(new Date(0))
  })

  it("should throw error when accessing properties without initialization", () => {
    expect(() => userProfile.id).toThrow("The profile is not loaded.")
    expect(() => userProfile.name).toThrow("The profile is not loaded.")
    expect(() => userProfile.email).toThrow("The profile is not loaded.")
    expect(() => userProfile.isDeleted).toThrow("The profile is not loaded.")
    expect(() => userProfile.createdAt).toThrow("The profile is not loaded.")
    expect(() => userProfile.modifiedAt).toThrow("The profile is not loaded.")
  })

  it("should dispatch UserEvent.CHANGED when initialized", () => {
    const mockDispatch = jest.spyOn(userProfile, "dispatch")
    userProfile.initFrom(mockUserInfoResponse)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: UserEvent.CHANGED,
      data: userProfile
    })
  })
})
